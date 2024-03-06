import { ArrowDropUpOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
const DropDownMenu = () => {

  const signoutHandlar = async () => {
    // await signOut(auth);
    // navigate("/login");
    // dispatch(setUser({}));
  };
  return (
    <Box
      sx={{
        position: "absolute",
        right: "2.5%",
        top: "7%",
        padding: "0 5px 5px 5px",
        zIndex: 1000,
        mt: "50px",
        width: "13rem",
      }}
    >
      <ArrowDropUpOutlined
        sx={{
          color: "#161313ba",
          mb: 0,
          position: "absolute",
          right: -7,
          top: 0,
          padding: "0.3rem",
          transform: "scale(2.8",
        }}
      />

      <Box
        sx={{
          boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
          backgroundColor: "white",
          margin: "19px 0 0 5px",
          padding: "0.1rem 1rem",
        }}
      >
        {/* <Typography
          onClick={(e) => navigate("/admin")}
          sx={{
            color: "#141313cf",
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer",
            mt: 1,
          }}
        >
          <Settings /> Admin
        </Typography> */}
        <Typography
          onClick={signoutHandlar}
          sx={{
            color: "#141313cf",
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
            cursor: "pointer",
          }}
        >
          <LogoutIcon /> Sign Out
        </Typography>{" "}
        <Typography
          onClick={signoutHandlar}
          sx={{
            color: "#141313cf",
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          {/* {user.displayName} */}
          PHAROX DEMO
        </Typography>
      </Box>
    </Box>
  );
};

export default DropDownMenu;

// const DropdownLInks = styled.div`
//   box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
//     rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
//   background-color: white;
//   margin: 15px 0 0 5px;
//   padding: 0.1rem 2rem;
// `;

// const IconDropDown = styled(ArrowDropUpOutlined)`
//   color: #161313ba;
//   margin-bottom: 0;
//   position: absolute;
//   right: 0;
//   top: 0;
//   padding: 0.3rem;
//   transform: scale(2.8);
// `;
// const H6 = styled.h6`
//   display: flex;
//   align-items: center;
//   justify-content: space-evenly;
//   font-size: 14px;
//   color: gray;
//   cursor: pointer;
//   margin: 10px 0 8px 0;
//   letter-spacing: 1px;
//   transition: 0.2s;
//   &:hover {
//     color: #282b29;
//     transition: 0.2s ease-in;
//     transform: scale(1.02);
//   }
// `;
