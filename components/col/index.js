import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import cls from "classnames";

function Col(props) {
  const {
    gutter,
    span,
    offset,
    prefixCls,
    children,
    style,
    className,
    ...attr
  } = props;
  const colStyle = gutter
    ? {
        paddingLeft: gutter / 2,
        paddingRight: gutter / 2
      }
    : {};

  return (
    <div
      className={cls(
        prefixCls,
        className,
        {
          [`${prefixCls}-${span}`]: span,
          [`${prefixCls}-offset-${offset}`]: offset
        },
      )}
      style={{ ...style, ...colStyle }}
      {...attr}
    >
      {children}
    </div>
  );
}
Col.defaultProps = {
  prefixCls: "one-col",
  gutter: 0
};
Col.propTypes = {
  span: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gutter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prefixCls: PropTypes.string.isRequired
};
export default React.memo(Col);

