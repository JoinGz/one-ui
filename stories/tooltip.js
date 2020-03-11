import React from 'react';
import { storiesOf } from '@storybook/react';

import Tooltip from '../components/tooltip/index.jsx'
import Button from '../components/button/index.jsx'
import '../components/tooltip/style.js'

storiesOf('Tooltip', module)
  .add('Tooltip2', () => (  // 这里是另一个 story
    <div style={{padding: '0 0 0 30px'}}>
      <h1>基本使用</h1>
      <Tooltip style={{ margin: "0 10px" }} title="基本使用 one-ui">
        <span>hover</span>
      </Tooltip>
      <h1>位置</h1>
        <Tooltip title="上边的朋友">
          <Button>上</Button>
        </Tooltip>
        <Tooltip  title="下边的朋友" position="bottom" >
          <Button>下</Button>
        </Tooltip>
        <Tooltip title="左边的朋友" position="left" >
          <Button>左</Button>
        </Tooltip>
        <Tooltip title="右边的朋友" position="right">
          <Button>右</Button>
        </Tooltip>
      <h1>两种触发方式</h1>
        <Tooltip title="one-ui" trigger="hover" >
          <Button>hover</Button>
        </Tooltip>
        <Tooltip title="one-ui" trigger="click">
          <Button>click</Button>
        </Tooltip>
      <h1>主题</h1>
        <Tooltip title="click" trigger="click" theme="light">
          <Button>click</Button>
        </Tooltip>
        <Tooltip title="click" trigger="click" theme="light" position="bottom" >
          <Button>click</Button>
        </Tooltip>
        <Tooltip title="click" trigger="click" theme="light" position="left" >
          <Button>click</Button>
        </Tooltip>
        <Tooltip title="click" trigger="click" theme="light" position="right">
          <Button>click</Button>
        </Tooltip>
      <h1>默认显示</h1>
        <Tooltip title="visible"  visible>
          <Button>click</Button>
        </Tooltip>
      <h1>回调</h1>
        <Tooltip title="one-ui" onVisibleChange={visible => console.log("visible", visible)}>
          <Button>click</Button>
        </Tooltip>
      <h1>插入body</h1>
        <Tooltip title="body" appendToBody trigger="click">
          <Button>click</Button>
        </Tooltip>
        <Tooltip title="body" appendToBody trigger="click" position="bottom" >
          <Button>click</Button>
        </Tooltip>
        <Tooltip title="body" appendToBody trigger="click" position="left" >
          <Button>click</Button>
        </Tooltip>
        <Tooltip title="body" appendToBody trigger="click" position="right">
          <Button>click</Button>
        </Tooltip>
    </div>
  ));