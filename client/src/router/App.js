import "../styles/app.css";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "../components/Home";
import Admin from "../components/Admin";
import AppoDetail from "../components/AppoDetail";
import CreateDate from "../components/CreateDate";
import LogIn from "../components/LogIn";

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <Route path={'/n/home/:type'} component={Filter} /> */}
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/calendar"} component={Admin} />
        <Route exact path={"/appo/:id"} component={AppoDetail} />
        <Route exact path={"/createDate"} component={CreateDate} />
        <Route exact path={"/userlogin"} component={LogIn} />
      </div>
    </BrowserRouter>
  );
}

export default App;
