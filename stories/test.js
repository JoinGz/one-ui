import React from "react";
import { storiesOf } from "@storybook/react";

import App from "../components/test/index.tsx";

storiesOf("Test", module).add("Col2", () => (
  // 这里是另一个 story
  <div style={{ padding: "0 30px 0 30px" }}>
    <h1>基础布局</h1>
    <App />
  </div>
));
