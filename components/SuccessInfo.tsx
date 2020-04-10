import Link from 'next/link'
import React from 'react'

interface SuccessInfoProps {
  title: string
  subtitle: string
  note: string
  href: string
  link: string
}

const SuccessInfo = (props: SuccessInfoProps) => (
  <div className="content">
    <div className="header">
      <img src="/images/check-circle.svg" alt="check-circle" className="check" />
      <h3 className="title">{props.title}</h3>
    </div>
    <p className="subtitle" dangerouslySetInnerHTML={{__html: `${props.subtitle}`}}></p>
    {props.note && (
      <div className="wrapper">
        <span className="note">{props.note}</span>
        <Link href={props.href}>
          <a className="link" target="_blank">
            {props.link}
          </a>
        </Link>
      </div>
    )}
    <style jsx>{`
      .content {
        text-align: center;
      }
      .header {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin-top: 32px;
      }
      .check {
        width: 40px;
        height: 40px;
        margin-right: 16px;
      }
      .title {
        font-weight: 800;
        font-size: 26px;
        line-height: 38px;
        color: #73c694;
        margin: 0;
      }
      .subtitle {
        max-width: 562px;
        font-size: 18px;
        line-height: 32px;
        margin: 16px auto 0;
      }
      .wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 0 auto;
        max-width: 482px;
        margin-top: 32px;
      }
      .note {
        font-size: 16px;
        line-height: 28px;
      }
      .link {
        font-size: 16px;
        line-height: 28px;
        font-weight: 800;
        color: #000;
        margin-left: 4px;
      }
      .link:hover {
        text-decoration: none;
      }
    `}</style>
  </div>
)

export default SuccessInfo
