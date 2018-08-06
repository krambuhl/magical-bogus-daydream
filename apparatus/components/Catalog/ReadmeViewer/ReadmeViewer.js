import { withRouter } from 'next/router'
import { NavList } from '@styleguide'
import css from './ReadmeViewer.css'

export default withRouter(
  ({
    fileList = [],
    ErrorComponent = ErrorPage,
    router
  }) => {
    const { selected } = router.query
    const selectedFile = fileList.find(({ key }) => selected === key)
    const Component = selectedFile ? selectedFile.Component : ErrorComponent

    return (
      <div className={css.root}>
        <Component fileList={fileList} />
      </div>
    )
  }
)

const ErrorPage = ({ fileList }) => (
  <div>
    <h1>Table of Contents</h1>
    <NavList fileList={fileList} />
  </div>
)

