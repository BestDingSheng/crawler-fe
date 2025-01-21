import React from 'react'
import styled from 'styled-components'
import { Button, Input } from 'antd'
import { Container } from './Container'
import { useTheme } from '../../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'

const HeaderWrapper = styled.header`
  width: 100%;
  height: 64px;
  background: ${props => props.theme.colors.headerBackground};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`

const HeaderContainer = styled(Container)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`

const SearchBar = styled(Input.Search)`
  width: 320px;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const Header: React.FC = () => {
  const { toggleTheme, isDark } = useTheme()
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo onClick={handleLogoClick}>87创业网</Logo>
        <SearchBar placeholder="搜索" />
        <Actions>
          <Button type="text" onClick={toggleTheme}>
            {isDark ? '切换亮色' : '切换暗色'}
          </Button>
          <Button type="text">消息</Button>
          <Button>登录</Button>
          <Button type="primary">充值</Button>
          <Button type="primary" danger>开通会员</Button>
        </Actions>
      </HeaderContainer>
    </HeaderWrapper>
  )
} 