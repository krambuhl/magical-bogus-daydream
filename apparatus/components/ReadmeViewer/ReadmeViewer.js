import { withRouter } from 'next/router'
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
        <Component />
      </div>
    )
  }
)

const ErrorPage = withRouter(
  ({
    router
  }) => (
    <div>
      <h1>Oh no!</h1>
      <p>This page is not found buddy.</p>
      <p><em>{router.asPath}</em></p>
    </div>
  )
)

