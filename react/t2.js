import React from 'react';

const RocketComponent = props => {
  console.log('我不想更新');
  return (
    <div>my rocket component. {props.fuel}!</div>
  )
}
// create a version that only renders on prop changes
export default React.memo(RocketComponent);