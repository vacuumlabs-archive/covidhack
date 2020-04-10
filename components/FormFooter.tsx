import Link from 'next/link'
import React from 'react'
import {preFooterLinks} from './PreFooter'

interface FormFooterLinkProps {
  path: string
  title: string
}

const FormFooterLink = (props: FormFooterLinkProps) => (
  <li className="item">
    <Link href={props.path}>
      <a className="link">{props.title}</a>
    </Link>
    <style jsx>{`
      .item + .item {
        margin-left: 36px;
      }
      .link {
        font-size: 16px;
        line-height: 28px;
        color: #fff;
        text-decoration: none;
      }
      .link:hover,
      .link:focus {
        text-decoration: none;
        color: #e56a61;
        transition: all 0.1s linear;
      }
    `}</style>
  </li>
)

const FormFooter = () => (
  <section className="footer">
    <div className="container">
      <div className="wrapper">
        <div className="links">
          <Link href="/">
            <a className="title-link">
              <img src="/images/logo-white.svg" alt="trama" className="logo" />
            </a>
          </Link>
          <a href="mailto:hello@tramatm.com" className="email">
            hello@tramatm.com
          </a>
        </div>
        <ul className="list">
          {preFooterLinks.menu.map((link, i) => (
            <FormFooterLink key={i} path={link.path} title={link.title} />
          ))}
        </ul>
      </div>
    </div>
    <style jsx>{`
      .footer {
        background-color: #000;
        padding: 46px 0;
      }
      .wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .links {
        display: flex;
      }
      .title-link {
        display: flex;
      }
      .logo {
        width: 65px;
        height: 14px;
        position: relative;
        top: 1px;
      }
      .email {
        font-weight: 800;
        font-size: 16px;
        line-height: 28px;
        color: #fff;
        margin-left: 66px;
      }
      .email:hover,
      .email-focus {
        text-decoration: none;
        color: #e56a61;
        transition: all 0.1s linear;
      }
      .list {
        padding-left: 0;
        margin: 0;
        list-style: none;
        display: flex;
      }
    `}</style>
  </section>
)

export default FormFooter
