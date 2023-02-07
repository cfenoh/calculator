import React from "react";
import TipForm from "./features/TipForm/TipForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { provinces } from "./taxByProvinces";
import { serviceList } from "./serviceList";
function App() {
  return (
    <div className="App">
      <TipForm provinces={provinces} services={serviceList} />
    </div>
  );
}

export default App;
