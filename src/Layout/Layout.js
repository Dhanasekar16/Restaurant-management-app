import React from 'react'
import './Layout.scss'
import { Header } from '../Pages/Header/Header'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <>
    <div className='layout_bg'>
      <div>
            <Header />
      </div>
      <div>
            <Outlet />
      </div>
    </div>
    </>
  )
}
