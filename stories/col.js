import React from "react";
import { storiesOf } from "@storybook/react";

import Col from "../components/col/index.js";
import Row from "../components/row/index.js";

import "../components/col/style.js";
import "../components/row/style.js";

storiesOf("Col", module).add("Col2", () => (
  // 这里是另一个 story
  <div style={{ padding: "0 30px 0 30px" }}>
    <h1>基础布局</h1>
    <Col>
      <div style={{ background: "#ccc",height: '32px',background: '#99a9bf', borderRadius: '4px', }}></div>
    </Col>
    <Row style={ { margin: '10px 0' } }>
      <Col span="12">
        <div style={{ background: "#ccc",height: '32px',background: '#d3dce6', borderRadius: '4px', }}></div>
      </Col>
      <Col span={12}>
        <div style={{ background: "#ccc",height: '32px',background: '#e5e9f2', borderRadius: '4px', }}></div>
      </Col>
    </Row>
    <Row style={ { margin: '10px 0' } }>
      <Col span="6">
        <div style={{ background: "#ccc",height: '32px',background: '#d3dce6', borderRadius: '4px', }}></div>
      </Col>
      <Col span={6}>
        <div style={{ background: "#ccc",height: '32px',background: '#e5e9f2', borderRadius: '4px', }}></div>
      </Col>
      <Col span="6">
        <div style={{ background: "#ccc",height: '32px',background: '#d3dce6', borderRadius: '4px', }}></div>
      </Col>
      <Col span={6}>
        <div style={{ background: "#ccc",height: '32px',background: '#e5e9f2', borderRadius: '4px', }}></div>
      </Col>
    </Row>
    <h1>分栏间隔</h1>
    <Row style={ { margin: '10px 0' } } gutter={20}>
      <Col span="12">
        <div style={{ background: "#ccc",height: '32px',background: '#d3dce6', borderRadius: '4px', }}></div>
      </Col>
      <Col span={12}>
        <div style={{ background: "#ccc",height: '32px',background: '#e5e9f2', borderRadius: '4px', }}></div>
      </Col>
    </Row>
    <Row style={ { margin: '10px 0' } } gutter={16}>
      <Col span="8">
        <div style={{ background: "#ccc",height: '32px',background: '#d3dce6', borderRadius: '4px', }}></div>
      </Col>
      <Col span={8}>
        <div style={{ background: "#ccc",height: '32px',background: '#e5e9f2', borderRadius: '4px', }}></div>
      </Col>
      <Col span={8}>
        <div style={{ background: "#ccc",height: '32px',background: '#e5e9f2', borderRadius: '4px', }}></div>
      </Col>
    </Row>
    <h1>混合布局</h1>
    <Row style={ { margin: '10px 0' } } gutter={20}>
      <Col span="7">
        <div style={{ background: "#ccc",height: '32px',background: '#d3dce6', borderRadius: '4px', }}></div>
      </Col>
      <Col span={16}>
        <div style={{ background: "#ccc",height: '32px',background: '#e5e9f2', borderRadius: '4px', }}></div>
      </Col>
    </Row>
    <Row style={ { margin: '10px 0' } } gutter={16}>
      <Col span="2">
        <div style={{ background: "#ccc",height: '32px',background: '#d3dce6', borderRadius: '4px', }}></div>
      </Col>
      <Col span={1}>
        <div style={{ background: "#ccc",height: '32px',background: '#e5e9f2', borderRadius: '4px', }}></div>
      </Col>
      <Col span={8}>
        <div style={{ background: "#ccc",height: '32px',background: '#e5e9f2', borderRadius: '4px', }}></div>
      </Col>
      <Col span={5}>
        <div style={{ background: "#ccc",height: '32px',background: '#e5e9f2', borderRadius: '4px', }}></div>
      </Col>
      <Col span={8}>
        <div style={{ background: "#ccc",height: '32px',background: '#e5e9f2', borderRadius: '4px', }}></div>
      </Col>
    </Row>
    <h1>设置间隔</h1>
    <Row style={ { margin: '10px 0' } } gutter={20}>
      <Col span="6" offset="6">
        <div style={{ background: "#ccc",height: '32px',background: '#d3dce6', borderRadius: '4px', }}></div>
      </Col>
      <Col span={12}>
        <div style={{ background: "#ccc",height: '32px',background: '#e5e9f2', borderRadius: '4px', }}></div>
      </Col>
    </Row>
    <Row style={ { margin: '10px 0' } } gutter={20}>
      <Col span="6" >
        <div style={{ background: "#ccc",height: '32px',background: '#d3dce6', borderRadius: '4px', }}></div>
      </Col>
      <Col span={12} offset="6">
        <div style={{ background: "#ccc",height: '32px',background: '#e5e9f2', borderRadius: '4px', }}></div>
      </Col>
    </Row>
    <h1>对齐方式</h1>
    <Row style={ { margin: '10px 0',height: '60px', background: '#f9fafc' } }  align="top">
      <Col span="6" offset="6">
        <div style={{ background: "#ccc",height: '32px',background: '#d3dce6', borderRadius: '4px', }}></div>
      </Col>
      <Col span={12}>
        <div style={{ background: "#ccc",height: '32px',background: '#e5e9f2', borderRadius: '4px', }}></div>
      </Col>
    </Row>
    <Row style={ { margin: '10px 0',height: '60px', background: '#f9fafc' } }  align="middle">
      <Col span="6" >
        <div style={{ background: "#ccc",height: '32px',background: '#d3dce6', borderRadius: '4px', }}></div>
      </Col>
      <Col span={12} offset="6">
        <div style={{ background: "#ccc",height: '32px',background: '#e5e9f2', borderRadius: '4px', }}></div>
      </Col>
    </Row>
    <Row style={ { margin: '10px 0',height: '60px', background: '#f9fafc' } }  align="bottom" justify="center">
      <Col span="6" >
        <div style={{ background: "#ccc",height: '32px',background: '#d3dce6', borderRadius: '4px', }}></div>
      </Col>
      <Col span={12} offset="6">
        <div style={{ background: "#ccc",height: '32px',background: '#e5e9f2', borderRadius: '4px', }}></div>
      </Col>
    </Row>
    <div style={ { overflow: 'hidden'} }>
    <Row style={ { margin: '10px 0',height: '60px', background: '#f9fafc' } } gutter={20} align="center">
      <Col span="6" >
        <div style={{ background: "#ccc",height: '32px',background: '#d3dce6', borderRadius: '4px', }}></div>
      </Col>
      <Col span="6" >
        <div style={{ background: "#ccc",height: '32px',background: '#d3dce6', borderRadius: '4px', }}></div>
      </Col>
      <Col span={12} >
        <div style={{ background: "#ccc",height: '32px',background: '#e5e9f2', borderRadius: '4px', }}></div>
      </Col>
    </Row>
    </div>
  </div>
));
