import { Divider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { comicsApi } from "@/api";
import axiosRequest from "@/api/axiosRequest";
import DefaultButton from "@/components/common/buttons/DefaultButton";
import Cover from "@/components/common/Cover";
import { useDebounce } from "@/hooks";
import { comicUrl, searchResultUrl } from "@/routes";
import {
  CiSearch,
  FaPaintBrush,
  FaRegComment,
  FaRegStar,
  FiBookmark,
  GrStatusGoodSmall,
  handleStatusComic,
  IoClose,
  MdOutlineRemoveRedEye,
} from "@/utils";

import styles from "./searchInput.module.scss";

function Input() {
  // States
  const inputRef = useRef(null);
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowResults, setIsShowResults] = useState(false);

  // Hooks
  const navigate = useNavigate();
  const debouncedValue = useDebounce(value, 1000);

  // Functions
  const handleFocus = () => {
    setIsShowResults(true);
  };

  const handleClickOutside = (e) => {
    const target = e.target.closest(`.${styles["search-form"]}`);
    if (!target) {
      setIsShowResults(false);
    }
  };

  const handleClickResult = () => {
    if (value.trim()) {
      navigate(searchResultUrl(value));
    }
    setIsShowResults(false);
    setValue("");
    setResults([]);
  };

  const handleSearch = async (searchValue) => {
    setIsLoading(true);
    const { data, success } = await axiosRequest(comicsApi(), {
      query: {
        limit: 5,
        order: "DESC",
        orderBy: "views",
        search: searchValue,
      },
    });

    if (success && data) {
      setResults(data.comics);
    }
    setIsLoading(false);
  };

  const handleSeeMore = () => {
    navigate(searchResultUrl(value));
    setIsShowResults(false);
    setValue("");
    setResults([]);
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClickResult();
      inputRef.current?.blur();
    }
  };

  // Hooks functions
  useEffect(() => {
    if (debouncedValue.trim()) {
      handleSearch(debouncedValue);
    } else {
      setResults([]);
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (isShowResults) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isShowResults]);

  return (
    <div className="relative max-w-[500px] flex-1">
      <div className="relative z-20">
        {/* input */}
        <input
          ref={inputRef}
          id="search-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          className={clsx(
            styles["search-input"],
            "bg-theme-background-paper rounded-lg",
            isShowResults ? "theme-primary-border w-full" : "w-[300px]"
          )}
          onKeyDown={handleKeydown}
          placeholder="Tìm kiếm..."
          autoComplete="off"
          onFocus={handleFocus}
        />
        {/* Icon */}
        <label
          htmlFor="search-input"
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-text text-xl">
          {value ? (
            <IoClose
              className="cursor-pointer"
              onClick={() => setValue("")}
              onMouseDown={(e) => e.preventDefault()}
            />
          ) : (
            <CiSearch />
          )}
        </label>

        {/* Results */}
        {isShowResults && (
          <div className="bg-theme-background-paper absolute left-0 right-0 z-10 mt-1 max-h-[600px] overflow-auto rounded p-2 shadow-lg">
            {!isLoading ? (
              results.length ? (
                <div>
                  {/* List */}
                  {results.map((comic) => (
                    <div key={comic.id}>
                      <Link to={comicUrl(comic.id)} onClick={handleClickResult}>
                        <MenuItem className="!rounded-sm !px-2">
                          <div className="flex flex-1 gap-2">
                            {/* Cover */}
                            <div className="w-[60px]">
                              <Cover comic={comic} />
                            </div>

                            {/* Info */}
                            <div className="flex flex-1 flex-col justify-between">
                              {/* Title */}
                              <div className="flex flex-col">
                                {/* Name */}
                                <div className="flex">
                                  <Tooltip title={comic.name}>
                                    <p className="limit-line-1">{comic.name}</p>
                                  </Tooltip>
                                </div>

                                {/* Subname */}
                                <div className="flex">
                                  <p className="limit-line-1 text-[11px]">
                                    - {comic.subname} -
                                  </p>
                                </div>
                              </div>

                              {/* Info */}
                              <div className="flex flex-col">
                                {/* Author - Artist */}
                                <div className="flex">
                                  <Tooltip title="Tác giả">
                                    <div className="flex items-center gap-1">
                                      <FaPaintBrush className="text-[11px]" />
                                      <span className="text-sm">
                                        {comic.author}
                                      </span>
                                    </div>
                                  </Tooltip>
                                </div>

                                {/* Detail */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    {/* Views */}
                                    <Tooltip title="Lượt xem">
                                      <div className="flex items-center gap-1 text-sm">
                                        <MdOutlineRemoveRedEye />
                                        <span>{comic.views}</span>
                                      </div>
                                    </Tooltip>

                                    {/* Comments */}
                                    <Tooltip title="Bình luận">
                                      <div className="flex items-center gap-1 text-sm">
                                        <FaRegComment />
                                        <span>{comic.comments}</span>
                                      </div>
                                    </Tooltip>

                                    {/* Rating */}
                                    <Tooltip title="Đánh giá">
                                      <div className="flex items-center gap-1 text-sm">
                                        <FaRegStar />
                                        <span>{comic.rating}</span>
                                      </div>
                                    </Tooltip>

                                    {/* Bookmark */}
                                    <Tooltip title="Đang theo dõi">
                                      <div className="flex items-center gap-1 text-sm">
                                        <FiBookmark />
                                        <span>{comic.bookmarks}</span>
                                      </div>
                                    </Tooltip>
                                  </div>

                                  {/* Status */}
                                  <Tooltip title="Trạng thái">
                                    <div className="flex items-center gap-1 text-xs">
                                      <GrStatusGoodSmall
                                        className={clsx(
                                          handleStatusComic(comic.status).color
                                        )}
                                      />
                                      <span>
                                        {handleStatusComic(comic.status).text ||
                                          "Đang cập nhật"}
                                      </span>
                                    </div>
                                  </Tooltip>
                                </div>
                              </div>
                            </div>
                          </div>
                        </MenuItem>
                      </Link>

                      <Divider className="!my-0.5" />
                    </div>
                  ))}

                  {/* See more */}
                  <div className="mt-2">
                    <DefaultButton size="small" onClick={handleSeeMore}>
                      Tìm kiếm
                    </DefaultButton>
                  </div>
                </div>
              ) : (
                // No results
                <p className="p-2 text-start text-gray-500">
                  {value.trim()
                    ? "Không tìm thấy kết quả phù hợp."
                    : "Nhập từ khóa để tìm kiếm."}
                </p>
              )
            ) : (
              <div className="text-center">
                <CircularProgress />
              </div>
            )}
          </div>
        )}
      </div>

      {isShowResults && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50"
          onClick={handleClickOutside}
        />
      )}
    </div>
  );
}

export default Input;
