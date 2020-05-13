import React, {useState, useEffect} from 'react'
import cls from 'classnames';
// import {messageProps} from './interface'
import ReactDOM from 'react-dom';
import { FiAlertCircle } from 'react-icons/fi'
const typeIcon = {
  'success': "success",
  'warning': "warning",
  'info': "info",
  'error': "error",
}
function Message (props) {
  const {
    prefixCls,
    className = '',
    children,
    message,
    iconClass,
    duration,
    dom,
    mkey,
    type = 'success',
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
          delete Message.instance[mkey]
          console.dir(Message);
          
        }, 200);
      }, duration);
    }
  }, [])
  return (
    <div className={cls(prefixCls, className, {
      [`${prefixCls}-visiblity`]: dom && visiblity,
      [`${prefixCls}-hide`]: dom && !visiblity,
    })} {...attr}>
      <div className={cls(`${prefixCls}-text`)}>
        {/* <i className={cls(`${prefixCls}-icon`, iconClass)}></i> */}
        <FiAlertCircle className={cls(`${prefixCls}-icon`, `${prefixCls}-icon-${type}`)}></FiAlertCircle>
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
Message.instance = {}
Message.key = 1
Message.openMsg = function (data) {
  // const [isRender, setRender] = useState(false)
  const { prefixCls= 'one-message', key } = data
  let dom,newDiv

  if (key && Message.instance[key]) {
    ReactDOM.render(
      // React.createElement(Message, Object.assign(data, {dom: newDiv})), newDiv
      <Message {...data} dom={Message.instance[key]} mkey={key} />, Message.instance[key]
    );
    return
  }else {
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
    const mkey = key ? key : Message.key++
    Message.instance[mkey] =  newDiv
    ReactDOM.render(
        // React.createElement(Message, Object.assign(data, {dom: newDiv})), newDiv
        <Message {...data} dom={newDiv} mkey={mkey} />, newDiv
    );
  }
  
};

['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = function (params) {
    if (typeof params === 'string') {
      params = {
        message: params
      }
    }
    params.type = type
    return Message.openMsg(params)
  }
});
export default Message

/**
 * 此组件用静态方法调用，和其他的组件有点不同
 * 用React.createElement去创建Vdom,在同一元素中,会进行diff比较,而不是新生成一个,所以我们每次都要新增加一个div
 * 用ReactDOM.render去挂载Vdom,并会返回实例
 * 
 */