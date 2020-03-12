import React from "react";
import { storiesOf } from "@storybook/react";

import Upload from "../components/upload/index.js";
import Button from "../components/button/index.jsx";


import "../components/upload/style.js";
import "../components/button/style.js";


storiesOf("Col", module).add("Col2", () => (
  // 这里是另一个 story
  <div style={{ padding: "0 30px 0 30px" }}>
    <h1>基础布局</h1>
    <Upload action="">
      <Button>upload</Button>
    </Upload>
    <Upload action="" multiple>
      <Button>upload</Button>
    </Upload>
  </div>
));
