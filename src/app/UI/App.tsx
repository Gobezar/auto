import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ReduxProvider } from "../store/provider";
import AppRouter from "../AppRouter";
import Navbar from "../../widgets/Header/UI/Navbar";
import "./global.scss";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ReduxProvider>
          <Navbar />
          <AppRouter />
        </ReduxProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
