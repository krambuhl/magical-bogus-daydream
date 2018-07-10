import { NavList, ReadmeViewer } from '@styleguide'
import css from './Catalog.css'

export default ({ files }) => {
  const fileList =
    Object.keys(files).map(key => ({
      key,
      Component: files[key]
    }))

  return (
    <div className={css.root}>
      <NavList fileList={fileList} />
      <ReadmeViewer fileList={fileList} />
    </div>
  )
}
