import React from 'react'
import styled from 'styled-components'
import { Container } from './Container'

const FooterWrapper = styled.footer`
  width: 100%;
  background: ${props => props.theme.colors.footerBackground};
  color: rgba(255, 255, 255, 0.85);
  padding: 48px 0 24px;
`

const FooterContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px;
`

const FooterSection = styled.div`
  h3 {
    font-size: 16px;
    margin-bottom: 24px;
    color: #fff;
  }

  ul {
    li {
      margin-bottom: 12px;
      opacity: 0.85;
      cursor: pointer;
      transition: opacity 0.3s;

      &:hover {
        opacity: 1;
      }
    }
  }
`

const Copyright = styled.div`
  text-align: center;
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0.6;
`

export const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterSection>
          <h3>关于我们</h3>
          <ul>
            <li>用户协议</li>
            <li>免责声明</li>
            <li>隐私政策</li>
            <li>关于我们</li>
          </ul>
        </FooterSection>
        <FooterSection>
          <h3>特色功能</h3>
          <ul>
            <li>小黑屋</li>
            <li>视频解析</li>
            <li>微信</li>
          </ul>
        </FooterSection>
        <FooterSection>
          <h3>用户服务</h3>
          <ul>
            <li>用户协议</li>
            <li>免责声明</li>
            <li>隐私政策</li>
          </ul>
        </FooterSection>
        <FooterSection>
          <h3>联系我们</h3>
          <ul>
            <li>公众号</li>
            <li>QQ</li>
          </ul>
        </FooterSection>
      </FooterContainer>
      <Container>
        <Copyright>
          © 2024 87创业网 · VIP.M987.CN
        </Copyright>
      </Container>
    </FooterWrapper>
  )
} 