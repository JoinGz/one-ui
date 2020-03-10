import React from 'react';

import Tooltip from '../components/tooltip/index.jsx'
import Button from '../components/button/index.jsx'
import '../components/tooltip/style.js'
import '../components/button/style.js'
import Nogen from './t2'
const RocketComponent = props => {
  console.log('徐然了');
  return (
    <div>my rocket component. {props.fuel}!</div>
  )
}

// create a version that only renders on prop changes
const MemoizedRocketComponent = React.memo(RocketComponent);

class IndexPage extends React.PureComponent{
  constructor() {
    super();
    this.state = {
      isShow: false
    };
    console.log('constructor');
  }
  changeState = () => {
    this.setState({
      isShow: true
    })
  };
  render() {
    console.log('render');
    return (
      <div>
        <button onClick={this.changeState}>点击</button>
        <div>{this.state.isShow.toString()}</div>
      </div>
    );
  }
}
class Ye extends React.PureComponent{
// PureComponent 会浅色比较props和state不同则会更新，对象则会比较引用地址。
  constructor(props){
    super(props)
  }
  render () {

    console.log('c Yeeee');
    return (
      <>
        <p>点我</p>
      </>
    )
  }
}
class Xe extends React.Component{
  state = {
    x : 0
  }
  render () {
    console.log('Xe重新渲染');
    
    return (
      <>
        {this.state.x}
        <p onClick={()=>{this.setState({x: this.state.x+1})}}>点我</p>
        <Tooltip style={{margin: '10px'}} title="上边的朋友" trigger="click" u= {this.state.x}>
          <Button>上</Button>
        </Tooltip>
        <Ye />
        <IndexPage />
        <MemoizedRocketComponent />
        <Button>Button</Button>
        <Nogen />
      </>
    )
  }
}
export default Xe