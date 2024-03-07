import { Box, Paper, Stack } from "@mui/material";
import { GridCellParams, GridColumnVisibilityModel } from "@mui/x-data-grid-pro";
import Search from "../../Search/Search";
import DateRangePickerComponent from "../../DateRangePicker/DateRangePicker";
import React from "react";
import Selector from "../../Selector/Selector";
import { Dayjs } from "dayjs";
import { LoadingButton } from "@mui/lab";
import { getAssetHistoryColumns } from "./AssetsHistoryFilterColumn";
import { StyledDataGrid } from "../../StyledDataGridPro/StyledDataGridPro";
import { Assets } from "../../../Models/Assets";
import { GridRowParams } from "@mui/x-data-grid-pro";
import CustomToolbar from "../../CustomDataGridToolbar/CustomDataGridToolbar";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useEffect } from "react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { selectCustomerSettingsState } from "../../../Features/customerSettingSlice";
import { dismissToast, showErrorToast, showLoadingToast, showSuccessToast } from "../../../Utils/Toast";
import { useSelector } from "react-redux";
import { selectUserState } from "../../../Features/userSlice";
import { UploadOutlined } from "@mui/icons-material";

// both of this currently is not use.
// import CustomerService from "../../services/CustomerService";
// import { useOrdersService } from "../../services/OrdersService";
// import Taskdialog from "./TaskPopup";// import ImportOrderModal from "./ImportOrderModal";
//This is for the firebase
// import FileUtils from "../../Utils/FileUtils";
// import { OrderDetailPanelContent } from "./OrderDetailsPanelContent";

interface ListOfSpecificAssetHistory {
    id: number;
    transcationID: string;
    assetID: string;
    tagID: string;
    from: string;
    to: string;
    duration: Date;
    status: string;
}


  const userData = [
    { id: 1, transcationID:'aa', assetID: 'BC-00123', tagID:'PHA-0001', from:'T-Hofke Bloemenwinkle', to: "Washing", duration:new Date('12/03/2024'), status:'Delivered'},
    { id: 2, transcationID:'ss', assetID: 'BC-00321', tagID:'PHA-0002', from:'T-Hofke Bloemenwinkle', to: "Washing", duration:new Date('12/03/2024'), status:'Delivered'},
    { id: 3, transcationID:'dd', assetID: 'BC-00213', tagID:'PHA-0003', from:'T-Hofke Bloemenwinkle', to: "Washing", duration:new Date('12/03/2024'), status:'Delivered'},
    { id: 5, transcationID:'ff', assetID: 'BC-00541', tagID:'PHA-0004', from:'T-Hofke Bloemenwinkle', to: "Washing", duration:new Date('12/03/2024'), status:'Delivered'},
    { id: 6, transcationID:'gg', assetID: 'BC-00765', tagID:'PHA-0005', from:'T-Hofke Bloemenwinkle', to: "Washing", duration:new Date('12/03/2024'), status:'Delivered'},
    { id: 8, transcationID:'hh', assetID: 'BC-00731', tagID:'PHA-0007', from:'Warehouse', to: "Packaging", duration:new Date('12/03/2024'), status:'Delivered'},
  ];


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

  const ListOfSpecificAssetsHistory = () =>{
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
    const [colsVisibilityModel, setColsVisibilityModel] = React.useState({
        transactionID: true,
        assetID: true,
        tagID: true,
        from: true,
        to: true,
        duration: true,
        description: true,
    } as any);
    const [createOrderModalOpen, setCreateOrderModalOpen] = React.useState<boolean>(false);
    const [selectedTab, setSelectedTab] = React.useState<string>("activeAssets");
    const [selectedRows, setSelectedRows] = React.useState<Assets[]>([]);
    const [userCanUpsertOrders, setUserCanUpsertOrders] = React.useState<boolean>(false);
    const [searchValue, setSearchValue] = React.useState<string>("");
    const [customers, setCustomers] = React.useState<any[]>([]);
    const [taskDialog, setTaskDialog] = React.useState<any>({ open: false, order: null });
    const columns = getAssetHistoryColumns();


    const [filteredData, setFilteredData] = React.useState<ListOfSpecificAssetHistory[]>(userData);
    const [searchId, setSearchId] = React.useState<string>(" ");
  


    // const { orders, setOrders, loading, setLoading, updateOrder, uploadFiles, deleteDocFromShipment, filterOrders, filteredOrders } = useOrdersService(dateRangeValue);  //Only use when the service is done 
    // const { user } = useSelector(selectUserState); //only use it when the service and model is ready
    // const customerSettings = useSelector(selectCustomerSettingsState);  //only use it when the service and model is ready


    // Only use it when the service is done
    // useEffect(() => {
    //     (async () => {
    //       if (user.clientId == "import.meta.env.VITE_FIREBASE_RITMEESTER_ID") {
    //         const listCustomers = await CustomerService.getCustomers(user.customerId);
    //         setCustomers(listCustomers?.map((c: any) => ({ label: c.companyName, value: c.documentId })));
    //       }
    //     })();
    //   }, [user]);

    // only use it when the service is ready
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

    // only use it when the service is done    
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
    
    // Only hppen after the service is done
    //   function handleRowSelection(selectedRowsId: Array<String>) {
    //     const selectedRows = orders.filter((d: any) => selectedRowsId.includes(d.fbId));
    //     setSelectedRows(selectedRows);
    //   }
    //   const downloadFile = (filePath: any) => {
    //     FileUtils.downloadFile(filePath);
    //   };

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

    const dateRangePickerValueChanged = (value: [Dayjs | null, Dayjs | null]) => {
    setDateRangeValue([value[0], value[1]]);
    };
    
    const columnVisibilityModelChanged = (model: GridColumnVisibilityModel) => {
    setColsVisibilityModel(model);
    localStorage.setItem("assets-columns", JSON.stringify(model));
    };


    const { id } = useParams<{ id: string }>()

    const handleSearch = () => {
        if (searchId === '') {
          setFilteredData(userData);
        } else {
          const filtered = userData.filter(item => item.assetID === id);
          setFilteredData(filtered);
        } 
    }

    useEffect(() => {
        handleSearch(); // Trigger search when searchId changes
      }, [searchId]);

    const rows = filteredData.map((user) => ({
        id: user.id,
        transactionID: user.transcationID,
        assetID: user.assetID,
        tagID: user.tagID,
        from: user.from,
        to: user.to,
        duration: new Date(user.duration),
        status: user.status,
      }));   

    


    let { pathname } = useLocation();

    


      return (
        <>
          {/* <Taskdialog taskDialog={taskDialog} setTaskDialog={setTaskDialog} /> */}
          {/* <ImportOrderModal open={createOrderModalOpen} setOpen={setCreateOrderModalOpen} /> */}
          <Box sx={{ p: 1, height: "100%", width: "98%", mt: -5.5, minHeight: "30rem", overflow: "hidden" }}>
          {pathname === `/AssetsHistory/${id}`}
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
                rows={}
                loading={userData.length === 0}    
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
                checkboxSelection
                disableRowSelectionOnClick
                columnVisibilityModel={colsVisibilityModel}
                onColumnVisibilityModelChange={(model: GridColumnVisibilityModel) => columnVisibilityModelChanged(model)}
                onProcessRowUpdateError={(params: any) => console.log("error", params)}
              />
            </Paper>
          </Box>
        </>
      );
    };

  export default ListOfSpecificAssetsHistory;
  