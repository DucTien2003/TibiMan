import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import DetailCard from '@/components/common/cards/DetailCard';
import GenresSelector from '@/components/specific/GenresSelector';
import PaginationComponent from '@/components/specific/PaginationComponent';
import { homeUrl } from '@/routes';
import { FaArrowLeft } from '@/utils';
import { latestUpdates } from '@/api/comicList';

const NUMBER_OF_COMICS_PER_PAGE = 18;

function ComicList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataRender, setDataRender] = useState([]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    setDataRender(
      latestUpdates.slice(
        (currentPage - 1) * NUMBER_OF_COMICS_PER_PAGE,
        currentPage * NUMBER_OF_COMICS_PER_PAGE
      )
    );
  }, [currentPage]);

  return (
    <div className="my-20">
      <div className="container">
        {/* Back */}
        <Link
          to={homeUrl()}
          className="hover-theme-primary-text inline-flex items-center rounded-lg border px-4 py-2 font-semibold">
          <FaArrowLeft />
          <h5 className="ml-2">Back to Home</h5>
        </Link>

        {/* Filter */}
        <div className="mt-10 flex items-center justify-between">
          <h1 className="theme-primary-text">Comic list</h1>
          <div className="w-[400px]">
            <GenresSelector id="filter" label="Filter" />
          </div>
        </div>

        {/* Display */}
        <div className="mt-10 grid grid-cols-6 gap-5 pb-12">
          {dataRender.map((comic, index) => {
            return (
              <div key={index}>
                <DetailCard comic={comic} />
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex w-full justify-center">
          <PaginationComponent
            size="large"
            itemPerPage={NUMBER_OF_COMICS_PER_PAGE}
            list={latestUpdates}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ComicList;
