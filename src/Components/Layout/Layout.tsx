import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import AppBarWithDrawer from "../AppBarAndDrawer/AppBarDrawer";

const Layout = ({ children }: any) => {
  let { pathname } = useLocation();
  const loggedIn = true;
  return (
    <>
      <Box sx={{ display: "flex" }}>
        {pathname == "/" ||
        pathname == "/dashboard"
      ? (
          loggedIn && <AppBarWithDrawer/>
        ) : (
          <></>
        )}
        {/* all childrens will be rendered here */}
        <Box
          component="main"
          sx={{ flexGrow: 1, py: 0, px: 0, backgroundColor: "#F5F5F5" }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
