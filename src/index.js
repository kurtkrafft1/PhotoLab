import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import PhotoLab from "./components/PhotoLab";


ReactDOM.render(
    <Router>
      <PhotoLab />
    </Router>,
    document.getElementById("root")
  );