import { joinClass } from '@lib/component-helpers'
import css from './Rhythm.css'

const Rhythm = ({
  children,
  size = 'medium',
  ...props
 }) => (
  <div className={joinClass(css.root, css[size])} {...props}>
    {children}
  </div>
)

export default Rhythm
