import cn from 'classnames'
import Link from 'next/link'
import React, {useState} from 'react'
import CookiePopup from './CookiePopup'

const CookieBanner = () => {
  const [cookieBannerClose, setCookieBannerClosed] = useState(false)
  const [cookiePopupOpen, setCookiePopupOpen] = useState(false)

  const setCookiePopupClosed = () => {
    if (cookiePopupOpen) {
      setCookiePopupOpen(!cookiePopupOpen)
    }
  }

  return (
    <div className={cn('card', cookieBannerClose && 'hide')}>
      <span className="close-icon" onClick={() => setCookieBannerClosed(true)}></span>
      <div className="header">
        <img src="/images/ellipse-pink.svg" alt="ellipse-pink" className="img" />
      </div>
      <p className="description">
        Pre lepší online zážitok používame súbory “cookies”. Vďaka nim presnejšie analyzujeme
        návštevnosť, prispôsobujeme reklamu a používateľské nastavenia. Súhlasíte so spracovaním
        súvisiacich údajov? Pre viac informácií si pozrite{' '}
        <Link href="/cookies">
          <a className="link">Informácie o cookies</a>
        </Link>
        .
      </p>
      <button className="btn">Súhlasím</button>
      <span className="settings" onClick={() => setCookiePopupOpen(!cookiePopupOpen)}>
        Vlastné nastavenia cookies
      </span>
      {cookiePopupOpen && <CookiePopup closePopup={setCookiePopupClosed} />}
      <style jsx>{`
        .card {
          position: fixed;
          left: 64px;
          bottom: 64px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #fbf4ef;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
          padding: 32px 40px;
          max-width: 339px;
          z-index: 2;
        }
        .hide.card {
          display: none;
        }
        .header {
          position: relative;
          display: flex;
          justify-content: center;
          margin-bottom: 39px;
          margin-top: 30px;
        }
        .header:before {
          content: '';
          position: absolute;
          background-image: url('/images/curves.svg');
          background-repeat: no-repeat;
          width: 134px;
          height: 66px;
          left: -35px;
          top: -26px;
        }
        .header:after {
          content: '';
          position: absolute;
          background-image: url('/images/ellipse.svg');
          background-repeat: no-repeat;
          width: 60px;
          height: 60px;
          top: -10px;
        }
        .close-icon {
          position: absolute;
          background-image: url('/images/plus.svg');
          height: 20px;
          width: 20px;
          transform: rotate(45deg);
          right: 24px;
          top: 24px;
          cursor: pointer;
        }
        .img {
          max-width: 49px;
          height: 42px;
        }
        .description {
          font-size: 16px;
          line-height: 28px;
          text-align: center;
          margin-top: 0;
          margin-bottom: 24px;
        }
        .link {
          font-weight: 800;
          color: #000;
        }
        .link:hover {
          text-decoration: none;
        }
        .btn {
          border: 0;
          outline: 0;
          font-weight: 800;
          font-size: 16px;
          line-height: 28px;
          text-align: center;
          color: #e56a61;
          background: #f6e0df;
          padding: 12px 40px;
          max-width: 138px;
          margin-bottom: 24px;
          cursor: pointer;
          transition: all 0.1s linear;
        }
        .btn:hover {
          background: #eacdcc;
        }
        .settings {
          font-weight: 800;
          font-size: 16px;
          line-height: 28px;
          text-decoration-line: underline;
          color: #e56a61;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}
export default CookieBanner
