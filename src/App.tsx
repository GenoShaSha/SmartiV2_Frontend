import "./App.css";

import { HashRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import LoadingScreen from "./Components/LoadingScreen/Loadingscreen";
import Layout from "./Layout/MainLayout";
import ListOfActiveAssets from "./Components/Assets/ListOfActiveAssets";
import ListOfSpecificAssetsHistory from "./Components/Assets/AssetsHistory/ListOfSpecificAssetHistory";

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
    <>
       <HashRouter>
        <Layout> {/* Layout component outside of Routes */}
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/Assets" element={<ListOfActiveAssets/>} />     
            <Route path="/AssetsHistory/:assetId" element={<ListOfSpecificAssetsHistory/>} />            
            <Route path="/UserManagement" element={<></>} />
          </Routes>
        </Layout>
      </HashRouter>
      <ToastContainer position="bottom-center" autoClose={4000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
}

export default App;
