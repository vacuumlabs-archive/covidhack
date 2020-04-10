import React from 'react'

const termsAndConditionsList = [
  {
    title: 'Obchodné podmienky pre použitie aplikácie trama',
    list: [
      'Aplikácia trama je technickým riešením (platformou) pre ponuku právnych služieb.',
      'Právne služby ponúkané v aplikácii trama sú poskytované advokátskou kanceláriou Law & Tech s.r.o. so sídlom Rooseveltova 809/22, 040 01 Košice - Staré Mesto, Slovak Republic, IČO: 53 004 621, spoločnosť zapísaná v obchodnom registri Okresného súdu Košice I, oddiel: Sro, vložka číslo: 48484/V.',
      'Používateľ má právo použiť aplikáciu trama za účelom objednania Služieb ponúkaných na Internetovej adrese za cenu uvednú pri konkrétnej službe. Ak pri niektorej službe cena uvedená nie je, bude dohodnutá na základe vzájomnej dohody medzi Používateľom a Prevádzkovateľom.',
      'Cena uvedená pri Službe je konečná a Používateľovi nebudú účtované žiadne dodatočné poplatky, ibaže na to Prevádzkovateľ Používateľa výslovne vopred upozorní.',
    ],
  },
  {
    title: 'Vysvetlenie pojmov',
    list: [
      '<strong>"trama"</strong> znamená počítačový program (aplikácia) s názvom trama, ktorého súčasťou je internetová stránka dostupná z internetovej adresy;',
      '<strong>"Prevádzkovateľ"</strong> znamená spooločnosť Sparring s. r. o., so sídlom Radlinského 10, 811 07 Bratislava - Staré Mesto, Slovenská republika, IČO: 52 325 369, spoločnosť zapísaná v obchodnom registri Okresného súdu Bratislava I, oddiel: Sro, vložka číslo: 136950/B.',
      '<strong>"Advokátska kancelária"</strong> znamená advokátsku kanceláriu Law & Tech s.r.o. so sídlom Rooseveltova 809/22, 040 01 Košice - Staré Mesto a pracoviskom Jarková 14, 080 01 Prešov, Slovak Republic, IČO: 53 004 621, spoločnosť zapísaná v obchodnom registri Okresného súdu Košice I, oddiel: Sro, vložka číslo: 48484/V.',
      '<strong>"Pracovisko"</strong> znamená pracovisko advokátskej kancelárie Law & Tech s.r.o. na ulici Jarková 14, 080 01 Prešov, Slovak Republic, ktoré je zároveň adresov na doručovanie všetkých písomností určených Advokátskej kancelárii a Prevádzkovateľovi.',
      '<strong>"Používateľ"</strong> znamená každú fyzickú alebo právnickú osobu, ktorá používa aplikáciu trama;',
      '<strong>"Služba"</strong> znamená akúkoľvek službu zobrazujúcu sa Používateľovi v aplikácii trama;',
      '<strong>"Internetová adresa"</strong> znamená akúkoľvek internetovú adresu, z ktorej je dostupná aplikácia trama, najmä <a class="web-link" href="http://tramatm.com"><strong>tramatm.com</strong></a>.',
    ],
  },
  {
    title: 'Informácie pre spotrebiteľa',
    list: [
      'Adresa pre doručovanie písomností Prevádzkovateľovi a Advokátskej kancelárie je pracovisko Law & Tech s.r.o. na ulici Jarková 14, 080 01 Prešov, Slovak Republic;',
      'Telefonický kontakt Prevádzkovateľa je <a href="tel:+421 911 903 759"><strong>+421 911 903 759</strong></a>;',
      'Adresa Prevádzkovateľa pre doručovanie elektronickej pošty je <a href="mailto:hello@tramatm.com"><strong>hello@tramatm.com</strong></a>.',
    ],
  },
]

interface TermsAndConditionsProps {
  list: Array<string>
}

const TermsAndConditions = (props: TermsAndConditionsProps) => (
  <>
    {props.list.map((item, i) => (
      <li key={i} className="item">
        <span dangerouslySetInnerHTML={{__html: `${item}`}}></span>
      </li>
    ))}

    <style jsx>{`
      .item {
        font-size: 16px;
        line-height: 28px;
        position: relative;
        padding-left: 18px;
      }
      .item + .item {
        margin-top: 8px;
      }
      .item:before {
        content: '';
        position: absolute;
        width: 6px;
        height: 6px;
        background: #d2cbc6;
        border-radius: 50%;
        top: 8px;
        left: 0;
      }
    `}</style>
    <style jsx global>{`
      a {
        color: #000;
      }
      a.web-link {
        color: #e56a61;
      }
      a:hover {
        text-decoration: none;
      }
    `}</style>
  </>
)

const TermsAndConditionsList = () => (
  <div className="wrapper">
    {termsAndConditionsList.map((item, i) => (
      <div key={i} className="content">
        <h4 className="title">{item.title}</h4>
        <ul key={i} className="list">
          <TermsAndConditions list={item.list} />
        </ul>
      </div>
    ))}
    <style jsx>{`
      .wrapper {
        max-width: 660px;
        margin: 0 auto;
      }
      .content + .content {
        margin-top: 40px;
      }
      .title {
        font-weight: 800;
        font-size: 18px;
        line-height: 30px;
        margin-top: 0;
        margin-bottom: 24px;
        padding-left: 30px;
      }
      .list {
        padding-left: 0;
        margin: 0;
        list-style: none;
      }
    `}</style>
  </div>
)

export default TermsAndConditionsList
