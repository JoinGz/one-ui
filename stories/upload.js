import React from "react";
import { storiesOf } from "@storybook/react";

import Upload from "../components/upload/index.js";
import Button from "../components/button/index.jsx";


import "../components/upload/style.js";
import "../components/button/style.js";


storiesOf("Upload", module).add("upload", () => (
  // 这里是另一个 story
  <div style={{ padding: "0 30px 0 30px" }}>
    <h1>基础布局</h1>
    <Upload action="http://127.0.0.1:3001/uploadST">
      <Button>upload</Button>
    </Upload>
    <Upload action="http://127.0.0.1:3001/uploadST" multiple>
      <Button>upload</Button>
    </Upload>
    <Upload action="http://127.0.0.1:3001/uploadST" multiple showFileList>
      <Button>upload</Button>
    </Upload>
  </div>
));
