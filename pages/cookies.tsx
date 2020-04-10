import Link from 'next/link'
import React from 'react'
import CookiesList from '../components/Cookies'
import Layout from '../components/Layout'

const CookiesSettings = (props) => (
  <>
    <div className="wrapper">
      <h4 className="title">Aktuálne nastavenia</h4>
      <div className="settings">
        <div className="row">
          <span className="subtitle">Nevyhnutné cookies</span>
          <span className="value allowed">Povolené</span>
        </div>
        <div className="row">
          <span className="subtitle">Ostatné cookies</span>
          {props.allowed ? (
            <span className="value allowed">Povolené</span>
          ) : props.forbidden ? (
            <span className="value forbidden">Zakázané</span>
          ) : (
            <span className="value">Nenastavené</span>
          )}
        </div>
      </div>
    </div>
    <style jsx>{`
      .wrapper {
        padding: 16px 30px 24px;
        background: #fff;
        border: 4px solid #fbf4ef;
        max-width: 444px;
        margin: 0 auto;
      }
      .title {
        font-weight: 800;
        font-size: 18px;
        line-height: 30px;
        text-align: center;
        color: #e56a61;
        margin: 0;
      }
      .settings {
        margin-top: 24px;
        display: flex;
        flex-direction: column;
      }
      .row {
        display: flex;
        justify-content: space-between;
      }
      .row + .row {
        margin-top: 8px;
      }
      .subtitle {
        font-weight: 800;
        font-size: 16px;
        line-height: 28px;
      }
      .value {
        font-size: 16px;
        line-height: 28px;
      }
      .allowed {
        color: #73c694;
        font-weight: 800;
        position: relative;
        display: flex;
        align-items: center;
        padding-left: 18px;
      }
      .allowed:before {
        content: '';
        position: absolute;
        left: 0;
        background-image: url('/images/check.svg');
        background-repeat: no-repeat;
        width: 10px;
        height: 12px;
      }
      .forbidden {
        font-weight: 800;
      }
    `}</style>
  </>
)

const cookiesTableData = {
  necessary: [
    {
      type: 'Nevyhnutné pre chod webu',
      name: 'XSRF-TOKEN',
      purpose:
        'Zaisťuje bezpečnosť prehliadania tým, že zabraňuje falšovaniu žiadostí na viacerých stránkach.',
      expiration: '2 hodiny',
      address: ['Law & Tech s.r.o.', 'Jarková 14,', '080 01 Prešov,', 'Slovensko'],
      infoLink: 'Viac info',
      infoHref: '/gdpr',
    },
    {
      type: 'Nevyhnutné pre chod webu',
      name: 'verdikto_session',
      purpose: 'Uchováva stav relácie používateľa počas prehliadania stránok.',
      expiration: '2 hodiny',
      address: ['Law & Tech s.r.o.', 'Jarková 14,', '080 01 Prešov,', 'Slovensko'],
      infoLink: 'Viac info',
      infoHref: '/gdpr',
    },
    {
      type: 'Nevyhnutné pre chod webu',
      name: 'cookie-consent',
      purpose: 'Uchováva stav súhlasu používateľa cookie pre doménu trama.',
      expiration: '12 mesiacov',
      address: ['Law & Tech s.r.o.', 'Jarková 14,', '080 01 Prešov,', 'Slovensko'],
      infoLink: 'Viac info',
      infoHref: '/gdpr',
    },
  ],
  other: [
    {
      type: 'Analytika',
      name: 'Google Analytics',
      purpose:
        'Zhromažďuje údaje o počte návštevníkov webových stránok, ako aj dátumy prvej a najnovšej návštevy. Používa služba Google Analytics.',
      expiration: '24 mesiacov',
      address: [
        'Google Ireland',
        'Limited',
        'Gordon House,',
        'Barrow Street,',
        'Dublin 4, Ireland',
      ],
      infoLink: 'Viac info',
      infoHref: 'https://support.google.com/analytics/topic/2919631?hl=sk&ref_topic=1008008',
      offLink: 'Vypnúť',
      offHref: 'https://adssettings.google.com/authenticated',
    },
    {
      type: 'Remarketing',
      name: 'Google AdWords',
      purpose:
        'Identifikácia v rámci reklamnej siete Google AdWords, opätovné cielenie reklamy na základe akcie používateľa (remarketing)',
      expiration: '24 mesiacov',
      address: [
        'Google Ireland',
        'Limited',
        'Gordon House,',
        'Barrow Street,',
        'Dublin 4, Ireland',
      ],
      infoLink: 'Viac info',
      infoHref: 'https://support.google.com/analytics/topic/2919631?hl=sk&ref_topic=1008008',
      offLink: 'Vypnúť',
      offHref: 'https://adssettings.google.com/authenticated',
    },
    {
      type: 'Remarketing',
      name: 'Facebook Pixel',
      purpose:
        'Identifikácia v rámci reklamnej siete Google AdWords, opätovné cielenie reklamy na základe akcie používateľa (remarketing)',
      expiration: '3 mesiace',
      address: [
        'Facebook Ireland',
        'Ltd., 4 Grand',
        'Canal Square,',
        'Grand Canal',
        'Harbour Dublin 2,',
        'Ireland',
      ],
      infoLink: 'Viac info',
      infoHref: 'https://www.facebook.com/about/privacy/ ',
      offLink: 'Vypnúť',
      offHref: 'https://www.facebook.com/ads/preferences/?entry_product=ad_settings_screen',
    },
  ],
}

const CookiesTable = (props) => (
  <div className="wrapper">
    <div className="header">
      <h4 className="title">{props.title}</h4>
      <p className="subtitle">{props.subtitle}</p>
    </div>
    <table>
      <thead>
        <tr>
          <th className="text-center">Typ</th>
          <th className="text-center">Názov</th>
          <th>Účel</th>
          <th className="text-center">Expirácia</th>
          <th className="text-center">Adresa</th>
          <th className="text-center">Link</th>
        </tr>
      </thead>
      <tbody>
        {props.type === 'necessary' ? (
          <>
            {cookiesTableData.necessary.map((cookie, i) => (
              <tr key={i}>
                <td style={{width: '95px'}} className="text-center type">
                  {cookie.type}
                </td>
                <td style={{width: '105px'}} className="text-center">
                  {cookie.name}
                </td>
                <td style={{width: '284px'}}>{cookie.purpose}</td>
                <td style={{width: '78px'}} className="text-center">
                  {cookie.expiration}
                </td>
                <td style={{width: '110px'}} className="text-center">
                  {cookie.address.map((item, j) => (
                    <span key={j} className="address">
                      {item}
                    </span>
                  ))}
                </td>
                <td style={{width: '65px'}} className="text-center link">
                  <a href={cookie.infoHref}>{cookie.infoLink}</a>
                </td>
              </tr>
            ))}
          </>
        ) : (
          <>
            {cookiesTableData.other.map((cookie, i) => (
              <tr key={i}>
                <td style={{width: '95px'}} className="text-center type">
                  {cookie.type}
                </td>
                <td style={{width: '98px'}} className="text-center">
                  <span className="name">{cookie.name}</span>
                </td>
                <td style={{width: '284px'}}>
                  <span className="purpose">{cookie.purpose}</span>
                </td>
                <td style={{width: '78px'}} className="text-center">
                  {cookie.expiration}
                </td>
                <td style={{width: '115px'}} className="text-center">
                  {cookie.address.map((item, j) => (
                    <span key={j} className="address">
                      {item}
                    </span>
                  ))}
                </td>
                <td style={{width: '65px'}} className="text-center link">
                  {/* eslint-disable-next-line */}
                  <a href={cookie.infoHref} target="_blank">
                    {cookie.infoLink}
                  </a>
                  {/* eslint-disable-next-line */}
                  <a className="off-link" target="_blank" href={cookie.offHref}>
                    {cookie.offLink}
                  </a>
                </td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
    <style jsx>{`
      .wrapper {
        margin-bottom: 64px;
      }
      .header {
        max-width: 640px;
        margin: 0 auto;
        text-align: center;
        margin-bottom: 24px;
      }
      .title {
        font-weight: 800;
        font-size: 18px;
        line-height: 30px;
        color: #e56a61;
        margin-top: 0;
        margin-bottom: 16px;
      }
      .subtitle {
        font-size: 16px;
        line-height: 28px;
        font-style: italic;
        margin: 0;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        border: 4px solid #fbf4ef;
      }
      thead {
        background: #fbf4ef;
      }
      tr + tr {
        border-top: 4px solid #fbf4ef;
      }
      th {
        font-weight: 800;
        font-size: 16px;
        line-height: 28px;
        padding: 8px 4px;
      }
      th:first-of-type {
        padding-left: 8px;
      }
      th:last-of-type {
        padding-right: 8px;
      }
      td {
        font-size: 14px;
        line-height: 22px;
        padding: 12px 4px;
        box-sizing: content-box;
      }
      td:first-of-type {
        padding-left: 8px;
      }
      td:last-of-type {
        padding-right: 8px;
      }
      .type {
        font-weight: 800;
      }
      .text-center {
        text-align: center;
      }
      .link {
        min-width: 68px;
      }
      .link a {
        font-weight: 800;
        color: #e56a61;
        display: inline-block;
      }
      .link a:hover {
        text-decoration: none;
      }
      .link .off-link {
        color: #000;
        margin-top: 24px;
      }
      .address {
        display: block;
      }
      .purpose {
        display: block;
        max-width: 275px;
      }
      .name {
        display: block;
        max-width: 60px;
        margin: 0 auto;
      }
    `}</style>
  </div>
)

const CookiesOptions = () => (
  <div className="options">
    <h4 className="title">Vaše možnosti</h4>
    <p className="subtitle">
      Existuje viacero možností, ako spravovať alebo obmedziť to, ako my a naši partneri využívame
      cookies a podobné technológie.
    </p>
    <ul className="list">
      <li className="item">
        <strong>1. Nastavenia prehliadača:</strong> hoci väčšina prehliadačov má základné
        nastavenie, ktorým akceptujú cookies, ich nastavenia umožňujú, aby ste si vymazali alebo
        odmietli cookies. Musíme vás však upozorniť, že v tomto prípade nemusia niektoré poskytované
        služby riadne fungovať.
      </li>
      <li className="item">
        <strong>2. Tretie strany:</strong> na obmedzenie cookies sa dajú využiť riešenia tretích
        strán, na príklad na stránke {/* eslint-disable-next-line */}
        <a href="https://optout.aboutads.info" className="link" target="_blank">
          optout.aboutads.info
        </a>
        .
      </li>
      <li className="item">
        <strong>3. Vlastné riešenia partnerov:</strong> na obmedzenie cookies tiež možno využiť
        riešenia ponúkané jednotlivými partnermi, ktoré sme uviedli vyššie.
      </li>
    </ul>
    <div className="btn-wrapper">
      <Link href="/gdpr">
        <a className="btn">Viac o ochrane osobných údajov</a>
      </Link>
    </div>
    <style jsx>{`
      .options {
        background: #fbf4ef;
        padding: 24px 75px;
      }
      .title {
        font-weight: 800;
        font-size: 18px;
        line-height: 30px;
        color: #e56a61;
        text-align: center;
        margin-top: 0;
        margin-bottom: 16px;
      }
      .subtitle {
        font-size: 16px;
        line-height: 28px;
        margin-top: 0;
        margin-bottom: 16px;
      }
      .list {
        padding: 0;
        margin: 0;
        list-style: none;
        margin-bottom: 32px;
      }
      .item {
        font-size: 16px;
        line-height: 28px;
      }
      .item + .item {
        margin-top: 8px;
      }
      .item strong {
        font-weight: 800;
      }
      .link {
        font-weight: 800;
        color: #e56a61;
      }
      .link:hover {
        text-decoration: none;
      }
      .btn-wrapper {
        display: flex;
        justify-content: center;
      }
      .btn {
        font-weight: 800;
        font-size: 16px;
        line-height: 28px;
        text-align: center;
        color: #e56a61;
        text-decoration: none;
        padding: 12px 40px;
        background: #f6e0df;
      }
      .btn:hover {
        background: #eacdcc;
        transition: all 0.1s linear;
      }
    `}</style>
  </div>
)

const Cookies = () => (
  <>
    <Layout isLandingPage>
      <div className="container">
        <div className="wrapper">
          <h3 className="title">Cookies</h3>
          {/* TODO: allowed, forbidden */}
          <CookiesSettings />
          <CookiesList />
          <div className="tables">
            <img src="/images/boy.svg" alt="boy" className="img" />
            <CookiesTable
              type="necessary"
              title="Nevyhnutné cookies"
              subtitle="Nutné k prevádzke webu, nevyžadujú súhlas s použitím cookies. Vytvárajú sa automaticky pri návšteve stránky. Neslúžia k zberu informácií o návštevníkovi."
            />
            <CookiesTable
              type="other"
              title="Ostatné cookies"
              subtitle="Nepovinné cookies bežia len so súhlasom, môžu obsahovať osobné údaje."
            />
          </div>
          <CookiesOptions />
        </div>
      </div>
    </Layout>
    <style jsx>{`
      .wrapper {
        padding: 80px 0 160px;
        margin: 0 auto;
      }
      .title {
        font-weight: 800;
        font-size: 26px;
        line-height: 38px;
        margin-top: 0;
        margin-bottom: 24px;
        text-align: center;
      }
      .tables {
        position: relative;
      }
      .img {
        position: absolute;
        max-width: 195px;
        height: auto;
        top: 470px;
        right: -242px;
      }
    `}</style>
    <style jsx global>{`
      body {
        background-color: #fdfcfc;
      }
      .container {
        max-width: 824px;
        position: relative;
      }
    `}</style>
  </>
)

export default Cookies
