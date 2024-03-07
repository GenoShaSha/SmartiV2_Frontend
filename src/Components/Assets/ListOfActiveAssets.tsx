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
import { GridRowParams } from "@mui/x-data-grid-pro";
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
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import ListOfAssetsHistory from "./AssetsHistory/ListOfAssetsHistory";
import TabPanel from '@mui/lab/TabPanel';

  const userData = [
    { id: 1, assetID: 'BC-00123', tagID:'PHA-0001', assetType:'BUCKET', assetStatus: "Occupied",assetAge:new Date('12/03/2024'), client:'Mr.Flexx', comitteeName:'Shanessa', previousLocation:'Washing', currentLocation: 'Warehouse', lastSeen: new Date('20/03/2024 05:30:20'), assetTemperature:'20 C'},
    { id: 2, assetID: 'BC-00321', tagID:'PHA-0002',assetType:'BUCKET', assetStatus:"Occupied", assetAge:new Date('12/03/2024'),client:'Mr.Flexx',comitteeName:'Shanessa', previousLocation:'Washing',currentLocation: 'Warehouse', lastSeen: new Date('20/03/2024 05:30:20'),  assetTemperature:'20 C'},
    { id: 3, assetID: 'BC-00213', tagID:'PHA-0003', assetType:'BUCKET', assetStatus: "Occupied", assetAge:new Date('12/03/2024'), client:'Mr.Flexx',comitteeName:'Shanessa', previousLocation:'Washing',currentLocation: 'Warehouse', lastSeen:new Date('20/03/2024 05:30:20'),  assetTemperature:'20 C'},
    { id: 5, assetID: 'BC-00541', tagID:'PHA-0004',assetType:'BUCKET', assetStatus:"Occupied", assetAge:new Date('12/03/2024'), client:'Mr.Flexx',comitteeName:'Shanessa', previousLocation:'Washing',currentLocation: 'Warehouse', lastSeen: new Date('20/03/2024 05:30:20'), assetTemperature:'20 C'},
    { id: 6, assetID: 'BC-00765', tagID:'PHA-0005',assetType:'BUCKET', assetStatus: "Occupied", assetAge:new Date('12/03/2024'), client:'Mr.Flexx',comitteeName:'Shanessa', previousLocation:'Washing',currentLocation: 'Warehouse', lastSeen: new Date('20/03/2024 05:30:20'),  assetTemperature:'20 C'},
    { id: 8, assetID: 'BC-00731', tagID:'PHA-0007', assetType:'BUCKET', assetStatus: "Occupied", assetAge:new Date('12/03/2024'),client:'Mr.Flexx', comitteeName:'Shanessa', previousLocation:'Packaging',currentLocation: 'T-Hofke Bloemenwinkle', lastSeen: new Date('20/03/2024 05:30:20'),  assetTemperature:'20 C'},
  ];

  
  const rows = userData.map((user) => ({
    id: user.id,
    assetID: user.assetID,
    tagID: user.tagID,
    assetType: user.assetType,
    assetStatus: user.assetStatus,
    assetAge:user.assetAge,
    client: user.client,
    comitteeName:user.comitteeName,
    previousLocation:user.previousLocation,
    currentLocation: user.currentLocation,
    lastSeen: new Date(user.lastSeen),
    assetTemperature: user.assetTemperature,
  }));



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
      assetID: true,
      tagID: true,
      assetType: true,
      assetStatus: true,
      assetAge: true,
      previousLocation: true,
      currentLocation: true,
      lastSeen: false,
      assetTemperature: false,
    } as any);
    const [createOrderModalOpen, setCreateOrderModalOpen] = React.useState<boolean>(false);
    const [selectedTab, setSelectedTab] = React.useState<string>("activeAssets");
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
    const navigate = useNavigate();

    
  const handleRowClick = (params: GridRowParams) => {
    // Navigate to another page when a row is clicked
    const id = params.row.assetID as string; // Assuming 'id' is a number
    navigate(`/AssetsHistory/${id}`);
  };

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
                <Tab value={"activeAssets"} label={"Active Assets"} />
                <Tab value={"historyOfAssets"} label={"History of Assets"} />
              </TabList>
              <TabPanel value="activeAssets">
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
                  Filter Assets
                </LoadingButton>
              </Stack>
              <br />
              {/* <DataGridPro
                rows={rows}
                columns={columns}
                loading={userData.length === 0} 
                rowHeight={38}
                checkboxSelection
                disableRowSelectionOnClick
                /> */}
              {/* data grid */}
              {/* <Box sx={{ height: "100%" }}> */}
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
                // sx={{ flex: 1 }}
                slots={{
                  toolbar: CustomToolbar,
                }}
                slotProps={{
                  toolbar: { ...ToolbarProps, selectedTab },
                }}
                rows={rows}
                loading={userData.length === 0}    
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
                //only happen when the service is done!!!!!!!!
                // onRowSelectionModelChange={(ids) => {
                //   handleRowSelection(ids as Array<String>);
                // }}
                // checkboxSelection={user.role == "viewer" ? false : true}
                disableRowSelectionOnClick
                columnVisibilityModel={colsVisibilityModel}
                onColumnVisibilityModelChange={(model: GridColumnVisibilityModel) => columnVisibilityModelChanged(model)}
                onProcessRowUpdateError={(params: any) => console.log("error", params)}
              />
            </Paper>
              </TabPanel>
              <TabPanel value={"historyOfAssets"}>
                <ListOfAssetsHistory/> 
              </TabPanel>
            </TabContext>
          </Box>
        </>
      );
    };

  export default ListOfActiveAssets;
  