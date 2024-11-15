import React from 'react'
import { Button, Avatar, Layout, Dropdown } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons'
import './index.css'
import { useDispatch } from 'react-redux';
import { collapseMenu } from '../../store/reducers/tab';

const { Header } = Layout;

const CommonHeader = ({collapsed}) => {
  const logout  = () => {
    // 登出
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
  // 创建dispath
  const dispatch = useDispatch()
  // 展开和收起状态
  const setCollapsed = () => {
    dispatch(collapseMenu())
  }
  const userImg = require("assets/images/头像.jpg")
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
        onClick={() =>{setCollapsed()}}
      />
      <Dropdown
        menu={{items}}
      >
        <Avatar size={36} src={<img src={ userImg } alt="用户头像"/>} />
      </Dropdown>
      
    </Header>
  )
}

export default CommonHeader


