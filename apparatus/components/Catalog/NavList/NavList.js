import { capitalize } from 'capitalization'
import Link from 'next/link'
import css from './NavList.css'

export default ({
  fileList,
  onLinkClick = () => {}
}) => (
  <ul className={css.list}>
    {
      fileList.map(({ key }) => (
        <li className={css.item} key={key} >
          <Link href={`?selected=${key}`}>
            <a
              className={css.link}
              onClick={onLinkClick}
            >
              { capitalize(key).split('/').join(' / ') }
            </a>
          </Link>
        </li>
      ))
    }
  </ul>
)
