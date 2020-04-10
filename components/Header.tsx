import Link from 'next/link'
import React from 'react'
import HeaderNav from '../components/HeaderNav'

const FormHeader = () => (
  <header className="header">
    <div className="container">
      <div className="wrapper">
        <h1 className="title">
          <Link href="/">
            <a className="title-link">
              <img src="/images/logo.svg" alt="trama" className="logo" />
            </a>
          </Link>
        </h1>
        <div className="menu">
          <Link href="/">
            <a className="menu-link">Domov</a>
          </Link>
        </div>
      </div>
    </div>
    <style jsx>{`
      .header {
        background-color: #fff;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
        position: sticky;
        width: 100%;
        height: 75px;
        left: 0;
        top: 0;
        z-index: 1;
        display: flex;
        align-items: center;
      }
      .wrapper {
        display: flex;
        align-items: center;
      }
      .title {
        margin: 0;
      }
      .title-link {
        display: flex;
      }
      .logo {
        width: 65px;
        height: auto;
        position: relative;
        top: -2px;
      }
      .menu {
        display: flex;
        align-items: center;
        position: relative;
        margin-left: 64px;
      }
      .menu-link {
        font-size: 16px;
        line-height: 28px;
        color: #000;
        text-decoration: none;
      }
      .menu-link:hover,
      .menu-link:focus {
        color: #e56a61;
        transition: all 0.1s linear;
      }
    `}</style>
  </header>
)

const MainHeader = () => (
  <header className="header">
    <div className="container">
      <div className="header-wrapper">
        <div className="wrapper">
          <h1 className="title">
            <Link href="/">
              <a className="title-link">
                <img src="/images/logo.svg" alt="trama" className="logo" />
              </a>
            </Link>
          </h1>
          <HeaderNav />
        </div>
        <div className="wrapper">
          <a href="mailto:hello@tramatm.com" className="contact-link">
            hello@tramatm.com
          </a>
          <Link href="/verification">
            <a className="btn">Registrovať známku</a>
          </Link>
        </div>
      </div>
    </div>

    <style jsx>{`
      .header {
        background-color: #fff;
        padding: 12px 0;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.06);
        position: sticky;
        width: 100%;
        height: 75px;
        left: 0;
        top: 0;
        z-index: 1;
        display: flex;
        align-items: center;
      }
      .container {
        width: 100%;
        max-width: 1090px;
        padding: 0 15px;
        margin: 0 auto;
      }
      .header-wrapper {
        display: flex;
        justify-content: space-between;
      }
      .wrapper {
        display: flex;
        align-items: center;
      }
      .title {
        margin: 0;
      }
      .title-link {
        display: flex;
      }
      .logo {
        width: 65px;
        height: auto;
        position: relative;
        top: -2px;
      }
      .contact-link {
        font-size: 16px;
        line-height: 28px;
        color: #000;
        margin-left: 37px;
      }
      .contact-link:hover,
      .contact-link:focus {
        text-decoration: none;
        color: #e56a61;
        transition: all 0.1s linear;
      }
      .btn {
        background: #12100e;
        padding: 0 32px;
        height: 51px;
        font-weight: 800;
        font-size: 16px;
        line-height: 28px;
        color: #ffffff;
        text-decoration: none;
        margin-left: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `}</style>
  </header>
)

interface HeaderProps {
  isFormPage?: boolean
}

const Header = (props: HeaderProps) => <>{props.isFormPage ? <FormHeader /> : <MainHeader />}</>

export default Header
