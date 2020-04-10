import React, {useState} from 'react'
import FAQsAll from '../components/FAQsAll'
import Layout from '../components/Layout'

const allFaqsList = [
  {
    question: 'Čo je ochranná známka?',
    answer:
      'Ochrannou známkou je najmä slovné, obrazové alebo kombinované označenie, ktoré je spôsobilé odlíšiť tovary alebo služby jednej osoby od tovarov alebo služieb inej osoby. Ide o označenie používané v obchode na základe ktorého zákazníci identifikujú určité výrobky ako Vaše. Ochranná známka je súčasťou Vášho duševného vlastníctva a sumarizuje vaše hodnoty. Možno je rozhodujúca pre váš úspech v podnikaní, keďže odlišuje vaše produkty od konkurencie. Ak si dáte svoju ochrannú známku zapísať, môžete ju chrániť a ďalej na nej budovať Vašu značku. Spolu s ochrannou známkou ste oprávnený používať značku ®.',
    open: true,
  },
  {
    question: 'Aký je význam ochrannej známky?',
    answer:
      'Ochranná známka je súčasťou Vášho duševného vlastníctva a sumarizuje vaše hodnoty. Celá hodnota značky: jej filozofia, hodnoty, know-how, zamestnanci, produkty, nehmotný majetok sú zhrnuté do ochrannej známky. Zapísaná ochranná známka je spôsob vyjadrenia investícií, ktoré ste do svojej značky vložili. Táto hodnota môže rásť alebo klesať v závislosti od trhových síl a úspechu vašej spoločnosti a jej produktov. Vaša ochranná známka môže podliehať auditu; jej hodnota je súčasťou majetku spoločnosti. Na ochranné známky možno udeliť licenciu, predať ich alebo môžu byť predmetom záložného práva.',
    open: false,
  },
  {
    question: 'Aké označenie môže tvoriť ochrannú známku?',
    answer:
      'Ochrannú známku môže tvoriť akékoľvek označenie, ktoré možno graficky znázorniť a ktoré tvoria najmä slová vrátane osobných mien, písmená, číslice, kresby, tvar tovaru alebo jeho obal, prípadne ich vzájomné kombinácie spôsobilé rozlíšiť tovary alebo služby jednej osoby od tovarov alebo služieb inej osoby',
    open: false,
  },
  {
    question:
      'Na akú dobu platí ochranná známka, a čo je potrebné urobiť pre obnovenie jej platnosti?',
    answer:
      'Platnosť zápisu ochrannej známky je desať rokov odo dňa podania prihlášky. Na základe žiadosti majiteľa ochrannej známky alebo záložného veriteľa (podanej najskôr v poslednom roku platnosti jej zápisu, nie však neskôr ako 6 mesiacov po uplynutí platnosti) úrad platnosť zápisu ochrannej známky obnoví na ďalších desať rokov. Spolu so žiadosťou je potrebné zaplatiť správny poplatok podľa zákona č. 145/1995 Z. z. o správnych poplatkoch v znení neskorších predpisov na účet úradu.',
    open: false,
  },
  {
    question:
      'Ak je nejaké slovo alebo označenie chránené ochrannou známkou, bude toto slovo alebo označenie chránené pred používaním iným subjektom?',
    answer:
      'Bez súhlasu majiteľa ochrannej známky nesmú tretie osoby v obchodnom styku používať označenie zhodné alebo podobné s jeho ochrannou známkou pre zhodné alebo podobné tovary alebo služby, pre ktoré je ochranná známka zapísaná, z dôvodu existencie pravdepodobnosti zámeny na strane verejnosti. Majiteľ ochrannej známky je oprávnený používať spolu s ochrannou známkou značku ®. Spory z ochranných známok prerokúvajú a rozhodujú súdy. Ak došlo k neoprávnenému zásahu do práv z ochrannej známky, majiteľ ochrannej známky má právo domáhať sa, aby porušenie alebo ohrozenie práva bolo zakázané a následky tohto zásahu boli odstránené; môže sa domáhať primeraného zadosťučinenia, ktorým môže byť aj peňažné plnenie.',
    open: false,
  },
  {
    question:
      'Môže majiteľ ochrannej známky uplatniť svoje práva aj vo vzťahu k používaniu internetovej domény?',
    answer:
      'Áno, a to na území, pre ktoré je ochranná známka zapísaná, ak označenie internetovej domény je zhodné, prípadne podobné s ochrannou známkou zapísanou v registri ochranných známok a ak používanie internetovej domény je spojené s označovaním tovarov alebo služieb, pre ktoré je predmetná ochranná známka zapísaná v registri ochranných známok. Nadobúdanie doménových mien a ich používanie nie je regulované štátom, nemáme verejný register doménových mien. V oblasti doménových mien platí princíp práva prednosti - priority. V celej sieti doménových mien nemôžu existovať dve rovnaké doménové mená. Za kolidujúce s právom majiteľa ochrannej známky sa považuje také doménové meno, v ktorom je použité slovo, ktoré je dominantným prvkom ochrannej známky zapísanej v registri ochranných známok na Slovensku alebo medzinárodne chránenej ochrannej známky či ochrannej známky Európskej únie.',
    open: false,
  },
  {
    question:
      'Je možné ochrániť obchodné meno spoločnosti ochrannou známkou? Ako je potrebné postupovať?',
    answer:
      'Obchodné meno je možné ochrániť ochrannou známkou ako označenie, ktoré bude používané na výrobkoch, reklamných materiáloch, prípadne vo vzťahu k poskytovaným službám. Je potrebné podať žiadosť o zápis ochrannej známky do registra, kde sa spolu s požadovaným vyobrazením/znením uvedie zoznam tovarov a služieb chránený týmto označením. Obchodné meno je názov, pod ktorým podnikateľ vykonáva právne úkony v rámci svojej podnikateľskej činnosti a ktorým sa zároveň odlišuje od iných osôb. Je vždy spojené s označovaným subjektom (fyzická alebo právnická osoba) a vzniká a zaniká spolu s ňou. Právna úprava obchodného mena je zakotvená v zákone č. 513/1991 Zb. Obchodný zákonník. Zápis obchodného mena do obchodného registra nespadá do kompetencie úradu. Funkciou obchodného mena je odlíšiť rôznych podnikateľov, no hlavnou funkciou ochrannej známky je rozlíšiť tovary alebo služby pochádzajúce od rôznych subjektov, t. j. identifikovať tovary alebo služby jednej osoby vo vzťahu k tovarom alebo službám iných osôb v očiach spotrebiteľskej verejnosti.',
    open: false,
  },
  {
    question:
      'Akým spôsobom sa zatrieďujú tovary a služby, ktoré je nutné uviesť do žiadosti o zápis ochrannej známky?',
    answer:
      'Keďže hlavnou funkciou ochrannej známky je rozlíšiť tovary a služby pochádzajúce od rôznych subjektov, je potrebné do žiadosti o zápis ochrannej známky do registra uviesť konkrétne tovary alebo služby, pre ktoré má byť ochranná známka zapísaná. Zoznam tovarov a služieb je potrebné vypracovať podľa Medzinárodného triednika výrobkov a služieb na účely registrácie ochrannej známky.',
    open: false,
  },
  {
    question:
      'Môžem po podaní prihlášky žiadať o pridanie ďalšej triedy do zoznamu tovarov a služieb?',
    answer:
      'Pôvodný zoznam tovarov a služieb, ktorý je súčasťou prihlášky ochrannej známky, nie je možné rozšíriť, iba obmedziť. Inými slovami, do už podanej prihlášky nie je možné pridávať ďalšie tovary alebo služby. Prípadnú potrebu chrániť ochrannou známkou ďalšie tovary alebo služby (nezahrnuté v registrovanej OZ) možno riešiť jedine podaním novej prihlášky OZ.',
    open: false,
  },
  {
    question:
      'Je možné požiadať o ochranu dvoch rôznych označení v jednej žiadosti o zápis ochrannej známky?',
    answer:
      'Nie je to možné, pretože v zmysle zákona č. 506/2009 Z. z. o ochranných známkach prihláška ochrannej známky sa môže týkať len jedného označenia.',
    open: false,
  },
  {
    question:
      'Aký je základný rozdiel medzi ochrannou známkou Európskej únie a medzinárodnou ochrannou známkou?',
    answer:
      'Ochranná známka Európskej únie poskytuje ochranu v rámci jednotného územia štátov Európskej únie, pričom prihláška takejto ochrannej známky sa podáva v EUIPO v Alicante. V prípade jej zápisu do registra ochranných známok EUIPO trvá jej ochrana 10 rokov od dátumu podania prihlášky, a je možné ju obnoviť každých 10 rokov. Medzinárodná ochranná známka spĺňa potreby tých prihlasovateľov, ktorí potrebujú ochrániť svoje označenie aj na území štátov mimo Európskej únie, v Zmluvných krajinách Madridskej únie. Žiadosť o medzinárodný zápis sa podáva na Úrad priemyselného vlastníctva SR. Prihlasovateľ si v žiadosti označí štáty, v ktorých požaduje ochranu, pričom neskôr je možné žiadať o rozšírenie ochrany aj v ďalších krajinách Madridského systému. Každá krajina preskúma prihlášku podľa vlastnej legislatívy a na základe posúdenia rozhodne o priznaní alebo odmietnutí ochrany. Platnosť medzinárodnej ochrannej známky je 10 rokov od zápisu, a je možné ju obnoviť každých 10 rokov.',
    open: false,
  },
]

const FAQpage = () => {
  const [faqs, setfaqs] = useState(allFaqsList)

  const toggleFAQ = (index) => {
    setfaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open
        }

        return faq
      }),
    )
  }

  return (
    <>
      <Layout isLandingPage>
        <div className="container">
          <img src="/images/swinging.svg" alt="swinging" className="img" />
          <div className="content">
            <h3 className="title">Často kladené otázky</h3>
            {faqs.map((faq, i) => (
              <FAQsAll faq={faq} key={i} index={i} toggleFAQ={toggleFAQ} />
            ))}
          </div>
        </div>
      </Layout>
      <style jsx>{`
        .content {
          padding: 80px 0 160px;
        }
        .title {
          font-weight: 800;
          font-size: 26px;
          line-height: 38px;
          text-align: center;
          margin: 0 auto;
          margin-top: 0;
          margin-bottom: 64px;
          max-width: 560px;
        }
        .img {
          max-width: 190px;
          height: auto;
          position: absolute;
          bottom: 480px;
          left: -278px;
        }
      `}</style>
      <style jsx global>{`
        body {
          background-color: #fdfcfc;
        }
        .container {
          max-width: 710px;
          position: relative;
        }
      `}</style>
    </>
  )
}

export default FAQpage
