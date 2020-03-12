import React, {cloneElement} from "react";
import PropTypes from "prop-types";
import cls from "classnames";
const flexAlign = {
  'top': 'flex-start',
  "middle": 'center',
  'bottom': 'flex-end',
}
function Row(props) {
  const {
    gutter,
    prefixCls,
    children,
    style,
    className,
    justify,
    align,
    ...attr
  } = props;
  const rowStyle = gutter
  ? {
      marginLeft: -gutter / 2,
      marginRight: -gutter / 2
    }
  : {};
  return (
    <div
      className={cls(
        prefixCls,
        className,
      )}
      style={{ ...style, justifyContent: justify, alignItems: flexAlign[align],...rowStyle}}
      {...attr}
    >
      {React.Children.map(children, (element, index) =>
          cloneElement(element, {
            gutter,
            key: index
          })
      )}
    </div>
  );
}
Row.defaultProps = {
  prefixCls: "one-row",
  gutter: 0,
  justify: 'start',
  align: 'top',
};
Row.propTypes = {
  justify: PropTypes.oneOf(['start','end','center','space-around','space-between']),
  align: PropTypes.oneOf(Object.keys(flexAlign)),
  gutter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prefixCls: PropTypes.string.isRequired,
};
export default React.memo(Row);

