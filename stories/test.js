import React from "react";
import { storiesOf } from "@storybook/react";
import '../components/message/style.js'


import App from "../components/message/index.tsx";
console.dir(App)
storiesOf("Message", module).add("message", () => (
  // 这里是另一个 story
  <div style={{ padding: "0 30px 0 30px" }}>
    <h1 onClick={function () {
      App.openMsg({message: 'message'})
    }}>基础布局</h1>
    <App message={'已领取'} cla = {1} className="kk" duration={'123'} />
  </div>
));
