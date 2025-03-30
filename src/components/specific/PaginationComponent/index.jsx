import "./paginationComponent.scss";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function PaginationComponent({
  size = "large",
  itemPerPage = 36,
  count = 0,
  currentPage = 1,
  showBoundaryButton = true,
  handlePageChange = () => {},
}) {
  const totalPage = Math.ceil(count / itemPerPage);

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPage}
        variant="outlined"
        shape="rounded"
        showFirstButton={showBoundaryButton}
        showLastButton={showBoundaryButton}
        size={size}
        page={currentPage}
        siblingCount={1}
        boundaryCount={1}
        onChange={(event, value) => handlePageChange(event, value)}
      />
    </Stack>
  );
}

export default PaginationComponent;
