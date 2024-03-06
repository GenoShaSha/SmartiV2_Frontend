import { Box, Paper, Stack, Tab, Typography } from "@mui/material";
import { DataGridProProps, GridCellParams, GridColumnVisibilityModel } from "@mui/x-data-grid-pro";
import Search from "../Search/Search";
import DateRangePickerComponent from "../DateRangePicker/DateRangePicker";
import React, { useEffect } from "react";
import Selector from "../Selector/Selector";
import { Dayjs } from "dayjs";
import { LoadingButton } from "@mui/lab";
import { UploadOutlined } from "@mui/icons-material";
import { getAssetColumns } from "./AssetFilterColumn";
// import ImportOrderModal from "./ImportOrderModal";
import { StyledDataGrid } from "../StyledDataGridPro/StyledDataGridPro";
import { selectUserState } from "../../Features/userSlice";
import { Assets } from "../../Models/Assets";
import { useSelector } from "react-redux";
// import { OrderDetailPanelContent } from "./OrderDetailsPanelContent";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { dismissToast, showErrorToast, showLoadingToast, showSuccessToast } from "../../Utils/Toast";
import { TabContext, TabList } from "@mui/lab";
import CustomToolbar from "../CustomDataGridToolbar/CustomDataGridToolbar";
//This is for the firebase
// import FileUtils from "../../Utils/FileUtils";
import { selectCustomerSettingsState } from "../../Features/customerSettingSlice";
// both of this currently is not use.
// import CustomerService from "../../services/CustomerService";
// import { useOrdersService } from "../../services/OrdersService";
// import Taskdialog from "./TaskPopup";


const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'Asset ID', headerName: 'Asset ID', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'Current Location', headerName: 'Current Location', width: 200 },
  ];

  const userData = [
    { id: 1, 'Asset ID': 'BC-00123', status: "Occupied",  'Current Location': "Warehouse"},
    { id: 2, 'Asset ID': 'BC-00321', status: "Occupied", 'Current Location': "Warehouse"},
    { id: 3, 'Asset ID': 'BC-00213', status: "Occupied", 'Current Location': "Warehouse"},
    { id: 4, 'Asset ID': 'BC-00145', status: "Occupied", 'Current Location': "Warehouse"},
    { id: 5, 'Asset ID': 'BC-00541', status: "Occupied", 'Current Location': "Warehouse"},
    { id: 6, 'Asset ID': 'BC-00765', status: "Occupied", 'Current Location': "Warehouse"},
    { id: 7, 'Asset ID': 'BC-00564', status: "Occupied", 'Current Location': "T-Hofke Bloemenwinkle"},
    { id: 8, 'Asset ID': 'BC-00731', status: "Occupied", 'Current Location': "T-Hofke Bloemenwinkle"},
   { id: 9, 'Asset ID': 'BC-00912', status: "Occupied", 'Current Location': "T-Hofke Bloemenwinkle"},
  ];

  
  const rows = userData.map((user) => ({
    id: user.id,
    'Asset ID': user['Asset ID'],
    status: user.status,
    'Current Location': user['Current Location'],
  }));

const CurrentLocation = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Data mismatches",
      value: "data_mismatches",
    },
    {
      label: "Data updates",
      value: "fieldUpdates",
    },
    {
      label: "Required docs missing",
      value: "required_docs_missing",
    },
  ] as any;
  const STATUSOPTIONS = [
    {
      label: "Booked",
      value: "booked",
    },
    {
      label: "Planned",
      value: "planned",
    },
    {
      label: "Rescheduled",
      value: "rescheduled",
    },
    {
      label: "Delivered",
      value: "delivered",
    },
  ] as any;

  const ListOfActiveAssets = () =>{
    const [ToolbarProps, setToolBarProps] = React.useState({
        viewGridToolbarExport: true,
        viewGridToolbarColumnsButton: true,
        viewGridToolbarContainer: true,
        viewGridToolbarDensitySelector: true,
        viewGridToolbarFilterButton: true,
        disableMoreActions: true,
    });
    const [fileterCustomerValue, setFileterCustomerValue] = React.useState([]);
    const [fileterStatusValue, setFileterStatusValue] = React.useState([]);
    const [fileterActionsValue, setFileterActionsValue] = React.useState([]);
    const [dateRangeValue, setDateRangeValue] = React.useState<[Dayjs | null, Dayjs | null]>([null, null]);
    const [colsVisibilityModel, setColsVisibilityModel] = React.useState({
      assetID: false,
      tagID: false,
      assetType: false,
      assetStatus: false,
      assetAge: false,
      previousLocation: false,
      currentLocation: false,
      lastSeen: false,
      temperature: false,
    } as any);
    const [createOrderModalOpen, setCreateOrderModalOpen] = React.useState<boolean>(false);
    const [selectedTab, setSelectedTab] = React.useState<string>("active_orders");
    const [selectedRows, setSelectedRows] = React.useState<Assets[]>([]);
    const [userCanUpsertOrders, setUserCanUpsertOrders] = React.useState<boolean>(false);
    const [searchValue, setSearchValue] = React.useState<string>("");
    const [customers, setCustomers] = React.useState<any[]>([]);
    
    const [taskDialog, setTaskDialog] = React.useState<any>({ open: false, order: null });
 //Only use when the service is done 
    // const { orders, setOrders, loading, setLoading, updateOrder, uploadFiles, deleteDocFromShipment, filterOrders, filteredOrders } = useOrdersService(dateRangeValue);
  
    //   constants
    const columns = getAssetColumns(handleACtionsClick);
//only use it when the service and model is ready
    // const { user } = useSelector(selectUserState);
    // const customerSettings = useSelector(selectCustomerSettingsState);

// Only use it when the service is done
    // useEffect(() => {
    //     (async () => {
    //       if (user.clientId == "import.meta.env.VITE_FIREBASE_RITMEESTER_ID") {
    //         const listCustomers = await CustomerService.getCustomers(user.customerId);
    //         setCustomers(listCustomers?.map((c: any) => ({ label: c.companyName, value: c.documentId })));
    //       }
    //     })();
    //   }, [user]);
//only use it when the service is ready
    // user can create orders
    //   useEffect(() => {
    //     if (!user) return;
    //     if (user.clientCategory) {
    //       if (customerSettings?.customerCategories?.[user.clientCategory]?.can_update_orders) {
    //         if (user.role !== "viewer" && user.role !== "user") {
    //           setUserCanUpsertOrders(true);
    //         }
    //       }
    //     } else {
    //       if (user.role !== "viewer" && user.role !== "user") {
    //         setUserCanUpsertOrders(true);
    //       }
    //     }
    //   }, [user]);
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

//only use it when the service is done    
    //   React.useEffect(() => {
    //      filterOrders(searchValue, fileterCustomerValue, fileterActionsValue, fileterStatusValue);    
    //   },[orders,searchValue, dateRangeValue, fileterActionsValue, fileterCustomerValue, fileterStatusValue]);
    //   // functions
    //   // getting cols model from localstorage
    //   React.useEffect(() => {
    //     if (localStorage.getItem("assets-columns")) {
    //       setColsVisibilityModel(JSON.parse(localStorage.getItem("assets-columns") || "{}"));
    //     }
    //   }, []);
    
      function handleACtionsClick(row: Assets) {
        setTaskDialog({ open: true, order: row });
      }
//Only hppen after the service is done
    //   function handleRowSelection(selectedRowsId: Array<String>) {
    //     const selectedRows = orders.filter((d: any) => selectedRowsId.includes(d.fbId));
    //     setSelectedRows(selectedRows);
    //   }
      const dateRangePickerValueChanged = (value: [Dayjs | null, Dayjs | null]) => {
        setDateRangeValue([value[0], value[1]]);
      };
      //   columnVisibilityModelChanged
      const columnVisibilityModelChanged = (model: GridColumnVisibilityModel) => {
        setColsVisibilityModel(model);
        localStorage.setItem("assets-columns", JSON.stringify(model));
      };
    //   const downloadFile = (filePath: any) => {
    //     FileUtils.downloadFile(filePath);
    //   };
      return (
        <>
          {/* <Taskdialog taskDialog={taskDialog} setTaskDialog={setTaskDialog} /> */}
          {/* <ImportOrderModal open={createOrderModalOpen} setOpen={setCreateOrderModalOpen} /> */}
          <Box sx={{ p: 1, height: "100%", width: "98%", mt: 10, minHeight: "30rem", overflow: "hidden" }}>
            <Stack direction="row" spacing={2} mt={2}>
              {/* <Typography fontWeight={400} color={"#111212b6"} variant="h6" align="left">
                Active Assets
              </Typography> */}
              <br />
            </Stack>
            <TabContext value={selectedTab}>
              <TabList centered={true} onChange={(e: any, tabValue: string) => setSelectedTab(tabValue)}>
                <Tab value={"active-assets"} label={"Active Assets"} />
                <Tab value={"asset-history"} label="History of assets" />
              </TabList>
            </TabContext>
            <Paper sx={{ height: "100%", width: "94.5vw", p: 1, minHeight: "40rem", mb: 1 }}>
              {/* controls */}
              <Stack direction="row" spacing={2} mt={2}>
                <Search setSearchInput={() => {}} placeHolderText="Search by Asset Id" inputChanged={(searchTxt) => setSearchValue(searchTxt)} />
                {/* {user.clientId === "syKxcXfrvV5N0WCwCEL8" && (
                  <Selector width={200} label="Filter by customer" selectedValue={fileterCustomerValue} setSelectedValue={setFileterCustomerValue} options={customers} multiple={true} />
                )} */}
                <Selector width={200} label="Filter by actions" selectedValue={fileterActionsValue} setSelectedValue={setFileterActionsValue} options={CurrentLocation} multiple={true} />
                <Selector width={200} label="Filter by status" selectedValue={fileterStatusValue} setSelectedValue={setFileterStatusValue} options={STATUSOPTIONS} multiple={true} />
                <DateRangePickerComponent value={dateRangeValue} dateRangePickerValueChanged={dateRangePickerValueChanged} />
                <LoadingButton loading={false} variant="outlined" color="primary">
                  Filter orders
                </LoadingButton>
              </Stack>
              <br />
              <DataGridPro
                rows={rows}
                columns={columns}
                loading={userData.length === 0}
                rowHeight={38}
                checkboxSelection
                disableRowSelectionOnClick
                />
              {/* data grid */}
              {/* <Box sx={{ height: "100%" }}> */}
              {/* <StyledDataGrid
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
                // sx={{ flex: 1 }}
                slots={{
                  toolbar: CustomToolbar,
                }}
                slotProps={{
                  toolbar: { ...ToolbarProps, selectedTab },
                }}
                rows={userData}
                // rows={selectedTab === "active_orders" ? "filteredOrders : filteredOrders.filter((order) => order.status === completed)"}
                // loading={loading}
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
                getRowId={(row) => row.fbId}
//only happen when the service is done!!!!!!!!
                // onRowSelectionModelChange={(ids) => {
                //   handleRowSelection(ids as Array<String>);
                // }}
                // checkboxSelection={user.role == "viewer" ? false : true}
                disableRowSelectionOnClick
                columnVisibilityModel={colsVisibilityModel}
                onColumnVisibilityModelChange={(model: GridColumnVisibilityModel) => columnVisibilityModelChanged(model)}
                onProcessRowUpdateError={(params: any) => console.log("error", params)}
              /> */}
            </Paper>
          </Box>
        </>
      );
    };

  export default ListOfActiveAssets;
  