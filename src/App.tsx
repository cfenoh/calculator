import React, { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Form from "./features/Tip/Form";
import { AppLayout } from "./components/Shared/Layout/AppLayout";

function App() {
  return (
    <Suspense fallback="loading">
      <AppLayout>
        <Form />
      </AppLayout>
    </Suspense>
  );
}

export default App;
