import React from 'react';
import { Layout, Menu, Popover, Button } from 'antd';
import Edit2D from './Edit2D'
import Left from './Left'
import './App.css';

const { Header } = Layout;


const App = () => {
  return (
    <Layout>
      <Header className="header">
        <h1 className="logo" >设计家</h1>
        <Menu mode="horizontal" defaultSelectedKeys={['2']} className="tool_bar">
          {
            [1, 2, 3].map(i => <Menu.Item className="tool_item" key={i}>{`nav ${i}`}</Menu.Item>)
          }
        </Menu>
      </Header>
      <Edit2D />
      <Left />
    </Layout>
  )
};

export default App;