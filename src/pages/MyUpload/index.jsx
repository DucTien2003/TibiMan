import { useEffect } from "react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { usersMyComicsApi } from "@/api";
import BackTitle from "@/components/common/buttons/BackTitle";
import DefaultButton from "@/components/common/buttons/DefaultButton";
import InfoCard from "@/components/common/cards/InfoCard";
import FilterForm from "@/components/specific/FilterForm";
import PaginationComponent from "@/components/specific/PaginationComponent";
import { useGetData } from "@/hooks";
import { uploadComicUrl } from "@/routes";
import { FiUpload, getUrlParams } from "@/utils";

const NUMBER_OF_COMICS_PER_PAGE = 18;

function MyUpload() {
  // Hooks
  const [params, setSearchParams] = useSearchParams();

  // Variables
  const { page, order, status, genres, orderBy } = getUrlParams(params);

  // States
  const [currentPage, setCurrentPage] = useState(Number(page));

  // Functions
  const handlePageChange = (event, value) => {
    // Cập nhật page
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", value);
      return newParams;
    });
    setCurrentPage(value);
  };

  useEffect(() => {
    setCurrentPage(Number(page));
  }, [page]);

  const staticApis = useMemo(
    () => [
      {
        url: usersMyComicsApi(),
        query: {
          page,
          status,
          orderBy,
          order: order,
          genres: genres,
          limit: NUMBER_OF_COMICS_PER_PAGE,
        },
      },
    ],
    [page, orderBy, order, status, genres]
  );

  const { loading, error, responseData } = useGetData(staticApis);
  const [listComics] = responseData;

  if (loading || error) {
    return (
      <h2 className="mt-16 w-full text-center">
        {error ? `Error: ${error}` : "Loading..."}
      </h2>
    );
  }

  return (
    <div className="relative mb-10 mt-20">
      <div className="container">
        {/* Back */}
        <BackTitle title="Truyện của tôi" />

        <FilterForm>
          <Link to={uploadComicUrl()}>
            <DefaultButton
              hoverColor="primary.contrastText"
              className="flex items-center gap-2 !rounded-md">
              <FiUpload />
              <span>Upload</span>
            </DefaultButton>
          </Link>
        </FilterForm>

        {/* List Comics */}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {listComics.comics.map((comic) => (
            <InfoCard key={comic.id} comic={comic} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex w-full justify-center">
          <PaginationComponent
            size="large"
            currentPage={currentPage}
            itemPerPage={NUMBER_OF_COMICS_PER_PAGE}
            count={listComics.count}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default MyUpload;
