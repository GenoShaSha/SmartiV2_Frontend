import { Badge, Chip} from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import moment from "moment";
import { GridActionsCell, GridColDef } from "@mui/x-data-grid-pro";
import { Schema } from "read-excel-file";
import { AttachFileOutlined, CheckOutlined, EditOutlined, RuleOutlined, UpdateOutlined } from "@mui/icons-material";
import { AnyIfEmpty } from "react-redux";


export function getAssetColumns(handleClickAction: (clickedRow: any) =>void): GridColDef[]{
    return[
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
            field: "assetType",
            headerName: "Type",
            flex: 1,
        }, 
        {
            field: "assetStatus",
            headerName: "Status",
            flex: 1,
        },         
        {
            field: "assetAge",
            headerName: "Age of Asset",
            flex: 1,
            minWidth: 100,
            type: 'date',
            renderCell:(params) =>{
                let date;
                try{
                    date = moment(params.row.assetAge?.toISOString()).format('DD/MM/YY');
                }
                catch(reject){
                    return null;
                }
                return(
                    <Tooltip title={`${date}, "this is the date when the asset get registered"`}>

                        <p>{date}</p>
                    </Tooltip>
                );
            }
        },    
        {
            field: "client",
            headerName: "Client",
            flex: 1,
        }, 
        {
            field: "comitteeName",
            headerName: "Comittee Name",
            flex: 1,
        },    
        {
            field: "previousLocation",
            headerName: "Previous Location",
            flex: 1,
        },        
        {
            field: "currentLocation",
            headerName: "Current Location",
            flex: 1,
        },        
        {
            field: "lastSeen",
            headerName: "Last Seen",
            flex: 1,
            minWidth: 100,
            type: 'dateTime',
            renderCell:(params) =>{
                let dateTime;
                try{
                    dateTime = moment(params.row.lastSeen?.toISOString()).format('DD/MM/YY HH:mm:ss');
                }
                catch(reject){
                    return null;
                }
                return(
                    <Tooltip title={`${dateTime}, "This is the date and time when the asset is seen"`}>
                        <p>{dateTime}</p>
                    </Tooltip>
                );
            }
        },        
        {
            field: "assetTemperature",
            headerName: "Temperature",
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            renderCell: (params) => {
              return (
                <>
                  {!params.row.orderNeedsAttention && params.row.fieldUpdates?.length ? (
                    <Chip clickable onClick={() => handleClickAction(params.row)} icon={<EditOutlined />} size="small" variant="outlined" label="UPDATES" color={"warning"} />
                  ) : null}
                  {params.row.dataMismatches?.length ? (
                    <Chip size="small" clickable onClick={() => handleClickAction(params.row)} icon={<RuleOutlined />} variant="outlined" label="MISMATCH" color={"warning"} />
                  ) : null}
                </>
              );
            },
            width: 200,
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