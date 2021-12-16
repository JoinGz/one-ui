import {ReactElement} from 'react'

export interface messageProps {
  prefixCls?: string,
  message?: string,
  type?: string,
  iconClass?: string,
  duration?: number,
  showClose?: boolean,
  onClose?: () => void,
  offset?: number,
  style?: React.CSSProperties;
  children?: React.ReactNode;
  dom?: HTMLDivElement,
  ref?: any,
  className?: string,
  mkey: number
}

interface defaultProps {
  prefixCls: string,
  duration: number,
  key?: number,
}

export interface msgFn {
  (props: messageProps, context?: any): ReactElement | null;
  isRender: boolean,
  defaultProps: defaultProps
  instance: {
    [key: string]: HTMLDivElement
  },
  key:number,
  openMsg(defaultProps: defaultProps): void,
  
}