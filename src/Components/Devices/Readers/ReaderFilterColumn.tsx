import Tooltip from '@mui/material/Tooltip';
import moment from "moment";
import { GridColDef } from "@mui/x-data-grid-pro";
import { Schema } from "read-excel-file";


export function getReaderColumns(): GridColDef[]{
    return[
        {
            field: "readerId",
            headerName: "reader ID",
            flex: 1,
        },        
        {
            field: "lastChanged",
            headerName: "Last Changed",
            flex: 1,
        },        
        {
            field: "readerLocation",
            headerName: "Location",
            flex: 1,
        }, 
        {
            field: "readerStatus",
            headerName: "Status",
            flex: 1,
        },         
        {
            field: "lastChanged",
            headerName: "Last Changed",
            flex: 1,
            minWidth: 100,
            type: 'dateTime',
            renderCell:(params) =>{
                let time;
                try{
                    time = moment(params.row.lastChanged?.toISOString()).format('YYYY-MM-DDT HH:mm:ss');
                }
                catch(reject){
                    return null;
                }
                return(
                    <Tooltip title={`${time}, "this is the time"`}>
                        <p>{time}</p>
                    </Tooltip>
                );
            }
        }, 
        {
            field: "lastFetched",
            headerName: "Last Fetched",
            flex: 1,
            minWidth: 100,
            type: 'dateTime',
            renderCell:(params) =>{
                let time;
                try{
                    time = moment(params.row.lastFetched?.toISOString()).format('YYYY-MM-DDT HH:mm:ss');
                }
                catch(reject){
                    return null;
                }
                return(
                    <Tooltip title={`${time}, "this is the time"`}>
                        <p>{time}</p>
                    </Tooltip>
                );
            }
        },    
   
        {
            field: "mode",
            headerName: "Mode",
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
        },
        {
            field: "slug",
            headerName: "Slug",
            flex: 1,
        },

      
        
    ]
}

export const getSchema =():Schema => {
    return{
        assetID:{
            prop:"assetID",
            type: String,
        },
        tagID:{
            prop:"tagID",
            type:String,
        },
        assetType:{
            prop:"assetType",
            type:String,
        },
        assetAge:{
            prop:"assetAge",
            type:Date,
        },
        assetStatus:{
            prop:"assetStatus",
            type:String,
        }
    }

}