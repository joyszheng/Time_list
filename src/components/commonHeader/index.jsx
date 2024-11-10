import React from 'react'
import { Button, Avatar, Layout, Dropdown } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons'
import './index.css'

const { Header } = Layout;

const CommonHeader = () => {
  const logout  = () => {

  }
  
  
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          个人中心
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a onClick={() => logout} target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          退出
        </a>
      )
    }
  ];
  
  return (
    <Header className='header-container'>
      <Button
        type = "text"
        icon={ <MenuFoldOutlined/> }
        style = {{
          fontSize: '16px',
          width: 64,
          height: 32,
          backgroundColor: '#fff'
        }}
      />
      <Dropdown
        menu={{items}}
      >
        <Avatar size={36} src={<img src={require("../../assets/images/头像.jpg")}/>} />
      </Dropdown>
      
    </Header>
  )
}

export default CommonHeader


