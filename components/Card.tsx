import Link from 'next/link'
import React from 'react'

interface CardProps {
  labels: Array<string>
  title: string
  subtitle: string
  price: string // TODO type better
  currency: string
  description: string
  href: {pathname: string; query: {category: string}}
}

const Card = (props: CardProps) => {
  return (
    <div className="card">
      <ul className="labels">
        {props.labels.map((label, i) => (
          <li key={i} className="label">
            {label}
          </li>
        ))}
      </ul>
      <div className="content">
        <div>
          <h4 className="title">{props.title}</h4>
          <p className="subtitle" dangerouslySetInnerHTML={{__html: `${props.subtitle}`}}></p>
        </div>
        <div className="wrapper">
          <span className="price">{props.price + ' ' + props.currency}</span>
          <p className="description">{props.description}</p>
          <div className="btn-wrapper">
            <Link href={props.href}>
              <a className="btn">Overiť zadarmo</a>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .card {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          box-shadow: 3px 4px 12px rgba(0, 0, 0, 0.08);
          border-radius: 6px;
          max-width: 320px;
          min-height: 465px;
          transition: all 0.1s linear;
        }
        .card:hover {
          transform: scale(1.0313);
        }
        .labels {
          display: flex;
          justify-content: flex-end;
          padding-left: 0;
          margin: 0;
          list-style: none;
          margin-bottom: 35px;
          padding: 13px 16px 0;
        }
        .label {
          background: #f6e0df;
          color: #e56a61;
          font-size: 10px;
          line-height: 14px;
          font-weight: 800;
          padding: 5px 12px;
        }
        .label + .label {
          margin-left: 8px;
        }
        .title {
          font-weight: 800;
          font-size: 26px;
          line-height: 38px;
          margin-top: 0;
          margin-bottom: 16px;
        }
        .content {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1 1 auto;
          padding: 0 24px 32px;
        }
        .subtitle {
          font-size: 16px;
          line-height: 28px;
          padding-left: 14px;
          position: relative;
          margin-top: 0;
          margin-bottom: 32px;
        }
        .subtitle:before {
          content: '';
          position: absolute;
          width: 6px;
          height: 6px;
          top: 9px;
          left: 0;
          background-color: #dcd9d8;
          border-radius: 50%;
        }
        .wrapper {
          display: flex;
          flex-direction: column;
        }
        .price {
          font-weight: 800;
          font-size: 26px;
          line-height: 38px;
          color: #e56a61;
        }
        .description {
          font-size: 14px;
          line-height: 22px;
          font-style: italic;
          margin-top: 12px;
          margin-bottom: 32px;
        }
        .btn-wrapper {
          display: flex;
          justify-content: center;
          max-width: 263px;
          width: 100%;
          margin: 0 auto;
        }
        .btn {
          background: #12100e;
          font-weight: 800;
          font-size: 16px;
          line-height: 28px;
          text-align: center;
          padding: 16px 0;
          color: #fff;
          width: 100%;
          text-decoration: none;
        }
      `}</style>
    </div>
  )
}

export default Card
