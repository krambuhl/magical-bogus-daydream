import { capitalize } from 'capitalization'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { joinClass } from '@lib/component-helpers'
import css from './NavList.css'

class NavList extends React.Component {
  state = {
    isExpanded: false
  }

  toggle () {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  render () {
    const { fileList } = this.props
    const { isExpanded } = this.state

    return (
      <nav className={joinClass(css.root, isExpanded && css.expanded)}>
        <button
          className={css.toggle}
          onClick={ev => this.toggle(ev)}
        >
          Menu
        </button>

        <ul className={css.list}>
          {
            fileList.map(({ key }) => (
              <li className={css.item} key={key} >
                <Link href={`/styleguide?selected=${key}`}>
                  <a className={css.link}>
                    { capitalize(key).split('/').join(' / ') }
                  </a>
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
    )
  }
}

export default withRouter(NavList)
