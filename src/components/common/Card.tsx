import React from 'react'
import styled from 'styled-components'
import { Avatar } from 'antd'
import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { formatTimeAgo } from '../../utils/dateUtils'

interface CardProps {
  pageId: number
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
  publishTime: string
}

const CardWrapper = styled.div`
  background: ${props => props.theme.colors.cardBackground};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 1px solid ${props => props.theme.colors.border};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
    border-color: ${props => props.theme.colors.primary}20;
  }
`

const Thumbnail = styled.div<{ src: string }>`
  width: 100%;
  height: 160px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
  }
`

const Content = styled.div`
  padding: 16px;
  background: ${props => props.theme.colors.cardBackground};
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

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`

const Description = styled.p`
  margin: 0 0 16px;
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
    border: 2px solid ${props => props.theme.colors.primary}20;
  }

  .author-info {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${props => props.theme.colors.textSecondary};
    font-size: 13px;

    .dot {
      color: ${props => props.theme.colors.border};
    }

    .time {
      color: ${props => props.theme.colors.textSecondary};
    }
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
    transition: color 0.3s;

    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`

export const Card: React.FC<CardProps> = ({ pageId, thumbnail, title, description, author, stats, publishTime }) => {
  const navigate = useNavigate()

  console.log('Card publishTime:', publishTime);

  const handleClick = () => {
    navigate(`/course/${pageId}`)
  }

  return (
    <CardWrapper onClick={handleClick}>
      <Thumbnail src={thumbnail} />
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Meta>
          <Author>
            <Avatar src={author.avatar} />
            <div className="author-info">
              <span>{author.name}</span>
              <span className="dot">•</span>
              <span className="time">{formatTimeAgo(publishTime)}</span>
            </div>
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