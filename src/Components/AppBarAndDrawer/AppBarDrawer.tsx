import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AppBar } from "./AppBar";
import { Drawer, DrawerHeader } from "./Drawer";
import pharoxLogo from "../../assets/pharox-menu-logo.svg";
import { Avatar, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import DropDownMenu from "./DropDownMenu";
import { menus } from "../../Constants/Menus";
import { NavLink } from "react-router-dom";

let activeStyle = {
  textDecoration: "none",
  color: "white",
};

export default function AppBarWithDrawer() {
  // hooks
  const theme = useTheme();
  // states
  const [open, setOpen] = React.useState(false);
  const [filteredMenus, setFilteredMenus] = React.useState([] as any);
  const [showDropDown, setShowDropDown] = React.useState(false);

  React.useEffect(() => {
    setFilteredMenus(menus);
  }, []);

  // functions
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* <CssBaseline /> */}
      {/* app bar nav */}
      <AppBar sx={{ backgroundColor: " #009cdf" }} position="fixed" open={open}>
        <Toolbar sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              flex: 1,
              alignItems: "center",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="topBarText" noWrap>
              pharox frontend starter template
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
            <Box sx={{ width: "16rem", p: "1px" }}>
              <img style={{ width: "100%",height:"50px" }} src={pharoxLogo} />
            </Box>
            {/* {user ? (
              <Typography variant="h6">{user.email}</Typography>
            ) : (
              "LOGIN"
            )} */}
            <Avatar
              // onClick={signoutHandlar}
              onMouseOver={(e) => {
                setShowDropDown(true);
              }}
              sx={{
                cursor: "pointer",
                ml: 2,
                width: 46,
                height: 46,
                bgcolor: deepPurple[500],
              }}
            />
            {showDropDown && (
              <div onMouseLeave={(e) => setShowDropDown(false)}>
                <DropDownMenu />
              </div>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {/* let drawer */}

      <Drawer variant="permanent" open={open}>
        {/* drawer header  */}
        <DrawerHeader sx={{ display: "flex", justifyContent: "flex-end" }}>
          {/* <img src={logo} alt="pharox-logo" /> */}
          <IconButton color="inherit" onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* menus */}
        <List>
          {filteredMenus?.map(({ path, Icon, title }: any, index: any) => {
            let routeTitle = title;

            return (
              <NavLink key={index} style={{ textDecoration: "none", color: "white" }} to={path}>
                {({ isActive }) => (
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{
                      display: "block",
                      backgroundColor: `${isActive ? "#3c00ff32" : ""}`,
                    }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,

                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <Icon sx={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText primary={routeTitle} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
                )}
              </NavLink>
            );
          })}
        </List>
        <Box
          sx={{
            display: "flex",
            wrap: "noWrap",
            position: "fixed",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            left: open ? "18px" : "0",
            bottom: 0,
            pb: 1,
          }}
        >
          <Typography
            sx={{ marginBottom: "10px", marginLeft: "5px" }}
            // textTransform={"capitalize"}
            variant="subtitle1"
            noWrap
            fontSize={"10px"}
            color={"whitesmoke"}
          >
            Powered by:
          </Typography>
          <Box
            sx={{
              width: "3rem",
              height: "3rem",
              // backgroundColor: "#ffffff3a",
            }}
          >
            <img style={{ width: "3.4rem", height: "1.8rem" }} src={pharoxLogo} />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
