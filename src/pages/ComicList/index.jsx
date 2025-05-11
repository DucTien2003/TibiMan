import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { comicsApi } from "@/api";
import BackTitle from "@/components/common/buttons/BackTitle";
import DetailCard from "@/components/common/cards/DetailCard";
import FilterForm from "@/components/specific/FilterForm";
import PaginationComponent from "@/components/specific/PaginationComponent";
import { useGetData } from "@/hooks";
import { getUrlParams } from "@/utils";

const NUMBER_OF_COMICS_PER_PAGE = 18;

function ComicList() {
  // Hooks
  const [params, setSearchParams] = useSearchParams();

  // variables
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

  //  Hooks
  const staticApis = useMemo(() => {
    return [
      {
        url: comicsApi(),
        query: {
          page,
          status,
          orderBy,
          order: order,
          genres: genres,
          limit: NUMBER_OF_COMICS_PER_PAGE,
        },
      },
    ];
  }, [page, orderBy, order, status, genres]);

  const { loading, error, responseData } = useGetData(staticApis);
  const [comics] = responseData || [];

  useEffect(() => {
    // Cập nhật lại page khi có sự thay đổi từ params
    setCurrentPage(Number(page));
  }, [page]);

  return (
    <div className="my-20">
      <div className="container">
        {/* Back */}
        <BackTitle title="Danh sách truyện" />

        {/* Filter */}
        <FilterForm />

        {/* Loading/Error */}
        {loading || error ? (
          <div className="text-center">
            <h2>{error || "Loading..."}</h2>
          </div>
        ) : (
          <>
            {/* Display */}
            <div className="grid grid-cols-2 gap-3 pb-12 md:grid-cols-4 md:gap-5 lg:grid-cols-6">
              {comics.comics.map((comic, index) => (
                <div key={index}>
                  <DetailCard comic={comic} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex w-full justify-center">
              <PaginationComponent
                size="large"
                currentPage={currentPage}
                itemPerPage={NUMBER_OF_COMICS_PER_PAGE}
                count={comics.count}
                handlePageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ComicList;
