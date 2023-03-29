import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
 import './app.css'
import RouterProvaider from "./Router/Router";

const App = () =>{
    return(
        <Router>
            <RouterProvaider/>
        </Router>
    )
}
export default App