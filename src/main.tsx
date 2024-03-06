import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LicenseInfo } from "@mui/x-data-grid-pro";


LicenseInfo.setLicenseKey(import.meta.env.VITE_DATA_GRID_PRO_LICENCE_KEY);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    
  </React.StrictMode>,
)
