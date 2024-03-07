import React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import classes from "./Pagination.module.css";

export default function PaginationRounded({
  totalUsers,
  usersPerPage,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <div className={classes.pagination}>
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => handlePageChange(page)}
          variant="outlined"
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem
              style={{ color: "white", borderColor:"white" }}
              {...item}
              component="button"
              onClick={() => handlePageChange(item.page)}
            />
          )}
          boundaryCount={2}
          siblingCount={1}
          hidePrevButton={currentPage === 1}
          hideNextButton={currentPage === totalPages}
        />
      </Stack>
    </div>
  );
}
