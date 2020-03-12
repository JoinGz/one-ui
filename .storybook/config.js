import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/index.js'); // 指定 story 的位置
  // 可以是任意目录，根据自己需要写路径
  require('../stories/tooltip.js'); // 指定 story 的位置
  require('../stories/col.js'); // 指定 story 的位置
  require('../stories/upload.js'); // 指定 story 的位置
}

configure(loadStories, module);