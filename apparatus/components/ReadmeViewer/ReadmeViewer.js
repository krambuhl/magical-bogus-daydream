import { withRouter } from 'next/router'
import css from './ReadmeViewer.css'

export default withRouter(
  ({
    fileList = [],
    router
  }) => {
    const { selected } = router.query

    return (
      <div className={css.root}>
        {
          fileList.map(({ key, Component }) => (
            <div className={css.readme} id={key} key={key} aria-hidden={selected !== key}>
              <Component />
            </div>
          ))
        }
      </div>
    )
  }
)
