import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import './paginationComponent.scss';

function PaginationComponent({
  size = 'large',
  itemPerPage = 36,
  list,
  showBoundaryButton = true,
  handlePageChange = () => {},
}) {
  const totalPage = Math.ceil(list.length / itemPerPage);

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPage}
        variant="outlined"
        shape="rounded"
        showFirstButton={showBoundaryButton}
        showLastButton={showBoundaryButton}
        size={size}
        onChange={(event, value) => handlePageChange(event, value)}
      />
    </Stack>
  );
}

export default PaginationComponent;
