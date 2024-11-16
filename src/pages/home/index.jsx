import { Col, Row, Card, Table } from 'antd'
import * as Icon from "@ant-design/icons";
import React, { useEffect, useState } from 'react'
import './home.css'
import { getData } from "api"
import MyEcharts from "Yeecharts"

// table列的数据
const columns = [
	{
		title:'课程',
		dataIndex:'name'
	},
	{
		title:'今日购买',
		dataIndex:'todayBuy'
	},
	{
		title:'本月购买',
		dataIndex:'monthBuy'
	},
	{
		title:'总购买',
		dataIndex:'totalBuy'
	}
]

// 订单数据
const countData = [
  {
    "name": "今日支付订单",
    "value": 1234,
    "icon": "CheckCircleOutlined",
    "color": "#2ec7c9"
  },
  {
    "name": "今日收藏订单",
    "value": 3421,
    "icon": "ClockCircleOutlined",
    "color": "#ffb980"
  },
  {
    "name": "今日未支付订单",
    "value": 1234,
    "icon": "CloseCircleOutlined",
    "color": "#5ab1ef"
  },
  {
    "name": "本月支付订单",
    "value": 1234,
    "icon": "CheckCircleOutlined",
    "color": "#2ec7c9"
  },
  {
    "name": "本月收藏订单",
    "value": 3421,
    "icon": "ClockCircleOutlined",
    "color": "#ffb980"
  },
  {
    "name": "本月未支付订单",
    "value": 1234,
    "icon": "CloseCircleOutlined",
    "color": "#5ab1ef"
  }
]
const iconToElement = (name) => React.createElement(Icon[name])

const Home = () => {
  const userImg = require("assets/images/头像.jpg")
  const [tableData, setTableData] = useState([])
  const [echartData, setEchartData] = useState({})
  useEffect(() => {
    getData().then(({ data }) => {
      const { tableData, orderData, userData, videoData } = data.data
      setTableData(tableData)
      const order = orderData
      const xData = order.date
      const keyArray =  Object.keys(order.data[0])
      const series = []
      keyArray.forEach(key => {
        series.push({
          name: key,
          data: order.data.map(item => item[key]),
          type: 'line'
        })
      })
      setEchartData({
        ...echartData,
        order: {
          xData,
          series
        },
        user: {
          xData: userData.map(item => item.date),
          series: [
            {
              name: '新增用户',
              data: userData.map(item => item.new),
              type: 'bar'
            },
            {
                name: '活跃用户',
                data: userData.map(item => item.active),
                type: 'bar'
            }
          ]
        },
        video: {
          series: [
            {
              data: videoData,
              type: 'pie'
            }
          ]
        }
      })
    })
  }, [])



	return(
		<Row className='home'>
			<Col span={8}>
				<Card hoverable >
					<div className='user'>
						<img src={userImg} alt="用户头像" />
						<div className='userinfo'>
							<p className='name'>Admin</p>
							<p className='accsee'>超级管理员</p>
						</div>
					</div>
					<div className='login-info'>
						<p>上次登陆时间：<span>2024-11-1</span></p>
						<p>上次登陆地点：<span>武汉</span></p>
					</div>
				</Card>
				<Card hoverable >
					<Table rowKey={"name"} columns={columns} dataSource={tableData} pagination = {false}/>
				</Card>
			</Col>
			<Col span={16}>
				<div className="num">
          {
            countData.map((item, index) => {
              return (
                <Card key={index}>
                    <div className="icon-box" style={{background: item.color}}>
                      {iconToElement(item.icon)}
                    </div>
                    <div className="detail">
                        <p className="num">￥{item.value}</p>
                        <p className="txt">{item.name}</p>
                    </div>
                </Card>
              )
            })
          }
        </div>
        { echartData.order && <MyEcharts chartData={echartData.order} style={{ height: '280px' }} /> }
        <div className="graph">
          { echartData.user && <MyEcharts chartData={echartData.user} style={{ width: '50%', height: '240px' }} /> }
          { echartData.video && <MyEcharts chartData={echartData.video} isAxisChart={false} style={{ width: '50%', height: '260px' }} /> }
        </div>
			</Col>
		</Row>
	)
}

export default Home