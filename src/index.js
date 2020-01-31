import React from "react";
import { render } from "react-dom";
import Tree from "./Tree";
// import data from "./data";
import data from "./dataFamily";

const App = () => (
  <div>
    <Tree data={data} width={700} height={700} />
  </div>
);

render(<App />, document.getElementById("root"));
