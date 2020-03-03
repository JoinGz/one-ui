import React from 'react';
import { storiesOf } from '@storybook/react';
// import { Button } from '@storybook/react/demo'; // 这里引入你想展示的组件
import Button from '../components/button/index.jsx'
import '../components/button/style.js'
storiesOf('Button', module)
  .add('with text', () => (  // 一个 add 表示添加一个 story
    <Button loading={true} >Hello Button</Button>
  ))
  .add('with some emoji', () => (  // 这里是另一个 story
    <Button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
  ))
  .add('test', () => (  // 这里是另一个 story
    <div style={{padding: '0 0 0 30px'}}>
      <h1>基本使用</h1>
        <Button type='primary'>测试</Button>
        <Button type='warning'>warning</Button>
        <Button>noType</Button>
        <Button type='success'>success</Button>
        <Button type='error'>error</Button>
        <Button type='info'>info</Button>
        <Button disabled>disabled</Button>
        <Button dashed>虚线</Button>
        <Button loading>加载中</Button>
        <Button dashed type='success'>成功的虚线</Button>
      <h1>虚线按钮</h1>
        <Button dashed type='primary'>测试</Button>
        <Button dashed type='warning'>warning</Button>
        <Button dashed>noType</Button>
        <Button dashed type='success'>success</Button>
        <Button dashed type='error'>error</Button>
        <Button dashed type='info'>info</Button>
        <Button dashed disabled>disabled</Button>
        <Button dashed>虚线</Button>
        <Button dashed loading>加载中</Button>
        <Button dashed type='success'>成功的虚线</Button>
      <h1>虚线空心按钮</h1>
        <Button hollow dashed type='primary'>测试</Button>
        <Button hollow dashed type='warning'>warning</Button>
        <Button hollow dashed>noType</Button>
        <Button hollow dashed type='success'>success</Button>
        <Button hollow dashed type='error'>error</Button>
        <Button hollow dashed type='info'>info</Button>
        <Button hollow dashed disabled>disabled</Button>
        <Button hollow dashed>虚线</Button>
        <Button hollow dashed loading>加载中</Button>
        <Button hollow dashed type='success'>成功的虚线</Button>
      <h1>空心按钮</h1>
        <Button hollow type='primary'>测试</Button>
        <Button hollow type='warning'>warning</Button>
        <Button hollow>noType</Button>
        <Button hollow type='success'>success</Button>
        <Button hollow type='error'>error</Button>
        <Button hollow type='info'>info</Button>
        <Button hollow disabled>disabled</Button>
        <Button hollow>虚线</Button>
        <Button hollow loading>加载中</Button>
        <Button hollow type='success'>成功的虚线</Button>
      <h1>禁用按钮</h1>
        <Button disabled type='primary'>测试</Button>
        <Button disabled type='warning'>warning</Button>
        <Button disabled>noType</Button>
        <Button disabled type='success'>success</Button>
        <Button disabled type='error'>error</Button>
        <Button disabled type='info'>info</Button>
        <Button disabled>disabled</Button>
        <Button disabled dashed>虚线</Button>
        <Button disabled type='success'>成功的虚线</Button>
      <h1>三种大小</h1>
        <Button type='success' size="large">warning</Button>
        <Button >noType</Button>
        <Button disabled type='primary' size="small">测试</Button>
      <h1>链接</h1>
        <Button href="#" underline>warning</Button>
        <Button href="#" >noType</Button>
        <Button href="#" disabled>测试</Button>
    </div>
  )); 