export const requireAll = (context) =>
  context.keys().reduce((all, key) => {
    const module = context(key)
    const name = key.substr(2, key.lastIndexOf('/') - 2)
    all[name] = module.default || module
    return all
  }, { })
