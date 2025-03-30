import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";

import AppIconButton from "@/components/common/buttons/AppIconButton";
import PaginationComponent from "@/components/specific/PaginationComponent";
import { useGetData, useWindowResize } from "@/hooks";

const WIDTH_COLUMN_DEFAULT = 200;

export default function DataTable({ fetchUrl, columns, ...props }) {
  const { isMobile } = useWindowResize();

  // Pagination and query
  /* eslint-disable no-unused-vars */
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortType, setSortType] = useState("ASC");
  const [orderBy, setOrderBy] = useState("number_order");

  // Data
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState([]);

  // Handle actions of table
  const standardColumns = columns.map((column) => {
    if (column.field === "actions" && column.actions.length > 0) {
      return {
        width: WIDTH_COLUMN_DEFAULT,
        sortable: false,
        ...column,
        renderCell: (value) =>
          ActionComponents({ value, actions: column.actions }),
      };
    }

    return { width: WIDTH_COLUMN_DEFAULT, sortable: false, ...column };
  });

  // Actions
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Fetch data
  const staticApis = useMemo(
    () => [
      {
        url: fetchUrl,
        query: { orderBy, sortType, page, limit },
      },
    ],
    [fetchUrl, orderBy, sortType, page, limit]
  );

  const { responseData, loading, error } = useGetData(staticApis);

  useEffect(() => {
    if (!loading) {
      setCount(responseData[0].count);
      setTableData(responseData[0].chapters);
    }
  }, [loading, responseData]);

  return (
    <Paper sx={{ width: "100%" }}>
      <DataGrid
        rows={tableData}
        columns={standardColumns}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        checkboxSelection
        sx={{ border: 0 }}
        loading={loading || error}
        disableRowSelectionOnClick
        rowCount={count}
        paginationMode="server"
        {...props}
      />

      {/* Pagination */}
      <div className="flex justify-end py-4 md:p-4">
        <PaginationComponent
          size={isMobile ? "medium" : "large"}
          itemPerPage={limit}
          count={count}
          currentPage={page}
          handlePageChange={handlePageChange}
          showBoundaryButton={false}
        />
      </div>
    </Paper>
  );
}

const ActionComponents = ({ value, actions }) => {
  return (
    <div className="flex h-full items-center">
      {actions.map((action, index) => (
        <AppIconButton
          key={index}
          tooltip={action.title}
          onClick={() => action.onClick(value)}>
          <action.icon size={20} />
        </AppIconButton>
      ))}
    </div>
  );
};
