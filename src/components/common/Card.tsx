import React from 'react'
import styled from 'styled-components'
import { Avatar } from 'antd'
import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons'

interface CardProps {
  thumbnail: string
  title: string
  description: string
  author: {
    avatar: string
    name: string
  }
  stats: {
    views: number
    likes: number
    comments: number
  }
}

const CardWrapper = styled.div`
  background: ${props => props.theme.colors.cardBackground};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`

const Thumbnail = styled.div<{ src: string }>`
  width: 100%;
  height: 160px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
`

const Content = styled.div`
  padding: 12px;
`

const Title = styled.h3`
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  height: 44px;
`

const Description = styled.p`
  margin: 0 0 12px;
  color: ${props => props.theme.colors.textSecondary};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 13px;
  line-height: 1.5;
  height: 40px;
`

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid ${props => props.theme.colors.border};
`

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .ant-avatar {
    width: 24px;
    height: 24px;
  }

  span {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 13px;
  }
`

const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 13px;

  span {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`

export const Card: React.FC<CardProps> = ({ thumbnail, title, description, author, stats }) => {
  return (
    <CardWrapper>
      <Thumbnail src={thumbnail} />
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Meta>
          <Author>
            <Avatar src={author.avatar} />
            <span>{author.name}</span>
          </Author>
          <Stats>
            <span><EyeOutlined /> {stats.views}</span>
            <span><LikeOutlined /> {stats.likes}</span>
            <span><MessageOutlined /> {stats.comments}</span>
          </Stats>
        </Meta>
      </Content>
    </CardWrapper>
  )
} 