import { joinClass } from '@lib/component-helpers'
import css from './Wrapper.css'

const Wrapper = ({
  children,
  size = 'medium',
  ...props
 }) => (
  <div className={joinClass(css.root, css[size])} {...props}>
    {children}
  </div>
)

export default Wrapper
