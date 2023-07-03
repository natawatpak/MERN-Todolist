import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Main from "./pages/main"; 

const App = () => {
 return (
   <div>
     <Routes>
        <Route path="/" element={<Main/>} />
       {/* <Route exact path="/" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} /> */}
     </Routes>
   </div>
 );
};
 
export default App;