import React, { useState } from 'react'
import styled from 'styled-components'
import { Card } from '../components/common/Card'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Navigation = styled.nav`
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;

  h1 {
    font-size: 24px;
    margin: 0;
    color: ${props => props.theme.colors.text};
  }

  span {
    font-size: 12px;
    color: ${props => props.theme.colors.primary};
    background: ${props => `${props.theme.colors.primary}10`};
    padding: 2px 8px;
    border-radius: 4px;
  }
`

const Menu = styled.ul`
  display: flex;
  gap: 32px;

  li {
    color: ${props => props.theme.colors.textSecondary};
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    padding: 4px 0;

    &:hover {
      color: ${props => props.theme.colors.primary};
    }

    &.active {
      color: ${props => props.theme.colors.primary};
      font-weight: 500;

      &:after {
        content: '';
        position: absolute;
        bottom: -17px;
        left: 0;
        width: 100%;
        height: 2px;
        background: ${props => props.theme.colors.primary};
      }
    }
  }
`

// 定义 Tab 类型
type Tab = {
  id: string;
  name: string;
}

const tabs: Tab[] = [
  { id: 'zhongchuang', name: '中创网' },
  { id: 'fuxin', name: '福新论坛' },
  { id: 'zenggang', name: '曾港网' },
  { id: 'zixue', name: '自学点才网' }
]

// 模拟不同 tab 的数据
const tabData = {
  zhongchuang: [
    {
      id: 1,
      thumbnail: 'https://picsum.photos/400/300',
      title: '抖音养号变现，小白轻松上手，兼职赚钱',
      description: '项目介绍：公司提供抖音视频素材，你按照要求发送即可...',
      author: {
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
        name: '87创业网'
      },
      stats: {
        views: 146,
        likes: 78,
        comments: 12
      }
    },
    {
      id: 2,
      thumbnail: 'https://picsum.photos/400/301',
      title: '快手无人直播实操流程：从选品到素材制作',
      description: '课程目录：1快手无人直播室，开播直播续流程...',
      author: {
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
        name: '87创业网'
      },
      stats: {
        views: 96,
        likes: 58,
        comments: 8
      }
    }
  ],
  fuxin: [
    {
      id: 3,
      thumbnail: 'https://picsum.photos/400/302',
      title: 'AI玩转转大模型，普通人也能高效工作生活',
      description: '课程简介：我们是中国最早出最成功的增长黑客模型...',
      author: {
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
        name: '87创业网'
      },
      stats: {
        views: 124,
        likes: 74,
        comments: 15
      }
    }
  ],
  zenggang: [
    {
      id: 4,
      thumbnail: 'https://picsum.photos/400/303',
      title: '流量引擎实战班，渠道裂变绝密点，剪辑技巧',
      description: '课程目录：19.超级网赚的精髓总结-六字学之三字学...',
      author: {
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
        name: '87创业网'
      },
      stats: {
        views: 116,
        likes: 68,
        comments: 9
      }
    }
  ],
  zixue: [
    {
      id: 5,
      thumbnail: 'https://picsum.photos/400/304',
      title: '自学编程实战课程：从零开始到项目上线',
      description: '完整的编程学习路线，包含前端、后端、数据库...',
      author: {
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
        name: '87创业网'
      },
      stats: {
        views: 135,
        likes: 82,
        comments: 16
      }
    }
  ]
}

export const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('zhongchuang')

  return (
    <div>
      <Navigation>
        <Title>
          <h1>精品创业项目</h1>
          <span>365x24h自动更新</span>
        </Title>
        <Menu>
          {tabs.map(tab => (
            <li
              key={tab.id}
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </li>
          ))}
        </Menu>
      </Navigation>
      <Grid>
        {tabData[activeTab as keyof typeof tabData].map(item => (
          <Card key={item.id} {...item} />
        ))}
      </Grid>
    </div>
  )
} 