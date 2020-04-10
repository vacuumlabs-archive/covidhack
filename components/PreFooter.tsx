import Link from 'next/link'
import React from 'react'

export const preFooterLinks = {
  menu: [
    // temporary
    // {
    //   path: '',
    //   title: 'O nás',
    // },
    {
      path: '/faq',
      title: 'Často kladené otázky',
    },
    {
      path: '/terms-and-conditions',
      title: 'Všeobecné obchodné podmienky',
    },
    {
      path: '/gdpr',
      title: 'Ochrana osobných údajov',
    },
  ],
  products: [
    {
      title: 'Playbook.io',
    },
    {
      path: 'https://sparring.io',
      title: 'Sparring.io',
    },
    {
      path: 'http://tramatm.com',
      title: 'trama',
    },
  ],
}

const preFooterContactLinks = [
  {
    type: 'phone',
    value: '(+421) 911 903 759',
  },
  {
    type: 'email',
    value: 'hello@tramatm.com',
  },
]

interface PreFooterLinkProps {
  path?: string
  title: string
  external?: boolean
}

const PreFooterLink = (props: PreFooterLinkProps) => (
  <li className="item">
    {props.external ? (
      <>
        {/* eslint-disable-next-line */}
        <a href={props.path} className="link" target="_blank">
          {props.title}
        </a>
      </>
    ) : (
      <Link href={props.path}>
        <a className="link">{props.title}</a>
      </Link>
    )}
    <style jsx>{`
      .item {
        line-height: 28px;
      }
      .item + .item {
        margin-top: 16px;
      }
      .link {
        display: inline-block;
        color: #fff;
        font-size: 16px;
        line-height: 28px;
        text-decoration: none;
      }
      .link:hover,
      .link:focus {
        color: #e56a61;
      }
    `}</style>
  </li>
)

interface PreFooterContactLinkProps {
  type: string
  value: string
}

const PreFooterContactLink = (props: PreFooterContactLinkProps) => (
  <li className="item">
    <a
      href={props.type === 'phone' ? `tel: ${props.value}` : `mailto: ${props.value} `}
      className="link"
    >
      {props.value}
    </a>
    <style jsx>{`
      .link {
        font-size: 16px;
        line-height: 28px;
        font-weight: 800;
        color: #fff;
      }
      .item + .item {
        margin-top: 14px;
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

const PreFooter = () => (
  <section className="pre-footer">
    <div className="container">
      <div className="wrapper">
        <div>
          <Link href="/">
            <a className="title-link">
              <img src="/images/logo-white.svg" alt="trama" className="logo" />
            </a>
          </Link>
          <ul className="list">
            {preFooterLinks.menu.map((link, i) => (
              <PreFooterLink key={i} path={link.path} title={link.title} />
            ))}
          </ul>
        </div>
        <div>
          <h3 className="title">Naše produkty</h3>
          <ul className="list">
            {preFooterLinks.products.map((link, i) => (
              <PreFooterLink key={i} path={link.path} title={link.title} external />
            ))}
          </ul>
        </div>
        <div>
          <h3 className="title">Kontakt</h3>
          <div className="contact-wrapper">
            <ul className="list contact-list">
              <li className="address">Law & Tech s.r.o.,</li>
              <li className="address">Jarková 14,</li>
              <li className="address">080 01 Prešov,</li>
              <li className="address">Slovenská republika</li>
            </ul>
            <ul className="list contact-list">
              {preFooterContactLinks.map((contact, i) => (
                <PreFooterContactLink key={i} type={contact.type} value={contact.value} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      .pre-footer {
        background-color: #100f0f;
        padding: 48px 0;
      }
      .container {
        width: 100%;
        max-width: 1090px;
        padding: 0 15px;
        margin: 0 auto;
      }
      .wrapper {
        display: flex;
        justify-content: space-between;
      }
      .title-link {
        display: flex;
      }
      .logo {
        width: 65px;
        height: auto;
        margin-top: 6px;
        margin-bottom: 39px;
      }
      .title {
        font-size: 20px;
        line-height: 27px;
        color: #fff;
        font-weight: 800;
        margin-top: 0;
        margin-bottom: 32px;
      }
      .list {
        padding-left: 0;
        margin: 0;
        list-style: none;
      }
      .contact-wrapper {
        display: flex;
      }
      .contact-list {
        margin-right: 72px;
      }
      .address {
        font-size: 16px;
        line-height: 28px;
        color: #fff;
      }
    `}</style>
  </section>
)

export default PreFooter
