import "./App.css";

import { HashRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import LoadingScreen from "./Components/LoadingScreen/Loadingscreen";
import Layout from "./Layout/MainLayout";
import ListOfActiveAssets from "./Components/Assets/ListOfActiveAssets";
import ListOfSpecificAssetsHistory from "./Components/Assets/AssetsHistory/ListOfSpecificAssetHistory";
import ListOfDevices from "./Components/Devices/ListOfDevices";
import { LocalizationProvider } from "@mui/x-date-pickers";
import ListOfReaders from "./Components/Devices/Readers/ListOfReaders";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";


function App() {
  // STATES
  const [loading, setLoading] = React.useState(true);

  
  // HOOKS
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  },[])


  function loadingScreen() {
    return <LoadingScreen />;
  }

  if (loading) return loadingScreen();


  
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
       <HashRouter>
        <Layout> {/* Layout component outside of Routes */}
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/Assets" element={<ListOfActiveAssets/>} />     
            <Route path="/AssetsHistory/:assetId" element={<ListOfSpecificAssetsHistory/>} />            
            <Route path="/Devices" element={<ListOfDevices/>} />            
            <Route path="/UserManagement" element={<></>} />
            <Route path="/Readers" element={<ListOfReaders/>} />

          </Routes>
        </Layout>
      </HashRouter>
      <ToastContainer position="bottom-center" autoClose={4000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </LocalizationProvider>
  );
}

export default App;
