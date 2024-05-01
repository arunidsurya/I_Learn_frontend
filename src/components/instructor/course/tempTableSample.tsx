import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";

const Courses: React.FC = () => {
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "courseTitle", headerName: "Course Title", flex: 1 },
    { field: "rating", headerName: "Rating", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "Crreated_at", headerName: "Created At", flex: 0.5 },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <AiOutlineDelete className="text-red-500" size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [
    {
      id: "1234",
      courseTitle: "React",
      purchased: "30",
      rating: "5",
      created_at: "12/12/12",
    },
  ];

  return (
    <div className="mt-[50px]">
      <Box m="20px">
        <Box
          m="40px 0 0 0"
          height="80vh"
          sx={{
            "& .MuiDataGrid-root": {
              backgroundColor: "#fff",
            },
            "& .css-pqjvzy-MuiSvgIcon-root-MUiSelect-icon": {
              color: "#fff",
            },
            "& .MuiDataGrid-sortIcon": {
              color: "#fff",
            },
            "& .MuiDataGrid-row": {
              color: "#fff",
              borderBottom: "1px solid #ccc!important",
            },
            "& .MuiTablePagination-root": {
              color: "#fff",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column-cell": {
              color: "#fff",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#595959",
              borderBottom: "none",
              color: "#fff",
            },
            "& .MuiDataGrid-columnsContainer, & .MuiDataGrid-cell": {
              color: "#000",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#fff",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#595959",
              borderTop: "none",
              color: "#fff",
            },
            "& .MuiCheckbox-root": {
              color: "#000!important",
              backgroundColor: "transparent!important",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: "#fff !important",
            },
          }}
        >
          <DataGrid checkboxSelection rows={rows} columns={columns} />
        </Box>
      </Box>
    </div>
  );
};

export default Courses;
