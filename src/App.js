import React, { useState } from "react";
import { ColorModeContext, useMode } from "./themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Sidebar from "./scenes/global/Sidebar";
import LoginPage from "./scenes/login";
// import Team from "./scenes/Team";
// import Contacts from "./scenes/Contacts";
// import Invoices from "./scenes/Invoices";
// import Form from "./scenes/Form";
// import Bar from "./scenes/Bar";
// import Pie from "./scenes/Pie";
// import Line from "./scenes/Line";
// import FAQ from "./scenes/FAQ";

function App() {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false);
  const [ theme, colorMode ] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        {isAuthenticated ? (
              <Sidebar />
            ) : (
             null
            )}
          <main className="content">
         {isAuthenticated ? (
              <Topbar />
            ) : (
              null
            )}
            {isAuthenticated ? (
              <Dashboard />
            ) : (
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            )}
            <Routes>
              <Route path="/" element={< Dashboard />} />
              {/* <Route path="/team" element={<Team />} /> */}
              {/* <Route path="/contacts" element={<Contacts />} /> */}
              {/* <Route path="/invoices" element={<Invoices />} /> */}
              {/* <Route path="/form" element={<Form />} /> */}
              {/* <Route path="/bar" element={<Bar />} /> */}
              {/* <Route path="/pie" element={<Pie />} /> */}
              {/* <Route path="/line" element={<Line />} /> */}
              {/* <Route path="/faq" element={<FAQ />} /> */}
            </Routes>
          </main>
        </div>
        </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
