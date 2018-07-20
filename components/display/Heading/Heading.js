import { joinClass } from '@lib/component-helpers'
import css from './Heading.css'

const Heading = ({
  level: Tag = 'h3',
  children,
  ...props
 }) => (
  <Tag className={joinClass(css.root, css[Tag])} {...props}>
    {children}
  </Tag>
)

export default Heading
