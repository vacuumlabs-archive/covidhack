import cn from 'classnames'
import {ErrorMessage} from 'formik'
import Link from 'next/link'
import React, {useState} from 'react'
import BooleanCheckbox from './inputs/BooleanCheckbox'

const CartSteps = (props) => (
  <>
    {props.type === 'verification' ? (
      <>
        <li className={props.formComplete ? 'step completed' : 'step current'}>
          <span className="title">1. Vyplnenie formulára</span>
        </li>
        <li className={props.formComplete ? 'step current' : 'step'}>
          <span className="title">2. Overenie ochrannej známky</span>
          <ul className="list">
            <li className="list-item">Kontrola základných kritérií potrebných pre registráciu</li>
            <li className="list-item">Kontrola dostupnosti v rámci prístupných databáz</li>
          </ul>
          <button
            type="submit"
            disabled={props.buttonDisabled}
            onClick={props.onSubmit}
            className="btn"
          >
            Overiť zadarmo
          </button>
        </li>
        <li className="step">
          <span className="title">3. Záväzná registrácia</span>
        </li>
      </>
    ) : (
      <>
        <li className="step completed">
          <span className="title">1. Vyplnenie formulára</span>
        </li>
        <li className="step completed">
          <span className="title">2. Overenie ochrannej známky</span>
        </li>
        <li className="step current">
          <span
            className={cn('title title-registration', props.listOpen && 'open')}
            onClick={props.onClick}
          >
            {props.international ? '3. Nezáväzná registrácia' : '3. Záväzná registrácia'}
          </span>
        </li>
      </>
    )}
    <style jsx>{`
      .step {
        position: relative;
        padding-left: 16px;
      }
      .step:not(:last-child) {
        padding-bottom: 40px;
      }
      .step:before {
        display: inline-block;
        content: '';
        position: absolute;
        top: 14px;
        left: -8.5px;
        height: 100%;
      }
      .step:after {
        content: '';
        display: inline-block;
        position: absolute;
        width: 8px;
        height: 8px;
        left: -13px;
        top: 8px;
        border: 2px solid #d2cbc6;
        border-radius: 50%;
        background-color: #fdfcfc;
      }
      .step.completed:after {
        content: '';
        top: 6px;
        left: -15px;
        width: 12px;
        height: 12px;
        color: #fff;
        text-align: center;
        border: 2px solid #12100e;
        background-color: #12100e;
        background-image: url('/images/checkmark.svg');
        background-repeat: no-repeat;
        background-position-x: 1px;
        background-position-y: 1px;
        background-size: 10px 10px;
      }
      .step.current:after {
        top: 11px;
        left: -15px;
        width: 12px;
        height: 12px;
        border: 2px solid #ed6b67;
      }
      .title {
        display: inline-block;
        position: relative;
        font-weight: 800;
        font-size: 18px;
        line-height: 29px;
      }
      .title-registration:after {
        content: '';
        position: absolute;
        width: 24px;
        height: 24px;
        top: 8px;
        right: -36px;
        background-image: url('/images/chevron_down_pink.svg');
        transition: all 0.1s linear;
        cursor: pointer;
      }
      .open.title-registration:after {
        transform: rotate(180deg);
      }
      .step.current .title {
        font-size: 26px;
        line-height: 38px;
        color: #e56a61;
      }
      .step.current .list {
        margin-top: 7px;
      }
      .list {
        padding-left: 5px;
        list-style: none;
        margin-top: 16px;
        margin-bottom: 32px;
      }
      .list-item {
        font-size: 14px;
        line-height: 22px;
        padding-left: 14px;
        position: relative;
      }
      .list-item::before {
        content: '';
        position: absolute;
        width: 6px;
        height: 6px;
        top: 7px;
        left: 0;
        background: #d2cbc6;
        border-radius: 50%;
      }
      .list-item + .list-item {
        margin-top: 12px;
      }
      .btn {
        padding: 12px 64px;
        max-width: 308px;
        height: 61px;
        background: #e56a61;
        font-weight: 800;
        font-size: 18px;
        line-height: 37px;
        color: #fff;
        width: 100%;
        text-align: center;
        border: 0;
        outline: 0;
        margin-left: 5px;
      }
      .btn:hover {
        background: #b7605c;
        cursor: pointer;
        transition: all 0.1s linear;
      }
    `}</style>
  </>
)

const ServiceIncludesList = () => (
  <div className="wrapper">
    <span className="title">Služba zahŕňa</span>
    <ul className="list">
      <li className="item">Konzultácie pri úkonoch spojených s registráciou ochrannej známky</li>
      <li className="item">Príprava a podanie žiadosti o zápis ochrannej známky</li>
      <li className="item">Zastupovanie pred úradom okrem zastupovania v sporovom konaní</li>
      <li className="item">Odovzdanie certifikátu po úspešnom zápise</li>
    </ul>
    <style jsx>{`
      .wrapper {
        margin-top: 16px;
        padding: 0 32px;
      }
      .title {
        font-weight: 800;
        font-size: 16px;
        line-height: 28px;
        margin-bottom: 8px;
        display: block;
      }
      .list {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .item {
        font-size: 14px;
        line-height: 22px;
        padding-left: 14px;
        position: relative;
      }
      .item:before {
        content: '';
        position: absolute;
        width: 6px;
        height: 6px;
        top: 9px;
        left: 0;
        background-color: #d2cbc6;
        border-radius: 50%;
      }
      .item + .item {
        margin-top: 8px;
      }
    `}</style>
  </div>
)

const Agreement = (props) => (
  <>
    <div className="wrapper">
      <div className="item">
        <ErrorMessage name="terms_and_conditions" component="div" className="error-message" />
        <BooleanCheckbox
          name="terms_and_conditions"
          label={
            <>
              Súhlasím so&nbsp;
              <Link href="/terms-and-conditions">
                <a className="link" target="_blank">
                  Všeobecnými obchodnými podmienkami
                </a>
              </Link>
            </>
          }
        />
      </div>
      <div className="item">
        <ErrorMessage name="gdpr" component="div" className="error-message" />
        <BooleanCheckbox
          name="gdpr"
          label={
            <>
              Súhlasím so&nbsp;
              <Link href="/gdpr">
                <a className="link" target="_blank">
                  spracovaním osobných údajov
                </a>
              </Link>
            </>
          }
        />
      </div>
    </div>
    <div className="btn-wrapper">
      {/* TODO */}
      <button type="submit" className="btn">
        {props.international ? 'Nezáväzne objednať' : 'Záväzne objednať'}
      </button>
    </div>
    <style jsx>{`
      .wrapper {
        margin-top: 24px;
        margin-bottom: 32px;
        padding-left: 20px;
        padding-right: 23px;
      }
      .item + .item {
        margin-top: 16px;
      }
      .label {
        display: flex;
        align-items: center;
        position: relative;
        font-size: 12px;
        line-height: 22px;
        padding-left: 32px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
      }
      .label input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }
      .checkmark {
        position: absolute;
        left: 0;
        height: 16px;
        width: 16px;
        background: #fbf4ef;
        box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.08);
      }
      .label input:checked ~ .checkmark {
        background: #e56a61;
      }
      .checkmark:after {
        content: '';
        position: absolute;
        display: none;
      }
      .label input:checked ~ .checkmark:after {
        display: block;
      }
      .label .checkmark:after {
        left: 5.5px;
        top: 2.5px;
        width: 3px;
        height: 7px;
        border: solid #fff;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(36deg);
        -ms-transform: rotate(36deg);
        transform: rotate(36deg);
      }
      .link {
        font-weight: 800;
        color: #000;
      }
      .link:hover {
        text-decoration: none;
      }
      .btn-wrapper {
        max-width: 308px;
        margin: 0 auto;
        margin-top: 32px;
      }
      .btn {
        padding: 12px 64px;
        height: 61px;
        background: #e56a61;
        font-weight: 800;
        font-size: 18px;
        line-height: 37px;
        color: #fff;
        width: 100%;
        text-align: center;
        border: 0;
        outline: 0;
      }
      .btn:hover {
        background: #b7605c;
        cursor: pointer;
        transition: all 0.1s linear;
      }
    `}</style>
    <style jsx global>{`
      .item .error-message {
        position: absolute;
        color: #ff0000;
        font-weight: 800;
        font-size: 10px;
        line-height: 16px;
        padding-left: 24px;
        margin-top: 20px;
      }
      .item .error-message:before {
        content: '';
        position: absolute;
        background-repeat: no-repeat;
        background-position: center top;
        background-image: url('/images/alert.svg');
        width: 16px;
        height: 16px;
        left: 0;
        top: -1px;
      }
      .item .error-message + .label .checkmark {
        background: #f9f5f2;
        border: 1px solid #ff0000;
        box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.08);
      }
    `}</style>
  </>
)
const DetailPrice = (props) => {
  const lawyearHelpFee = props.lawyearHelp ? 50 : 0

  return (
    <>
      {(props.lawyearHelp || props.servicesFee > 0) && (
        <div className="wrapper">
          <div className="item">
            <span className="title">Cena za registráciu</span>
            <span className="price">
              {props.totalPrice - props.servicesFee - lawyearHelpFee}&nbsp;EUR
            </span>
          </div>
          {props.servicesFee > 0 && (
            <div className="item">
              <span className="title">Trieda nad rámec zákl. ceny</span>
              <span className="price">{props.servicesFee}&nbsp;EUR</span>
            </div>
          )}
          {props.lawyearHelp && (
            <div className="item">
              <span className="title">Výber tried právnikom</span>
              <span className="price">{lawyearHelpFee}&nbsp;EUR</span>
            </div>
          )}
        </div>
      )}
      <style jsx>{`
        .wrapper {
          margin-top: 32px;
          padding: 0 22px 0 32px;
        }
        .item {
          display: flex;
          justify-content: space-between;
        }
        .item + .item {
          margin-top: 8px;
        }
        .title,
        .price {
          font-size: 14px;
          line-height: 22px;
        }
        .price {
          text-align: right;
        }
      `}</style>
    </>
  )
}

const CollapsibleDescription = (props) => (
  <>
    <ServiceIncludesList />
    <DetailPrice
      lawyearHelp={props.lawyearHelp}
      servicesFee={props.servicesFee}
      totalPrice={props.totalPrice}
    />
  </>
)

const Cart = (props) => {
  const [listOpen, setListOpen] = useState(false)

  const onClick = () => setListOpen(!listOpen)

  return (
    <>
      <div className="cart">
        <ul className={cn('progress-steps', props.type === 'registration' && 'registration')}>
          <CartSteps
            type={props.type}
            onSubmit={props.onSubmit}
            buttonDisabled={props.buttonDisabled}
            formComplete={props.formComplete}
            listOpen={listOpen}
            onClick={onClick}
            international={props.international}
          />
        </ul>
        {listOpen && (
          <CollapsibleDescription
            lawyearHelp={props.lawyearHelp}
            servicesFee={props.servicesFee}
            totalPrice={props.price}
          />
        )}
        <div className="wrapper">
          <div className="price-header">
            <span className="price-title">Cena za registráciu</span>
            <div
              className={cn('price-title', props.type === 'registration' && 'price-title-primary')}
            >
              <span>
                {props.international ? props.price : props.price > 0 ? props.price : '--'}
              </span>
              &nbsp;EUR
            </div>
          </div>
          <p className="price-description">
            {props.type === 'registration'
              ? props.international
                ? 'Uvedená suma je orientačná. Cena závisí od počtu štátov a počtu a druhu tovarov a služieb, ktoré sú predmetom ochrany. S finálnou cenou sa Vám ozve náš právnik.'
                : 'Uvedená suma je konečná.'
              : props.international
              ? 'Cena závisí od počtu štátov a počtu a druhu tovarov a služieb, ktoré sú predmetom ochrany. S finálnou cenou sa Vám ozve náš právnik.'
              : 'Uvedenú sumu platíte až po záväznom objednaní registrácie.'}
          </p>
        </div>
        {props.type === 'registration' && <Agreement international={props.international} />}
      </div>
      <style jsx>{`
        .cart {
          padding: 40px 24px;
          background: #fdfcfc;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
          position: sticky;
          top: 110px;
        }
        .progress-steps {
          position: relative;
          padding-left: 15px;
          list-style: none;
          margin: 0;
        }
        .progress-steps:before {
          display: inline-block;
          content: '';
          position: absolute;
          top: 11px;
          left: 7px;
          height: calc(100% - 20px);
          border-left: 2px dashed #d2cbc6;
        }
        .progress-steps.registration:before {
          height: calc(100% - 31px);
          border-left: 2px dashed #12100e;
        }
        .wrapper {
          margin-top: 24px;
          padding: 0 20px;
        }
        .price-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .price-title {
          font-weight: 800;
          font-size: 18px;
          line-height: 20px;
        }
        .price-title small {
          font-size: 13px;
        }
        .price-title-primary {
          color: #e56a61;
        }
        .price-description {
          font-size: 14px;
          line-height: 22px;
          font-style: italic;
          margin: 0;
          max-width: 330px;
        }
      `}</style>
    </>
  )
}

export default Cart
