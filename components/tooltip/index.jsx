import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import ReactDOM from 'react-dom';

const triggerTypes = {
  hover: 'hover',
  click: 'click'
};
const themes = ['dark', 'light'];


const Position = props => {
  const { triggerRef, appendToBody, children } = props;
  if (appendToBody) {
    return ReactDOM.createPortal(children, document.body);
  } else {
    return ReactDOM.createPortal(children, triggerRef.current);
  }
};
const TooltipMemo = React.memo(Tooltip);
export default TooltipMemo
function Tooltip (props) {
  console.log('重新渲染了');
  
  const triggerRef = useRef();
  const postionRef = useRef();
  const hoverDomRef = useRef();
  const timerRef = useRef({ timer: null, blockTimer: null, debounce: null, isOpend: false }); // 移入移出定时器


  const [visibility, setVisibility] = useState(props.visible);
  const [styleDate, setStyleDate] = useState({ left: 0, top: 0 });
  const [isRender, setIsRender] = useState(false);
  const [noblock, setNoBlock] = useState('block');

  const {
    prefixCls,
    className,
    theme,
    children,
    title,
    trigger,
    onVisibleChange,
    appendToBody,
    disabled,
    position,
    visible
  } = props;

  const isHover = trigger === triggerTypes['hover'] && !visible;

  const bindTriggerEvents = disabled
    ? {}
    : isHover
      ? {
        mouseenter: mouerIn,
        mouseleave: mouerOut
      }
      : {
        click: mouerIn
      };

  function mouerIn (e) {
    setIsRender(true);
    setNoBlock('block');
    console.log('进入');
    console.log(timerRef.current);
    clearTimeout(timerRef.current.debounce);
    clearTimeout(timerRef.current.blockTimer);
    // clearTimeout(timerRef.current.timer);
    setVisibility(true);
    if (!timerRef.current.isOpend) {
      onVisibleChange && onVisibleChange(true)
      timerRef.current.isOpend = true
    }
  }
  function mouerOut (e) {
    if (timerRef.current.debounce) {
      clearTimeout(timerRef.current.debounce)
      // timerRef.current.debounce = null
    }
    timerRef.current.debounce = setTimeout(() => {
      console.log('出去');
      // timer定时器 -- 移出后100ms隐藏
      // timerRef.current.timer = setTimeout(() => {
      setVisibility(false);
      onVisibleChange && onVisibleChange(false)
      timerRef.current.isOpend = false
      timerRef.current.blockTimer = setTimeout(() => {
        // blockTimer定时器 -- 动画结束后设置display:none
        setNoBlock('none');
      }, 200);
      // }, 100)
      // debounce定时器 -- 防抖300ms
    }, 300)
  }

  function clicked (e) {
    if (timerRef.current.isOpend && !hoverDomRef.current.contains(e.target) && !postionRef.current.contains(e.target)) {
      console.log('关闭');
      setVisibility(false);
      onVisibleChange && onVisibleChange(false)
      timerRef.current.isOpend = false
      timerRef.current.blockTimer = setTimeout(() => {
        setNoBlock('none');
      }, 200);
    }
  }

  useEffect(() => {
    if (!visible) {
      Object.keys(bindTriggerEvents).forEach((item, i) => {
        hoverDomRef.current.addEventListener(item, bindTriggerEvents[item], false);
      });
      return () => {
        Object.keys(bindTriggerEvents).forEach((item, i) => {
          hoverDomRef.current.removeEventListener(
            item,
            bindTriggerEvents[item],
            false
          );
        });
      };
    } else {
      // 不在初始化执行,不然拿不到ref
      setIsRender(true)
    }
  }, []);
  // 计算hoverDom出现位置
  useEffect(() => {
    if (isRender) {
      let path = 20;
      const {
          width,
          height,
          top,
          left
        } = triggerRef.current.getBoundingClientRect();
        const {
          width: pw,
          height: ph,
          top: pt,
          left: pl
        } = postionRef.current.getBoundingClientRect();
        let baseX = 0, baseY = 0 ;
      if (appendToBody) {
        // 插入到body的计算方式
        const { scrollX, scrollY } = window;
        baseX = scrollY + top;
        baseY = scrollX + left;
        // positionObj = {
        //   top: {
        //     top: scrollY + top - ph - path/2 ,
        //     // left: scrollX + left - ((width+pw)/2-width),
        //     left: scrollX + left + width/2 - pw/2
        //   },
        //   bottom: {
        //     top: scrollY + top + ph + path/2 ,
        //     left: scrollX + left + width/2 - pw/2
        //   },
        //   left: {
        //     top: scrollY + top + height/2 - ph/2 ,
        //     left: scrollX + left - pw - path
        //   },
        //   right: {
        //     top: scrollY + top + height/2 - ph/2 ,
        //     left: scrollX + left + width + path
        //   }
        // };
      }
      let positionObj = {
          top: {
            top: baseX + -path / 2 - ph,
            left: baseY + width / 2 - pw / 2
          },
          bottom: {
            top: baseX + path + height,
            left: baseY + width / 2 - pw / 2
          },
          left: {
            top: baseX + height / 2 - ph / 2,
            left: baseY -pw - path
          },
          right: {
            top: baseX + height / 2 - ph / 2,
            left: baseY + width + path
          }
        };
      
      setStyleDate({ ...positionObj[position] });
    }
  }, [isRender]);

  useEffect(() => {
    // 不是默认显示的每次生成绑定事件
    if (!visible) {
      if (!isHover && visibility) {
        document.body.addEventListener('click', clicked, false)
      }
      return () => {
        if (!isHover) {
          document.body.removeEventListener('click', clicked, false)
        }
      }
    }
  }, [visibility])

  const { left, top } = styleDate;
  return (
    <div ref={triggerRef} className={cls(`${prefixCls}`, className)}>
      {isRender ? (
        <Position appendToBody={appendToBody} triggerRef={triggerRef}>
          <div
            ref={postionRef}
            onMouseEnter={isHover && visibility ? mouerIn : undefined}
            onMouseLeave={isHover && visibility ? mouerOut : undefined}
            style={{ left, top, display: noblock }}
            className={cls(
              `${prefixCls}-position-${theme}`,
              `${prefixCls}-position`,
              `${prefixCls}-position-${position}`,
              { [`${prefixCls}-position-show`]: visibility }
            )}
          >
            {title}
          </div>
        </Position>
      ) : null}
      <div ref={hoverDomRef} className={cls(`${prefixCls}-trigger`)}>{children}</div>
    </div>
  );
}
Tooltip.defaultProps = {
  prefixCls: 'one-tooltip',
  position: 'top',
  title: '',
  trigger: triggerTypes.hover,
  theme: themes[0],
  onVisibleChange: (e) => { console.log('bool:' + e) },
  getPopupContainer: () => document.body,
  disabled: false,
  visible: false,
};
Tooltip.propTypes = {
  prefixCls: PropTypes.string.isRequired,
  onVisibleChange: PropTypes.func,
  title: PropTypes.node,
  trigger: PropTypes.oneOf(Object.values(triggerTypes)),
  position: PropTypes.oneOf(['top', 'right', 'left', 'bottom']),
  theme: PropTypes.oneOf(themes),
  getPopupContainer: PropTypes.func,
  disabled: PropTypes.bool,
  disabled: PropTypes.bool,
};
/**
 * 思路
 * hover组件children时赖渲染title属性并展示的合适的位置
 * 主要还是在生成类名，不同的类名不同的样式和位置。
 * 用ReactDOM.createPortal创建dom到指定位置，方便index管理
 * 动画消失时不再具备事件
 * 事件的防抖
 * 遇到的问题
 * hooks里面取值是上次的问题
 * 解决方案：
 * 1.设置依赖,依赖更新-->函数更新--->绑定新的函数
 * 2.利用useRef
 * 3.利用useReducer
 * 用NODE.contains()判断是否在元素内
 */