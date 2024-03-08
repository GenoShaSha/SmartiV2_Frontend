import Box from '@mui/material/Box';
// import useSelector from 'react-redux';
import { useLocation } from 'react-router-dom';
// import selectUserState from '../../...';
import AppBarWithDrawer from "../Components/AppBarAndDrawer/AppBarDrawer";

const Layout = ({ children }: any) => {
  let { pathname } = useLocation();
  //will use it when the slected user is created
//   const { user, loggedIn} = useSelector();
  const loggedIn=true;


  return (
    <>
      <Box sx={{ display: "flex" }}>
        {pathname == "/" ||
        pathname == "/Assets"||
        pathname == "/Devices"||
        pathname == "/Orders"||
        pathname == "/UserManagement"||
        pathname == '/AssetsHistory/:assetId'||
        pathname == `/Customer/${pathname.split("/")[2]}`? (
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