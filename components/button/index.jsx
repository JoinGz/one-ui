import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { LoadingIcon } from '../icon';

const sizes = {
  small: 'small',
  default: 'default',
  large: 'large'
};

const types = {
  primary: 'primary',
  default: 'default',
  warning: 'warning',
  success: 'success',
  error: 'error',
  info: 'info',
  disabled: 'disabled'
};

export default class Button extends PureComponent {
  static defaultProps = {
    prefixCls: 'one-button',
    href: '',
    type: types.default,
    htmlType: 'button',
    size: sizes.default,
    loading: false,
    block: false,
    disabled: false,
    hollow: false,
    dashed: false,
    circle: false,
    plain: false,
    underline: false,
  };
  static propTypes = {
    prefixCls: PropTypes.string.isRequired,
    block: PropTypes.bool,
    hollow: PropTypes.bool,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    dashed: PropTypes.bool,
    circle: PropTypes.bool,
    plain: PropTypes.bool,
    htmlType: PropTypes.string,
    href: PropTypes.string,
    type: PropTypes.oneOf(Object.values(types)),
    size: PropTypes.oneOf(Object.values(sizes)),
    underline: PropTypes.bool,
  };

  render() {
    const {
      loading,
      disabled,
      block,
      prefixCls,
      children,
      type,
      className,
      htmlType,
      onClick,
      hollow,
      size,
      href,
      dashed,
      circle,
      plain,
      underline,
      ...attr
    } = this.props;
    const isDisabled = disabled || loading ? { disabled: true } : { onClick };
    const baseProps = {
      ...attr,
      ...isDisabled,
      type: htmlType,
      className: cls(prefixCls, className, {
        [`${prefixCls}-${type}`]: type,
        [`${prefixCls}-default`]: !disabled && type === types.default,
        [`${prefixCls}-normal`]: type === types.default,
        [`${prefixCls}-loading`]: loading,
        [`${prefixCls}-block`]: block,
        [`${prefixCls}-hollow`]: hollow,
        [`${prefixCls}-dashed`]: dashed,
        [`${prefixCls}-circle`]: circle,
        [`${prefixCls}-plain`]: plain,
        [`${prefixCls}-size-${size}`]: size !== sizes.default,
        [`${prefixCls}-disabled`]: disabled,

      })
    };
    const content = (
      <>
        {loading && !circle && <LoadingIcon className="one-loading" />}
        <span>{children}</span>
      </>
    );
    if (href) {
      return (
        <a
          href={disabled ? 'javascript:;' : href}
          disabled={disabled}
          className={cls(`${prefixCls}-link`, className, {
            [`${prefixCls}-link-disabled`]: disabled,
            [`${prefixCls}-link-underline`]: underline,
          })}
          {...attr}
        >
          {content}
        </a>
      );
    }
    return <button {...baseProps}>{content}</button>;
  }
}
