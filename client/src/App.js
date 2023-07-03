import React, {useState} from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
 
// We import all the components we need in our app
import Main from "./pages/main"; 
import Navbar from "./layouts/navbar"

//themes
import lightTheme from "./themes/light"
import darkTheme from "./themes/dark"


const App = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const changeTheme = () =>{
        setIsDarkTheme(!isDarkTheme)
    };
 return (
    <ThemeProvider theme={ isDarkTheme? createTheme(darkTheme) :createTheme(lightTheme)}>
      <CssBaseline />
   <div>
    <Navbar isDarkTheme={isDarkTheme} changeTheme={changeTheme} />
     <Routes>
        <Route path="/" element={<Main/>} />
     </Routes>
   </div>
   </ThemeProvider>
 );
};
 
export default App;