import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Spin, Alert } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { useCourseDetailStore } from '../store/courseDetailStore'

const DetailWrapper = styled.div`
  background: ${props => props.theme.colors.cardBackground};
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 24px;
`

const Image = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 24px;
`

const Description = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
  line-height: 1.8;
  margin-bottom: 24px;
  white-space: pre-wrap;
`

const DetailInfo = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: 14px;
  line-height: 1.8;
  margin-bottom: 24px;
  white-space: pre-wrap;
`

const DownloadSection = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 24px;
  text-align: center;
`

const LoginMessage = styled.div`
  margin-bottom: 16px;
  color: ${props => props.theme.colors.textSecondary};
`

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`

export const CourseDetail: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>()
  const navigate = useNavigate()
  const { detail, loading, error, fetchDetail } = useCourseDetailStore()

  useEffect(() => {
    if (pageId) {
      fetchDetail(parseInt(pageId, 10))
    }
  }, [pageId, fetchDetail])

  const handleLogin = () => {
    // TODO: 实现登录跳转
    navigate('/login')
  }

  if (loading) {
    return (
      <LoadingWrapper>
        <Spin size="large" />
      </LoadingWrapper>
    )
  }

  if (error) {
    return <Alert type="error" message={error} />
  }

  if (!detail) {
    return <Alert type="error" message="课程不存在" />
  }

  return (
    <DetailWrapper>
      <Title>{detail.title}</Title>
      <Image src={detail.imgUrl} alt={detail.title} />
      <DetailInfo>
        <div dangerouslySetInnerHTML={{ __html: detail.detailInfo }}>

        </div>
      </DetailInfo>
      
      <DownloadSection>
        {detail.downloadInfo ? (
          <>
            <Description>
              下载地址：{detail.downloadInfo.link}
              <br />
              提取码：{detail.downloadInfo.password}
            </Description>
          </>
        ) : (
          <>
            <LoginMessage>
              <LockOutlined style={{ marginRight: 8 }} />
              登录后即可查看下载地址
            </LoginMessage>
            <Button type="primary" size="large" onClick={handleLogin}>
              立即登录
            </Button>
          </>
        )}
      </DownloadSection>
    </DetailWrapper>
  )
}