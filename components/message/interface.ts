export interface messageProps {
  prefixCls?: string,
  message: string,
  type?: 'success' | 'warning' | 'info' | 'error',
  iconClass?: string,
  duration?: number,
  showClose?: boolean,
  onClose?: () => void,
  offset?: number,
  style?: React.CSSProperties;
  children?: React.ReactNode;
  dom?: HTMLDivElement,
  ref?: any,
  ['className']?: any,
}