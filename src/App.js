import React from "react";
import Form from "./features/form/Form";
import Nav from "./features/nav/nav";
import "./App.less";

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <Form />
    </div>
  );
}

export default App;
