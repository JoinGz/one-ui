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
  const timerRef = useRef({timer:null, blockTimer:null}); // 移入移出定时器


  const [visibility, setVisibility] = useState(false);
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
    position
  } = props;

  const isHover = trigger === triggerTypes['hover'];

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
        if (timerRef.current) {
          clearTimeout(timerRef.current.blockTimer);
          clearTimeout(timerRef.current.timer);
        }
        setVisibility(true);
      }
      function mouerOut(e) {
        console.log('出去');
        timerRef.current.timer = setTimeout(() => {
          setVisibility(false);
          timerRef.current.blockTimer = setTimeout(() => {
            setNoBlock('none');
          }, 200);
        }, 100)
      }

  useEffect(() => {
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
          top: -path - height,
          left: width / 2 - pw / 2
        },
        bottom: {
          top: path + height,
          left: width / 2 - pw / 2
        },
        left: {
          top: height / 2 - ph / 2,
          left: -width - path
        },
        right: {
          top: height / 2 - ph / 2,
          left: width + path
        }
      };
      setStyleDate({ ...positionObj[position] });
    }
  }, [isRender]);
  const { left, top } = styleDate;
  return (
    <div ref={triggerRef} className={cls(`${prefixCls}`, className)}>
      {isRender ? (
        <Position appendToBody={appendToBody} triggerRef={triggerRef}>
          <div
            ref={postionRef}
            onMouseEnter={isHover ? mouerIn : undefined}
            onMouseLeave={isHover ? mouerOut : undefined}
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
  onVisibleChange: () => {},
  getPopupContainer: () => document.body,
  disabled: false
};
Tooltip.propTypes = {
  prefixCls: PropTypes.string.isRequired,
  onVisibleChange: PropTypes.func,
  title: PropTypes.node,
  trigger: PropTypes.oneOf(Object.values(triggerTypes)),
  position: PropTypes.oneOf(['top', 'right', 'left', 'bottom']),
  theme: PropTypes.oneOf(themes),
  getPopupContainer: PropTypes.func,
  disabled: PropTypes.bool
};