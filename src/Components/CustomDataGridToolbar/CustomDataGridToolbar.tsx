import { GridToolbarExport, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from "@mui/x-data-grid-pro";
import DropDownActions from "../DropDownActions/DropDownMenu";

interface CustomToolbarProps {
  dropDownBtnClicked: (btn_type: string) => void;
  viewGridToolbarColumnsButton: boolean;
  viewGridToolbarFilterButton: boolean;
  viewGridToolbarDensitySelector: boolean;
  viewGridToolbarExport: boolean;
  disableMoreActions: boolean;
  selectedTab: string;
}
export default function CustomToolbar(props: CustomToolbarProps) {
  return (
    <GridToolbarContainer>
      {props.viewGridToolbarColumnsButton && <GridToolbarColumnsButton />}
      {props.viewGridToolbarFilterButton && <GridToolbarFilterButton />}
      {props.viewGridToolbarDensitySelector && <GridToolbarDensitySelector />}
      {props.viewGridToolbarExport && <GridToolbarExport />}
      <DropDownActions selectedTab={props.selectedTab} btnClicked={props.dropDownBtnClicked} disableMoreActions={props.disableMoreActions} />
    </GridToolbarContainer>
  );
}
