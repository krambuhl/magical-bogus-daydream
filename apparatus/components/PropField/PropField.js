import { joinClass } from '@lib/component-helpers'
import css from './PropField.css'

export default class PropField extends React.Component {
  render () {
    const {
      onChange = () => {},
      propName,
      type, // can be text, select, switch
      options // can be ['array option'], [true, false], 'string'
    } = this.props

    const classStack = joinClass(
      css.root,
      type === 'select' && css.rootSelect,
      type === 'checkbox' && css.rootCheckbox,
      type === 'text' && css.rootText
    )

    return (
      <div className={classStack}>
        <label htmlFor={`${propName}-id`} className={css.label}>{propName}</label>

        {
          type === 'select' &&
          <div className={joinClass(css.input, css.select)}>
            <select
              className={css.selectInput}
              id={`${propName}-id`}
              ref={`${propName}-select`}
              onChange={
                () => onChange({
                  propName,
                  value: this.refs[`${propName}-select`].value
                })
              }
            >
              { options.map(option => (
                <option key={option.value} value={option.value}>{option.text}</option>
              )) }
            </select>
            <div className={css.selectIcon} />
          </div>
        }

        {
          type === 'checkbox' &&
          <div className={joinClass(css.input, css.checkbox)}>
            <input
              type="checkbox"
              id={`${propName}-id`}
              ref={`${propName}-select`}
              className={css.checkboxInput}
              defaultChecked={options[0]}
              onChange={
                () => onChange({
                  propName,
                  value: this.refs[`${propName}-select`].checked
                })
              }
            />
            <label htmlFor={`${propName}-id`} className={css.checkboxIndicator} />
          </div>
        }

        {
          type === 'text' &&
          <div className={joinClass(css.input, css.text)}>
            <input
              type="text"
              id={`${propName}-id`}
              ref={`${propName}-select`}
              className={css.textInput}
              defaultValue={options}
              onChange={
                () => onChange({
                  propName,
                  value: this.refs[`${propName}-select`].value
                })
              }
            />
          </div>
        }

      </div>
    )
  }
}
