import React, { useState } from "react";
import { ColorModeContext, useMode } from "./themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import MySidebar from "./scenes/global/Sidebar";
import LoginPage from "./scenes/login";
import Categories from "./scenes/categories";
import Settings from "./scenes/settings";
import Reports from "./scenes/reports";
import Offices from "./scenes/offices";

// import Team from "./scenes/Team";
// import Contacts from "./scenes/Contacts";
// import Invoices from "./scenes/Invoices";
// import Form from "./scenes/Form";
// import Bar from "./scenes/Bar";
// import Pie from "./scenes/Pie";
// import Line from "./scenes/Line";
// import FAQ from "./scenes/FAQ";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthenticated && <MySidebar />}
          <main className="content">
            {isAuthenticated && <Topbar />}
            {!isAuthenticated && (
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            )}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {/* Categories */}
              <Route path="/categories" element={<Categories />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="*" element={<Dashboard />} />
              <Route path="/offices" element={<Offices />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
