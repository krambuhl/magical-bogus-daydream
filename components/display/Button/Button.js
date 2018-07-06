import { joinClass } from '@lib/component-helpers'
import css from './Button.css'

export default ({
  level: Tag = 'button',
  type = 'primary',
  children
 }) => (
  <Tag className={joinClass(css.root, css[type])}>
    {children}
  </Tag>
)
