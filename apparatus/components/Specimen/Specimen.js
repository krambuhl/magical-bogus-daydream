import { joinClass } from '@lib/component-helpers'
import css from './Specimen.css'

const getDefaultOptions = optionList =>
  optionList.reduce((all, { propName, options }) => {
    all[propName] = options[0].value
    return all
  }, {})


const processOptions = obj =>
  Object.keys(obj).reduce((all, key) => {
    const values = obj[key]
    all.push({
      propName: key,
      options: values.map(value => (
        typeof value === 'string'
          ? { value, text: value }
          : value
      ))
    })
    return all
  }, [])

export default class Specimen extends React.Component {
  constructor(props) {
    super(props)
    const optionList = props.options ? processOptions(props.options) : []
    this.state = {
      isFullScreen: false,
      optionList,
      selectedOptions: Object.assign(getDefaultOptions(optionList), props.defaultOptions)
    }
  }

  updateSelection (propName, value) {
    this.setState({
      selectedOptions: Object.assign({}, this.state.selectedOptions, {
        [propName]: value
      })
    })
  }

  toggleFullScreen (state) {
    this.setState({
      isFullScreen: state !== undefined ? state : !this.state.isFullScreen
    })
  }

  render () {
    const { options, className, children } = this.props
    const { optionList, isFullScreen } = this.state
    const childrenRender = options ? children(this.state.selectedOptions) : children

    return (
      <div className={joinClass(css.root, isFullScreen && css.fullScreen, className)}>
        <nav className={css.nav}>
          { optionList.map(({ propName, options }) => (
            <div className={css.field} key={propName}>
              <label className={css.label}>{propName}</label>
              <div className={css.selectWrapper}>
                <select
                  className={css.select}
                  ref={`${propName}-select`}
                  onChange={
                    () => this.updateSelection(propName, this.refs[`${propName}-select`].value)
                  }
                >
                  { options.map(option => (
                    <option key={option.value} value={option.value}>{option.text}</option>
                  )) }
                </select>
              </div>
            </div>
          )) }
        </nav>

        <div className={css.render}>
          {childrenRender}
        </div>

        <div className={css.actions}>
          <button
          className={css.button}
          onClick={() => this.toggleFullScreen()}
          >
          Full Screen
          </button>
        </div>
      </div>
    )
  }
}
