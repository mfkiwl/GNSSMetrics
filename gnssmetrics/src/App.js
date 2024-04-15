import React from "react";
import "./index.css";
import "./App.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Routes, Route } from "react-router-dom";
import Error404 from "./Dev/Contexts/Error";

function App() {
  return (
    <Error404>
      <Routes>
        <Route path="/">
          <Route index element={<Error404 />} />
        </Route>
      </Routes>
    </Error404>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

export default App;
