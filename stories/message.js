import React from "react";
import { storiesOf } from "@storybook/react";
import '../components/message/style.js'


let a= 0;
import App from "../components/message/index.tsx";
import AppJs from "../components/message/index.js";

console.dir(App)
storiesOf("Message", module).add("message", () => (
  // 这里是另一个 story
  <div style={{ padding: "0 30px 0 30px" }}>
    <h1>基础布局</h1>
    <div style={{display:"line-block"}} onClick={function () {
      a++
      App.openMsg({message: `messagea ${a}`, key: '5a'})
    }}>根据key刷新</div>
    <div style={{display:"line-block",margin: "10px 0"}} onClick={function () {
      App.openMsg({message: `已领取~`,})
    }}>点击领取疾风剑豪</div>
    <App message={'已领取'} className="kk" duration={'123'} />

    <div style={{display:"line-block",margin: "10px 0"}} onClick={function () {
      AppJs.openMsg({message: `已领取~`,})
    }}>点击领取疾风剑豪JS</div>

  </div>
));
