import { Box, Paper, Stack } from "@mui/material";
import { GridCellParams, GridColumnVisibilityModel } from "@mui/x-data-grid-pro";
import Search from "../../Search/Search";
import DateRangePickerComponent from "../../DateRangePicker/DateRangePicker";
import Selector from "../../Selector/Selector";
import { Dayjs } from "dayjs";
import { LoadingButton } from "@mui/lab";
import { getReaderColumns } from "./ReaderFilterColumn";
import { StyledDataGrid } from "../../StyledDataGridPro/StyledDataGridPro";
import { Assets } from "../../../Models/Asset";
import { GridRowParams } from "@mui/x-data-grid-pro";
import CustomToolbar from "../../CustomDataGridToolbar/CustomDataGridToolbar";
import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import { useReadersService } from "../../../Services/ReaderService";
import {Reader} from '../../../Models/Reader';

// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { selectCustomerSettingsState } from "../../../Features/customerSettingSlice";
// import { dismissToast, showErrorToast, showLoadingToast, showSuccessToast } from "../../../Utils/Toast";
// import { useSelector } from "react-redux";
// import { selectUserState } from "../../../Features/userSlice";
// import { UploadOutlined } from "@mui/icons-material";

// both of this currently is not use.
// import CustomerService from "../../services/CustomerService";
// import { useOrdersService } from "../../services/OrdersService";
// import Taskdialog from "./TaskPopup";// import ImportOrderModal from "./ImportOrderModal";
//This is for the firebase
// import FileUtils from "../../Utils/FileUtils";
// import { OrderDetailPanelContent } from "./OrderDetailsPanelContent";


const Location = [
    {
      label: " ",
      value: " ",
    },

  ] as any;
  const STATUSOPTIONS = [
    {
      label: " ",
      value: " ",
    },

  ] as any;

  const ListOfReaders = () =>{

    const readerData = useReadersService();
    const rows = readerData.readers.map((reader) => ({
        id: reader.id,
        readerId: reader.readerId,
        name: reader.name,
        lastChanged: new Date(reader.lastChanged),
        lastFetched: new Date(reader.lastFetched),
        mode: reader.mode,
        slug: reader.slug,
        }));


    const [ToolbarProps, setToolBarProps] = React.useState({
        viewGridToolbarExport: true,
        viewGridToolbarColumnsButton: true,
        viewGridToolbarContainer: true,
        viewGridToolbarDensitySelector: true,
        viewGridToolbarFilterButton: true,
        disableMoreActions: true,
    });
    // const [fileterCustomerValue, setFileterCustomerValue] = React.useState([]);
    const [fileterStatusValue, setFileterStatusValue] = React.useState([]);
    const [fileterActionsValue, setFileterActionsValue] = React.useState([]);
    const [dateRangeValue, setDateRangeValue] = React.useState<[Dayjs | null, Dayjs | null]>([null, null]);
    // const [colsVisibilityModel, setColsVisibilityModel] = React.useState({
    //     transactionID: true,
    //     assetID: true,
    //     tagID: true,
    //     from: true,
    //     to: true,
    //     duration: true,
    //     description: true,
    // } as any);
    const [selectedTab, setSelectedTab] = React.useState<string>("activeAssets");
    const [selectedRows, setSelectedRows] = React.useState<Assets[]>([]);
    const [userCanUpsertOrders, setUserCanUpsertOrders] = React.useState<boolean>(false);
    const [searchValue, setSearchValue] = React.useState<string>("");
    const [taskDialog, setTaskDialog] = React.useState<any>({ open: false, order: null });
    const columns = getReaderColumns();


    React.useEffect(() => {
    selectedRows.length > 0
        ? setToolBarProps((prevState: any) => ({
            ...prevState,
            disableMoreActions: false,
        }))
        : setToolBarProps((prevState: any) => ({
            ...prevState,
            disableMoreActions: true,
        }));
    }, [selectedRows]);

    // function handleACtionsClick(row: Assets) {
    // setTaskDialog({ open: true, order: row });
    // }

    const dateRangePickerValueChanged = (value: [Dayjs | null, Dayjs | null]) => {
    setDateRangeValue([value[0], value[1]]);
    };
    
    // const columnVisibilityModelChanged = (model: GridColumnVisibilityModel) => {
    // setColsVisibilityModel(model);
    // localStorage.setItem("assets-columns", JSON.stringify(model));
    // };

    const navigate = useNavigate();

    const handleRowClick = (params: GridRowParams) => {
      // Navigate to another page when a row is clicked
      const id = params.id as number; // Assuming 'id' is a number
      navigate(`/AssetHistory/${id}`);
      console.log(navigate(`/AssetHistory/${id}`));
    };  


      return (
        <>
          {/* <Taskdialog taskDialog={taskDialog} setTaskDialog={setTaskDialog} /> */}
          {/* <ImportOrderModal open={createOrderModalOpen} setOpen={setCreateOrderModalOpen} /> */}
          <Box sx={{ p: 1, height: "100%", width: "98%", mt: -5.5, minHeight: "30rem", overflow: "hidden" }}>
            <Stack direction="row" spacing={2} mt={2}>
            <br />
            </Stack>
            <Paper sx={{ height: "100%", width: "94.5vw", p: 1, minHeight: "40rem", mb: 1 }}>
              {/* controls */}
              <Stack direction="row" spacing={2} mt={2}>
                <Search setSearchInput={() => {}} placeHolderText="Search by Asset Id" inputChanged={(searchTxt) => setSearchValue(searchTxt)} />
                {/* {user.clientId === "syKxcXfrvV5N0WCwCEL8" && (
                  <Selector width={200} label="Filter by customer" selectedValue={fileterCustomerValue} setSelectedValue={setFileterCustomerValue} options={customers} multiple={true} />
                )} */}
                <Selector width={200} label="Filter by actions" selectedValue={fileterActionsValue} setSelectedValue={setFileterActionsValue} options={Location} multiple={true} />
                <Selector width={200} label="Filter by status" selectedValue={fileterStatusValue} setSelectedValue={setFileterStatusValue} options={STATUSOPTIONS} multiple={true} />
                <DateRangePickerComponent value={dateRangeValue} dateRangePickerValueChanged={dateRangePickerValueChanged} />
                <LoadingButton loading={false} variant="outlined" color="primary">
                  Filter Asset
                </LoadingButton>
              </Stack>
              <br />
              <StyledDataGrid
                sx={{
                  "& .MuiDataGrid-columnHeaderTitle": {
                    textOverflow: "clip",
                    whiteSpace: "break-spaces",
                    lineHeight: 1,
                  },
                  "& .cellUpdated": {
                    border: " 2px solid red !important",
                  },
                  height: "100%",
                  width: "100%",
                  overflowX: "auto",
                }}
                slots={{
                  toolbar: CustomToolbar,
                }}
                slotProps={{
                  toolbar: { ...ToolbarProps, selectedTab },
                }}
                rows={rows}
                loading={rows.length === 0}    
                onRowClick={handleRowClick}           
                columns={columns.map((col) => {
                  return {
                    ...col,
                    flex: 1,
                    minWidth: col.field === "actions" ? 200 : col.field === "documents" ? 70 : 150,
    
                    editable: !userCanUpsertOrders ? false : col.field === "documents"  || col.field === "actions" ? false : true,
                    cellClassName: (params: GridCellParams) => {
                      return params.row?.fieldUpdates?.find((f:any)=>f.field === params.field) ? "cellUpdated" : "";
                    },
                  };
                })}
                initialState={{
                  pinnedColumns: {
                    right: ["documents", "actions", "status"],
                  },
                }}
                checkboxSelection
                disableRowSelectionOnClick
                // columnVisibilityModel={colsVisibilityModel}
                // onColumnVisibilityModelChange={(model: GridColumnVisibilityModel) => columnVisibilityModelChanged(model)}
                onProcessRowUpdateError={(params: any) => console.log("error", params)}
              />
            </Paper>
          </Box>
        </>
      );
    };

  export default ListOfReaders;
  