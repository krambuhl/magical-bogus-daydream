import { requireAll } from '@lib/file-helpers'

// requires and returns all modules that match
export default requireAll(require.context('./', true, /README(.mdx|.jsx)$/))
