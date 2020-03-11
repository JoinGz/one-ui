import React from 'react';
import { storiesOf } from '@storybook/react';

import Col from '../components/col/index.js'
import '../components/col/style.js'

storiesOf('Col', module)
  .add('Col2', () => (  // 这里是另一个 story
    <div style={{padding: '0 0 0 30px'}}>
      <h1>基本使用</h1>
      <Col style={{background: '#ccc'}}>
        测试
      </Col>
      <Col style={{background: 'greed'}} span='12' >
        测试
      </Col>
      <Col style={{background: 'red'}} span={12}>
        测试
      </Col>
    </div>
  ));