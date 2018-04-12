import React, { Component } from "react";
import styled from "styled-components";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Layout/Sidebar";

import "./App.css";
import routes from "./Routing/routes_sidebar";

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48px 1fr;
  grid-template-areas: "sidebar main";
  @media (min-width: 576px) {
    grid-template-columns: 128px 1fr;
  }
  @media (min-width: 768px) {
    grid-template-columns: 256px 1fr;
  }
`;

const Main = styled.main`
  grid-area: main;
  background-color: orange;
`;

class App extends Component {
  componentDidMount = () => {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "token"
    );
    axios.get("http://localhost:9000/api/v1/brands").then(res => {
      console.log(res.data);
    });
  };
  render() {
    if (localStorage.getItem("token") === null) {
      return <Redirect to="/login" />;
    }
    return (
      <Wrapper>
        <Sidebar />
        <Main>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </Main>
      </Wrapper>
    );
  }
}

export default App;
