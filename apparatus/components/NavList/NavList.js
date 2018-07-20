import { capitalize } from 'capitalization'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { joinClass } from '@lib/component-helpers'
import css from './NavList.css'

class NavList extends React.Component {
  state = {
    isExpanded: false
  }

  toggle (state) {
    this.setState({
      isExpanded: state !== undefined ? state : !this.state.isExpanded
    })
  }

  render () {
    const { fileList } = this.props
    const { isExpanded } = this.state

    return (
      <nav ref={this.$el} className={joinClass(css.root, isExpanded && css.expanded)}>
        <button
          className={css.toggle}
          onClick={() => this.toggle()}
        >
          Menu
        </button>

        <div className={css.content}>
          <button
            className={css.close}
            onClick={() => this.toggle(false)}
          >
            Close
          </button>

          <ul className={css.list}>
            {
              fileList.map(({ key }) => (
                <li className={css.item} key={key} >
                  <Link href={`?selected=${key}`}>
                    <a
                      className={css.link}
                      onClick={() => this.toggle(false)}
                    >
                      { capitalize(key).split('/').join(' / ') }
                    </a>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(NavList)
