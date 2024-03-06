import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MoreVertRounded } from "@mui/icons-material";

interface DropdownProps {
  disableMoreActions: boolean;
  btnClicked: (btn_type: string) => void;
  selectedTab: string;
}
export default function DropDownActions(props: DropdownProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (btn_type: string) => {
    setAnchorEl(null);
    props.btnClicked(btn_type);
  };

  return (
    <div>
      <Button
        startIcon={<MoreVertRounded />}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disabled={props.disableMoreActions}
      >
        Actions
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClose("data_updates_done")}>Data updates done</MenuItem>
        {/* <MenuItem onClick={() => handleClose("data_mismatch_done")}>Data mismatch done</MenuItem> */}
        <MenuItem onClick={() => handleClose("delete_orders")}>Delete selected orders</MenuItem>
      </Menu>
    </div>
  );
}
