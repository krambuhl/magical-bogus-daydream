import { joinClass } from '@lib/component-helpers'
import css from './Wrapper.css'

export default ({
  children,
  size = 'medium'
 }) => (
  <div className={joinClass(css.root, css[size])}>
    {children}
  </div>
)
