import Link from 'next/link'
import React from 'react'

const navLinks = [
  {
    href: '#steps',
    title: 'Ako to funguje?',
  },
  {
    href: '#references',
    title: 'Referencie',
  },
  {
    href: '#faq',
    title: 'Kontakt',
  },
]

interface NavLinkProps {
  href: string
  title: string
}

const NavLink = (props: NavLinkProps) => (
  <li className="item">
    <Link href={'/' + `${props.href}`}>
      <a className="link">{props.title}</a>
    </Link>
    <style jsx>{`
      .item + .item {
        margin-left: 38px;
      }
      .link {
        font-size: 16px;
        line-height: 28px;
        color: #000;
        text-decoration: none;
      }
      .link:hover,
      .link:focus {
        color: #e56a61;
        transition: all 0.1s linear;
      }
    `}</style>
  </li>
)

const HeaderNav = () => (
  <nav>
    <ul className="wrapper">
      {navLinks.map((link, i) => (
        <NavLink key={i} href={link.href} title={link.title} />
      ))}
    </ul>
    <style jsx>{`
      .wrapper {
        display: flex;
        list-style: none;
        padding-left: 0;
        margin: 0;
        margin-left: 64px;
      }
    `}</style>
  </nav>
)

export default HeaderNav
