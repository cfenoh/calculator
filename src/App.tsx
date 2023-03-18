import React, { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { provinces } from "./taxByProvinces";
import { serviceList } from "./serviceList";
import TipForm from "./features/TipForm/TipForm";

function App() {
  return (
    <Suspense fallback="loading">
      <div className="App max-width-450 margin-auto">
        <TipForm provinces={provinces} services={serviceList} />
      </div>
    </Suspense>
  );
}

export default App;
