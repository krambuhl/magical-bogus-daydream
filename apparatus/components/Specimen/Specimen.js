import ReactDomServer from 'react-dom/server'
import ReactSvg from 'react-svg'
import renderComponentString from 'react-element-to-jsx-string'
import pretty from 'pretty'
import Highlight from 'react-highlight'
import { joinClass } from '@lib/component-helpers'
import { PropField } from '@styleguide'
import css from './Specimen.css'

const getDefaultOptions = variableList =>
  variableList.reduce((all, { type, propName, options }) => {
    if (type === 'select') {
      all[propName] = options[0].value
    } else if (type === 'checkbox') {
      all[propName] = options[0]
    } else {
      all[propName] = options
    }

    return all
  }, {})

const processValue = value =>
  typeof value !== 'object'
    ? { value, text: value.toString() }
    : value

const processOptions = obj =>
  Object.keys(obj).reduce((all, key) => {
    const values = obj[key]
    let type = 'text'
    let options = values

    if (Array.isArray(values)) {
      type = 'select'
      options = values.map(processValue)
    }

    if (values === Boolean || typeof values === 'boolean') {
      type = 'checkbox'
      options =
        typeof values === 'boolean'
          ? [values, !values]
          : [true, false]
    }

    all.push({
      propName: key,
      type,
      options
    })

    return all
  }, [])

const { DEMO, REACT, HTML } = {
  DEMO: 'DEMO',
  REACT: 'REACT',
  HTML: 'HTML'
}

export default class Specimen extends React.Component {
  constructor(props) {
    super(props)
    const variableList = props.options ? processOptions(props.options) : []

    this.state = {
      isFullScreen: false,
      activeView: DEMO,
      variableList,
      selectedVariables: Object.assign(getDefaultOptions(variableList), props.defaultOptions)
    }
  }

  updateSelection (propName, value) {
    this.setState({
      selectedVariables: Object.assign({}, this.state.selectedVariables, {
        [propName]: value
      })
    })
  }

  toggleFullScreen (state) {
    this.setState({
      isFullScreen: state !== undefined ? state : !this.state.isFullScreen
    })
  }

  updateActiveView (activeView) {
    this.setState({ activeView })
  }

  renderActiveView () {
    const { activeView, selectedVariables } = this.state
    const { options, children } = this.props
    const componentRender = options ? children(selectedVariables) : children

    return (
      <React.Fragment>
        { activeView === DEMO &&
          <div className={css.render}>
            {componentRender}
          </div>
        }

        { activeView === REACT &&
          <div className={css.code}>
            <Highlight className="language-xml">
              {
                renderComponentString(
                  componentRender.length > 0
                    ? <React.Fragment>{componentRender}</React.Fragment>
                    : componentRender
                )
              }
            </Highlight>
          </div>
        }

        { activeView === HTML &&
          <div className={css.code}>
            <Highlight className="language-html">
              {
                pretty(
                  ReactDomServer.renderToStaticMarkup(componentRender),
                  { ocd: true }
                )
              }
            </Highlight>
          </div>
        }
      </React.Fragment>
    )
  }

  renderActiveViewButtons () {
    const { activeView } = this.state

    return (
      <div>
        <button
          className={joinClass(css.button, activeView === DEMO && css.isActive)}
          onClick={() => this.updateActiveView(DEMO)}
        >
          Demo
        </button>
        <button
          className={joinClass(css.button, activeView === REACT && css.isActive)}
          onClick={() => this.updateActiveView(REACT)}
        >
          React
        </button>
        <button
          className={joinClass(css.button, activeView === HTML  && css.isActive)}
          onClick={() => this.updateActiveView(HTML)}
        >
          HTML
        </button>
      </div>
    )
  }

  renderActionBar () {
    const { isFullScreen } = this.state

    return (
      <div className={css.actions}>
        {this.renderActiveViewButtons()}

        <div>
          <button
            className={css.button}
            onClick={() => this.toggleFullScreen()}
          >
            { !isFullScreen &&
              <React.Fragment>
                <ReactSvg className={css.expandIcon} path="/static/svg/fullscreen-expand.svg" />
                <span>Fullscreen</span>
              </React.Fragment>
            }
            { isFullScreen &&
              <React.Fragment>
                <ReactSvg className={css.collapseIcon} path="/static/svg/fullscreen-collapse.svg" />
                <span>Close</span>
              </React.Fragment>
            }
          </button>
        </div>
      </div>
    )
  }

  renderPropEditor () {
    const { variableList } = this.state

    if (variableList.length > 0) {
      return (
        <nav className={css.props}>
          { variableList.map(({ propName, options, type }) => (
            <PropField
              key={propName}
              propName={propName}
              type={type}
              options={options}
              onChange={
                ({ propName, value }) => this.updateSelection(propName, value)
              }
            />
          )) }
        </nav>
      )
    }
  }

  render () {
    const { className, noPadding } = this.props
    const { isFullScreen } = this.state

    const classStack = joinClass(
      css.root,
      isFullScreen && css.isFullScreen,
      noPadding && css.noPadding,
      className
    )

    return (
      <div className={classStack}>
        {this.renderActionBar()}
        {this.renderPropEditor()}
        {this.renderActiveView()}
      </div>
    )
  }
}
