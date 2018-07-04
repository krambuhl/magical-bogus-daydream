import { joinClass } from '@lib/component-helpers'
import css from './Heading.css'

export default ({
  level: Tag = 'h3',
  children
 }) => (
  <Tag className={joinClass(css.root, css[Tag])}>
    {children}
  </Tag>
)
