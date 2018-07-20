import { joinClass } from '@lib/component-helpers'
import css from './Padding.css'

const Padding = ({
  children,
  size = 'medium',
  ...props
 }) => (
  <div className={joinClass(css.root, css[size])} {...props}>
    {children}
  </div>
)

export default Padding
