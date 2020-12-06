import React from "react";
import Form from "./features/form/Form";
import Nav from "./components/nav/Nav";
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
