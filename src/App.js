import React, { Component } from "react";
import "./App.css";
import Main from "./main"

class App extends Component {
  render() {
    return (
      <div className="body">
        <h1>合いの手ガイドアプリ</h1>
        <Main/>
      </div>
    );
  }
}

export default App;
