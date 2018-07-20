import { joinClass } from '@lib/component-helpers'
import css from './Button.css'

const Button = ({
  level: Tag = 'button',
  type = 'primary',
  disabled = false,
  children,
  className,
  ...props
 }) => (
  <Tag
    className={joinClass(css.root, css[type], disabled && css.isDisabled, className)}
    disabled={disabled}
    {...props}
  >
    {children}
  </Tag>
)

export default Button
