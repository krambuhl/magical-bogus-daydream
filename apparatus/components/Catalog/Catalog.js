import Head from 'next/head'
import { MastHead, ReadmeViewer } from '@styleguide'
import css from './Catalog.css'

export default ({ files }) => {
  const fileList =
    Object.keys(files).map(key => ({
      key,
      Component: files[key]
    }))

  return (
    <div className={css.root}>
      <Head>
        <title>Museum</title>
      </Head>
      <MastHead fileList={fileList} />
      <ReadmeViewer fileList={fileList} />
    </div>
  )
}
