import React from "react";
import Form from "./features/form/Form";
import Nav from "./components/nav/Nav";
import PageContainer from "./components/pageContainer/PageContainer";
import "./App.less";
import { Route, Switch } from "react-router"; // react-router v4/v5

function App() {
  return (
    <>
      <Nav></Nav>
      <PageContainer>
        <Switch>
          <Route exact path="/" component={Form} />
          <Route render={() => <div>No route</div>} />
        </Switch>
      </PageContainer>
    </>
  );
}

export default App;
