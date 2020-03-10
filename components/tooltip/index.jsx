import React, { useState, useEffect, useRef, useMemo } from 'react';
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
export default function Tooltip(props) {
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

  function mouerIn(e) {
    setIsRender(true);
    setNoBlock('block');
    console.log('进入');
    console.log(timerRef.current);
    clearTimeout(timerRef.current.debounce);
    clearTimeout(timerRef.current.blockTimer);
    clearTimeout(timerRef.current.timer);
    setVisibility(true);
    if (!timerRef.current.isOpend) {
      onVisibleChange && onVisibleChange(true)
      timerRef.current.isOpend = true
    }
  }
  function mouerOut(e) {
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

  function clicked(e) {
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
      let positionObj = {};
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
      const { scrollX, scrollY } = window;
      console.log('scrollX: ', scrollX);
      let path = 20;
      positionObj = {
        top: {
          top: -path/2 - ph,
          left: width / 2 - pw / 2
        },
        bottom: {
          top: path + height,
          left: width / 2 - pw / 2
        },
        left: {
          top: height / 2 - ph / 2,
          left: -pw + path * -1
        },
        right: {
          top: height / 2 - ph / 2,
          left: width + path
        }
      };
      setStyleDate({ ...positionObj[position] });
    }
  }, [isRender]);

  useEffect(()=>{
    // 不是默认显示的每次生成绑定事件
    if(!visible) {
      if (!isHover && visibility) {
      document.body.addEventListener('click', clicked, false)
      }
      return ()=>{
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
  onVisibleChange: (e) => {console.log('bool:' + e)},
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
