import React, {useState} from 'react'

const CookiePopup = (props) => {
  const [otherCookiesAllowed, setOtherCookiesAllowed] = useState(false)
  const toggleOtherCookiesAllowed = () => setOtherCookiesAllowed(!otherCookiesAllowed)

  return (
    <>
      <div className="overlay" onClick={props.closePopup} />
      <div className="popup">
        <div className="header">
          <h4 className="title">Vlastné nastavenia cookies</h4>
        </div>
        <div className="body">
          <div className="wrapper">
            <div className="item">
              <span className="cookie-title">Nevyhnutné cookies</span>
              <span className="cookie-subtitle">
                Nevyhnutné cookies sú potrebné pre fungovanie webu.
              </span>
            </div>
            <span className="value necessary-allowed">Povolené</span>
          </div>
          <div className="wrapper">
            <div className="item">
              <span className="cookie-title">Ostatné cookies</span>
              <span className="cookie-subtitle">
                Ostatné cookies sú cookies, ktoré sú používané predovšetkým za účelom zvýšenia
                používateľského komfortu, ponúknutia reklamy podľa záujmov používateľa, zostavovania
                anonymných štatistík o využívaní webstránky.
              </span>
            </div>
            <div className="switch-wrapper">
              <label className="switch">
                <input type="checkbox" onChange={toggleOtherCookiesAllowed} />
                <span className="dot"></span>
              </label>
              {otherCookiesAllowed ? (
                <span className="value value-allowed">Povolené</span>
              ) : (
                <span className="value">Zakázané</span>
              )}
            </div>
          </div>
          <div className="footer">
            <button className="btn btn-secondary">Uložiť nastavenia</button>
            <button className="btn btn-primary">Akceptovať všetky</button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .overlay {
          width: 100%;
          height: 100%;
          position: fixed;
          top: 0px;
          right: 0px;
          bottom: 0px;
          left: 0px;
          z-index: 2;
          background: rgb(18, 16, 14, 0.75);
        }
        .popup {
          width: 604px;
          height: 431px;
          margin: 0 auto;
          display: table;
          position: fixed;
          left: 0;
          right: 0;
          top: calc(50% - 215.5px);
          background-color: #fff;
          z-index: 2;
        }
        .header {
          background: #fdfcfc;
          border: 4px solid #fbf4ef;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          padding: 28px 24px;
        }
        .title {
          font-weight: 800;
          font-size: 26px;
          line-height: 38px;
          text-align: center;
          margin: 0;
        }
        .body {
          background: #fdfcfc;
          border: 4px solid #fbf4ef;
          border-top: 0;
          padding: 28px 40px;
        }
        .wrapper {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40px;
        }
        .item {
          display: flex;
          flex-direction: column;
          max-width: 392px;
        }
        .cookie-title {
          font-weight: 800;
          font-size: 16px;
          line-height: 28px;
        }
        .cookie-subtitle {
          font-size: 14px;
          line-height: 22px;
          font-style: italic;
        }
        .value {
          font-size: 16px;
          line-height: 28px;
          font-weight: 800;
          position: relative;
          color: #938e8a;
          display: flex;
          align-items: center;
          padding-left: 10px;
        }
        .necessary-allowed,
        .value-allowed {
          color: #73c694;
        }
        .necessary-allowed:before {
          content: '';
          position: absolute;
          left: -8px;
          background-image: url('/images/check.svg');
          background-repeat: no-repeat;
          width: 10px;
          height: 12px;
        }
        .switch-wrapper {
          display: flex;
          align-items: center;
        }
        .switch {
          position: relative;
          display: inline-block;
          width: 26px;
          height: 16px;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .dot {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #fdfcfc;
          border: 2px solid #dcd9d8;
          border-radius: 34px;
          -webkit-transition: 0.1s;
          transition: 0.1s;
        }
        .dot:before {
          position: absolute;
          content: '';
          height: 8px;
          width: 8px;
          left: 3px;
          bottom: 2px;
          background-color: #dcd9d8;
          border-radius: 50%;
          -webkit-transition: 0.1s;
          transition: 0.1s;
        }
        input:checked + .dot {
          background-color: #fdfcfc;
          border: 2px solid #73c694;
        }
        input:checked + .dot:before {
          background: #73c694;
          -webkit-transform: translateX(8px);
          -ms-transform: translateX(8px);
          transform: translateX(8px);
        }
        .footer {
          display: flex;
          justify-content: center;
        }
        .btn {
          border: 0;
          outline: 0;
          font-weight: 800;
          font-size: 16px;
          line-height: 28px;
          padding: 12px 0px;
          width: 100%;
          max-width: 192px;
          display: flex;
          justify-content: center;
          cursor: pointer;
          transition: all 0.1s linear;
        }
        .btn + .btn {
          margin-left: 16px;
        }
        .btn-primary {
          background: #e56a61;
          color: #fff;
        }
        .btn-primary:hover {
          background: #b7605c;
        }
        .btn-secondary {
          color: #e56a61;
          background: #f6e0df;
        }
        .btn-secondary:hover {
          background: #eacdcc;
        }
      `}</style>
    </>
  )
}

export default CookiePopup
