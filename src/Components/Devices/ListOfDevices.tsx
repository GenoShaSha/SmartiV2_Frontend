import { Box, Paper, Stack, Tab } from "@mui/material";
import {GridCellParams, GridColumnVisibilityModel } from "@mui/x-data-grid-pro";
import Search from "../Search/Search";
import DateRangePickerComponent from "../DateRangePicker/DateRangePicker";
import React from "react";
import Selector from "../Selector/Selector";
import { Dayjs } from "dayjs";
import { LoadingButton } from "@mui/lab";
// import { getAssetColumns } from "./AssetFilterColumn";
// import ImportOrderModal from "./ImportOrderModal";
import { StyledDataGrid } from "../StyledDataGridPro/StyledDataGridPro";
import { Assets } from "../../Models/Assets";
// import { OrderDetailPanelContent } from "./OrderDetailsPanelContent";
import { GridRowParams } from "@mui/x-data-grid-pro";
import { TabContext, TabList } from "@mui/lab";
import CustomToolbar from "../CustomDataGridToolbar/CustomDataGridToolbar";
import { useNavigate } from 'react-router-dom';
import ListOfReaders from './Readers/ListOfReaders'
import TabPanel from '@mui/lab/TabPanel';
// import ListOfTags from './Tags/ListOfTags';


console.log("heyy")
  const ListOfDevices = () =>{
    const [selectedTab, setSelectedTab] = React.useState<string>("listOfTags");

      return (
        <>
          <Box sx={{ p: 1, height: "100%", width: "98%", mt: 10, minHeight: "30rem", overflow: "hidden" }}>
            <Stack direction="row" spacing={2} mt={2}>
              <br />
            </Stack>
            <TabContext value={selectedTab}>
              <TabList centered={true} onChange={(e: any, tabValue: string) => setSelectedTab(tabValue)}>
                <Tab value={"listOfTags"} label={"Tags"} />
                <Tab value={"listOfReades"} label={"Readers"} />
              </TabList>
              <TabPanel value="listOfTags">
                {/* </ListOfTags> */}
              </TabPanel>
              <TabPanel value={"listOfReaders"}>
                <ListOfReaders/> 
              </TabPanel>
            </TabContext>
          </Box>
        </>
      );
    };

  export default ListOfDevices;
  