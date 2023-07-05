import React, {useState} from "react";
import { Route, Routes } from "react-router-dom";

// Theme
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import lightTheme from "./themes/light"
import darkTheme from "./themes/dark"

import Main from "./pages/main"; 
import Navbar from "./layouts/navbar"

const App = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const changeTheme = () =>{
        setIsDarkTheme(!isDarkTheme)
    };
 return (
    <ThemeProvider theme={ isDarkTheme? createTheme(darkTheme) :createTheme(lightTheme)}>
      <CssBaseline />
    <Navbar isDarkTheme={isDarkTheme} changeTheme={changeTheme} />
     <Routes>
        <Route path="/" element={<Main/>} />
     </Routes>
   </ThemeProvider>
 );
};
 
export default App;