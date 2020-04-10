import React from 'react'

const cookiesList = [
  {
    title: 'Súbory cookie',
    list: [
      'S cieľom zabezpečiť riadne fungovanie tejto webovej lokality ukladáme niekedy na vašom zariadení malé dátové súbory, tzv. cookie. Je to bežná prax väčšiny veľkých webových lokalít.',
    ],
  },
  {
    title: 'Čo sú súbory cookie?',
    list: [
      'Súbor cookie je malý textový súbor, ktorý webová lokalita ukladá vo vašom počítači alebo mobilnom zariadení pri jej prehliadaní. Vďaka tomuto súboru si webová lokalita na určitý čas uchováva informácie o vašich krokoch a preferenciách (ako sú prihlasovacie meno, jazyk, veľkosť písma a iné nastavenia zobrazovania), takže ich pri ďalšej návšteve lokality alebo prehliadaní jej jednotlivých stránok nemusíte opätovne uvádzať.',
    ],
  },
  {
    title: 'Cookie a EÚ legislatíva',
    list: [
      'Zákon hovorí, že môžeme ukladať súbory cookie na vašom zariadení, ak sú nevyhnutné pre prevádzku týchto stránok. Pri všetkých ostatných typoch súborov cookie potrebujeme váš súhlas. Táto stránka používa rôzne typy cookies. Niektoré cookies sú tu umiestnené službami tretích strán, ktoré sa objavujú na našich stránkach. Svoj súhlas môžete kedykoľvek zmeniť alebo odvolať na našej webovej stránke.',
    ],
  },
  {
    title: 'Ako používame súbory cookie?',
    list: [
      'Tieto webstránky používajú súbory cookies na zhromažďovanie anonymných štatistických informácií o návštevníkoch, zapamätanie si používateľských nastavení, pre lepšie prispôsobenie reklám záujmom návštevníkov a pre nevyhnutnú funkcionalitu webstránok. Súbory cookie sa nebudú používať na iný účel ako je uvedený. Udelený súhlas s cookie sa dá jednoducho odobrať pomocou nastavení vyššie na tejto stránke.',
    ],
  },
  {
    title: 'Ako kontrolovať súbory cookie?',
    list: [
      'Súbory cookie môžete kontrolovať a/alebo zmazať podľa uváženia – podrobnosti si pozrite na stránke aboutcookies.org. Môžete vymazať všetky súbory cookie uložené vo svojom počítači a väčšinu prehliadačov môžete nastaviť tak, aby ste im znemožnili ich ukladanie. V takomto prípade však pravdepodobne budete musieť pri každej návšteve webovej lokality manuálne upravovať niektoré nastavenia a niektoré služby a funkcie nebudú fungovať.',
    ],
  },
]

interface CookiesProps {
  list: Array<string>
}

const Cookie = (props: CookiesProps) => (
  <>
    {props.list.map((item, i) => (
      <p key={i} className="item">
        {item}
      </p>
    ))}

    <style jsx>{`
      .item {
        font-size: 16px;
        line-height: 28px;
        margin: 0;
      }
    `}</style>
  </>
)

const CookiesList = () => (
  <div className="wrapper">
    <img src="/images/ice_cream.svg" alt="ice-cream" className="img" />
    {cookiesList.map((item, i) => (
      <div key={i} className="content">
        <h4 className="title">{item.title}</h4>
        <Cookie list={item.list} />
      </div>
    ))}
    <style jsx>{`
      .wrapper {
        margin: 64px auto;
        max-width: 640px;
        position: relative;
      }
      .content + .content {
        margin-top: 40px;
      }
      .title {
        font-weight: 800;
        font-size: 18px;
        line-height: 30px;
        margin-top: 0;
        margin-bottom: 16px;
        padding-left: 20px;
      }
      .img {
        position: absolute;
        max-width: 170px;
        height: auto;
        top: 291px;
        left: -268px;
      }
    `}</style>
  </div>
)

export default CookiesList
