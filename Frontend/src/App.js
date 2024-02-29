import React from "react";
import { AppStateProvider } from "./tools/context";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { Landing } from "./components/landing";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { UserView } from "./components/userview";
import { ToolBar } from "./components/toolbar";

const App = () => (
  <AppStateProvider>
    <ToolBar />
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/user/:id" element={<UserView />} />
      </Routes>
    </Router>
  </AppStateProvider>
);

export default App;
