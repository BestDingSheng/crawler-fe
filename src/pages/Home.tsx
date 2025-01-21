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

const Header = styled.div`
  margin-bottom: 32px;
`

const TitleSection = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`

const MainTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0;
`

const UpdateTag = styled.span`
  font-size: 12px;
  color: ${props => props.theme.colors.primary};
  background: ${props => `${props.theme.colors.primary}15`};
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: normal;
`

const Navigation = styled.nav`
  display: flex;
  gap: 24px;
`

const NavItem = styled.div<{ active?: boolean }>`
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? '#fff' : props.theme.colors.text};
  font-weight: ${props => props.active ? '500' : 'normal'};

  &:hover {
    background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.cardBackground};
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
      <Header>
        <TitleSection>
          <MainTitle>精品创业项目</MainTitle>
          <UpdateTag>365x24h自动更新</UpdateTag>
        </TitleSection>
        <Navigation>
          {tabs.map(tab => (
            <NavItem
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.name}
            </NavItem>
          ))}
        </Navigation>
      </Header>

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