const { requireAll } = require('@lib/file-helpers')

// requires and returns all modules that match
const displayModules = requireAll(require.context('./display', true, /README(.mdx|.jsx)$/))
const containerModules = requireAll(require.context('./container', true, /README(.mdx|.jsx)$/))

const iterateObject = obj =>
  Object.keys(obj).map(key => ({
    key,
    Component: obj[key]
  }))

export default () => (
  <div>
    <h1>Display Components</h1>

    <nav>
      <ul>
        { iterateObject(displayModules).map(({ key }) => (
            <li key={key} >
              <a href={`#${key}`}>{key}</a>
            </li>
          )) }
      </ul>
    </nav>

    { iterateObject(displayModules).map(({ key, Component }) => (
      <div className="component" id={key} key={key}>
        <Component />
      </div>
    )) }

    <h1>Container Components</h1>

    <nav>
      <ul>
        { iterateObject(containerModules).map(({ key }) => (
            <li key={key} >
              <a href={`#${key}`}>{key}</a>
            </li>
          )) }
      </ul>
    </nav>

    { iterateObject(containerModules).map(({ key, Component }) => (
      <div className="component" id={key} key={key}>
        <Component />
      </div>
    )) }
  </div>
)
