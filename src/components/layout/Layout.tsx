import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { Container } from './Container'
import { Header } from './Header'
import { Footer } from './Footer'

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`

const Main = styled.main`
  flex: 1;
  padding: 24px 0;
`

export const Layout: React.FC = () => {
  return (
    <LayoutWrapper>
      <Header />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
      <Footer />
    </LayoutWrapper>
  )
} 