import Link from 'next/link'
import css from './MastHead.css'

export default () =>
  <header className={css.root}>
    <div className={css.wrapper}>
      <h1 className={css.name}>Museum</h1>
      <Link href="?">
        <a className={css.homeLink}>Table of Contents</a>
      </Link>
    </div>
  </header>
