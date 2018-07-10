import Link from 'next/link'
import css from './MastHead.css'
import { NavList } from '@styleguide'

export default ({
  fileList = []
 }) => (
  <header className={css.root}>
    <Link href="?">
      <a className={css.homeLink}>
        Home
      </a>
    </Link>

    <div className={css.nav}>
      <NavList fileList={fileList} />
    </div>
  </header>
)
