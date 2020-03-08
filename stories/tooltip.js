import React from 'react';
import { storiesOf } from '@storybook/react';

import Tooltip from '../components/tooltip/index.jsx'
import Bu from '../components/button/index.jsx'
import '../components/tooltip/style.js'


storiesOf('Tooltip', module)
  .add('Tooltip2', () => (  // 这里是另一个 story
    <div style={{padding: '0 0 0 30px'}}>
      <h1>基本使用</h1>
      <Tooltip title="789">
        <span>hover</span>
      </Tooltip>
      <Tooltip title="789" position="bottom">
        <Bu>hover</Bu>
      </Tooltip>
      <Tooltip title="789" position="left">
        <span>hover</span>
      </Tooltip>
      <Tooltip title="789" position="right">
        <span>hover</span>
      </Tooltip>
    </div>
  ));