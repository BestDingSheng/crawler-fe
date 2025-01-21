import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Card } from '../components/common/Card'
import { useCourseStore } from '../store/courseStore'

const HomeWrapper = styled.div`
  background: ${props => props.theme.colors.background};
  min-height: 100%;
  padding: 24px 0;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Navigation = styled.nav`
  margin-bottom: 32px;
  background: ${props => props.theme.colors.cardBackground};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;

  h1 {
    font-size: 24px;
    margin: 0;
    color: ${props => props.theme.colors.text};
    font-weight: 600;
  }

  span {
    font-size: 12px;
    color: ${props => props.theme.colors.primary};
    background: ${props => `${props.theme.colors.primary}15`};
    padding: 4px 12px;
    border-radius: 20px;
    font-weight: 500;
  }
`

const Menu = styled.ul`
  display: flex;
  gap: 32px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding-bottom: 16px;

  li {
    color: ${props => props.theme.colors.textSecondary};
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    padding: 4px 0;
    font-size: 15px;

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

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: ${props => props.theme.colors.textSecondary};
`

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  text-align: center;
  padding: 20px;
  background: ${props => props.theme.colors.cardBackground};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`

// 定义 Tab 类型
type Tab = {
  id: string;
  name: string;
}

const tabs: Tab[] = [
  { id: '中创网', name: '中创网' },
  { id: '福源论坛', name: '福源论坛' },
  { id: '冒泡网', name: '冒泡网' },
  { id: '自学成才网', name: '自学成才网' }
]

export const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('中创网')
  const { courses, loading, error, fetchCourses } = useCourseStore()

  useEffect(() => {
    fetchCourses({ type: activeTab })
  }, [activeTab, fetchCourses])

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  return (
    <HomeWrapper>
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
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.name}
            </li>
          ))}
        </Menu>
      </Navigation>

      {loading ? (
        <LoadingWrapper>加载中...</LoadingWrapper>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <Grid>
          {courses.map(course => (
            <Card
              key={course.pageId}
              pageId={course.pageId}
              thumbnail={course.imgUrl}
              title={course.title}
              description={course.desc}
              author={{
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${course.pageId}`,
                name: course.type
              }}
              stats={{
                views: 100,
                likes: 50,
                comments: 10
              }}
            />
          ))}
        </Grid>
      )}
    </HomeWrapper>
  )
} 