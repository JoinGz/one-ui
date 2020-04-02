import React, {useState, useEffect} from 'react'
import cls from 'classnames';
import {messageProps} from './interface'
import ReactDOM from 'react-dom';

function Message (props: messageProps) {
  const {
    prefixCls,
    className = '',
    children,
    message,
    iconClass,
    duration,
    dom,
    ...attr
  } = props
  let [visiblity, setVisiblity] = useState(true)
  
  useEffect(()=>{
    if (dom) {
      setTimeout(() => {
        setVisiblity(false)
        setTimeout(() => {
          ReactDOM.unmountComponentAtNode(dom)
          dom.parentElement.removeChild(dom)
        }, 200);
      }, duration);
    }
  }, [])
  return (
    <div className={cls(prefixCls, className, {
      [`${prefixCls}-visiblity`]: dom && visiblity,
      [`${prefixCls}-hide`]: dom && !visiblity,
    })} {...attr}>
      <div>
        <i className={cls(`${prefixCls}-icon`, iconClass)}></i>
        {message}
      </div>
    </div>
  )
}
Message.defaultProps = {
  prefixCls: 'one-message',
  duration: 3000,
}
Message.isRender = false

Message.openMsg = function (data: messageProps) {
  // const [isRender, setRender] = useState(false)
  const { prefixCls= 'one-message' } = data
  let dom: HTMLDivElement,newDiv: HTMLDivElement
  if (Message.isRender) {
    dom = document.querySelector(`.${prefixCls}-container`)
    newDiv = document.createElement('div')
    dom.appendChild(newDiv)
  } else {
    dom = document.createElement('div')
    newDiv = document.createElement('div')
    dom.className = `${prefixCls}-container`
    dom.appendChild(newDiv)
    document.body.appendChild(dom)
    Message.isRender = true
  }
  // if (newDiv) {
  //   setTimeout(() => {
  //     ReactDOM.unmountComponentAtNode(newDiv)
  //   }, 2000);
  // }
   ReactDOM.render(
      // React.createElement(Message, Object.assign(data, {dom: newDiv})), newDiv
      <Message {...data} dom={newDiv} />, newDiv
  );
}
export default Message

/**
 * 此组件用静态方法调用，和其他的组件有点不同
 * 用React.createElement去创建Vdom,在同一元素中,会进行diff比较,而不是新生成一个,所以我们每次都要新增加一个div
 * 用ReactDOM.render去挂载Vdom,并会返回实例
 * 
 */