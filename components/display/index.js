const { requireAll } = require('@lib/file-helpers')

// requires and returns all modules that match
module.exports = requireAll(require.context('./', true, /(\w+)\/\1\.(js|mdx)$/))
