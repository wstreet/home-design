import React from 'react';
import { HomeOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons'
import './index.css'

class LeftMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menus: [
        {
          icon: <HomeOutlined />,
          name: '画户型',
          key: 'home'
        },
        {
          icon: <SettingOutlined />,
          name: '做定制',
          key: 'setting'
        },
        {
          icon: <AppstoreOutlined />,
          name: '样板间',
          key: 'models'
        },
      ],
      current: 'home'
    }
  }
  
  componentDidMount() {
   
  }

  onSelect = (key) => {
    return () => {
      this.setState({
        current: key
      })
    }
  }


  render() {
    const {current, menus} = this.state
    return (
      <ul className="left-menu-container" >
        {
          menus.map(menu => {
            return (
              <li
                key={menu.key} 
                className={`menu-item${menu.key === current? ' menu-item-active':''}`}
                onClick={this.onSelect(menu.key)}
              >
                <div className="menu-icon">{menu.icon}</div>
                <div className="menu-name">{menu.name}</div>
              </li>
            )
          })
        }
      </ul>
    )
  }
}

export default LeftMenu;