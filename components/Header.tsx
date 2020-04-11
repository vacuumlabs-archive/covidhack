import Link from 'next/link'
import React from 'react'

const FormHeader = () => (
  <header className="header">
    <div className="container">
      <div className="wrapper">
        <div className="menu">
          <Link href="/">
            <a className="menu-link">Domov</a>
          </Link>
          <Link href="/office">
            <a className="menu-link">Kancelária</a>
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
      }
      .menu-link {
        font-size: 16px;
        line-height: 28px;
        color: #000;
        text-decoration: none;
        margin: 16px;
      }
      .menu-link:hover,
      .menu-link:focus {
        color: #e56a61;
        transition: all 0.1s linear;
      }
    `}</style>
  </header>
)

export default FormHeader
