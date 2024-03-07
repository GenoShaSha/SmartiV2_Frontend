import {Chip} from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import moment from "moment";
import { GridColDef } from "@mui/x-data-grid-pro";
import { Schema } from "read-excel-file";
import { EditOutlined, RuleOutlined } from "@mui/icons-material";



export function getAssetHistoryColumns(): GridColDef[]{
    return[
        {
            field: "transactionID",
            headerName: "Transaction ID",
            flex: 1,
        },
        {
            field: "assetID",
            headerName: "Asset ID",
            flex: 1,
        },        
        {
            field: "tagID",
            headerName: "Tag ID",
            flex: 1,
        },        
        {
            field: "from",
            headerName: "From",
            flex: 1,
        }, 
        {
            field: "to",
            headerName: "To",
            flex: 1,
        },         
        {
            field: "duration",
            headerName: "Duration",
            flex: 1,
            minWidth: 100,
            type: 'time',
            renderCell:(params) =>{
                let time;
                try{
                    time = moment(params.row.duration?.toISOString()).format('HH:mm:ss');
                }
                catch(reject){
                    return null;
                }
                return(
                    <Tooltip title={`${time}, "this is the duration of the transaction"`}>

                        <p>{time}</p>
                    </Tooltip>
                );
            }
        },    
        {
            field: "status",
            headerName: "Status",
            flex: 1,
        }, 
    ]
}
