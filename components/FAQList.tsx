import Link from 'next/link'
import React, {useState} from 'react'
import FAQ from './FAQ'

const faqsList = [
  {
    question: 'Čo je ochranná známka?',
    answer:
      'Ochrannou známkou je najmä slovné, obrazové alebo kombinované označenie, ktoré je spôsobilé odlíšiť tovary alebo služby jednej osoby od tovarov alebo služieb inej osoby. Ide o označenie používané v obchode na základe ktorého zákazníci identifikujú určité výrobky ako Vaše. Ochranná známka je súčasťou Vášho duševného vlastníctva a sumarizuje vaše hodnoty. Možno je rozhodujúca pre váš úspech v podnikaní, keďže odlišuje vaše produkty od konkurencie. Ak si dáte svoju ochrannú známku zapísať, môžete ju chrániť a ďalej na nej budovať Vašu značku. Spolu s ochrannou známkou ste oprávnený používať značku ®.',
    open: true,
  },
  {
    question: 'Aké označenie môže tvoriť ochrannú známku?',
    answer:
      'Ochrannú známku môže tvoriť akékoľvek označenie, ktoré možno graficky znázorniť a ktoré tvoria najmä slová vrátane osobných mien, písmená, číslice, kresby, tvar tovaru alebo jeho obal, prípadne ich vzájomné kombinácie spôsobilé rozlíšiť tovary alebo služby jednej osoby od tovarov alebo služieb inej osoby.',
    open: false,
  },
  {
    question: 'Aký je význam ochrannej známky?',
    answer:
      'Ochranná známka je súčasťou Vášho duševného vlastníctva a sumarizuje vaše hodnoty. Celá hodnota značky: jej filozofia, hodnoty, know-how, zamestnanci, produkty, nehmotný majetok sú zhrnuté do ochrannej známky. Zapísaná ochranná známka je spôsob vyjadrenia investícií, ktoré ste do svojej značky vložili. Táto hodnota môže rásť alebo klesať v závislosti od trhových síl a úspechu vašej spoločnosti a jej produktov. Vaša ochranná známka môže podliehať auditu; jej hodnota je súčasťou majetku spoločnosti. Na ochranné známky možno udeliť licenciu, predať ich alebo môžu byť predmetom záložného práva.',
    open: false,
  },
]

const FAQList = () => {
  const [faqs, setfaqs] = useState(faqsList)

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
    <section className="faq" id="faq">
      <div className="container">
        <div className="wrapper">
          <div className="content">
            {faqs.map((faq, i) => (
              <FAQ faq={faq} key={i} index={i} toggleFAQ={toggleFAQ} />
            ))}
            <div className="btn-wrapper">
              <Link href="/faq">
                <a className="btn">Pozrieť viac</a>
              </Link>
            </div>
          </div>
          <div className="sidebar">
            <h4 className="title">Potrebujete poradiť s registráciou ochrannej známky?</h4>
            <a href="mailto:hello@tramatm.com" className="link">
              hello@tramatm.com
            </a>
            <div className="img-wrapper">
              <img src="/images/dog.svg" alt="dog" className="img" />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .faq {
          padding: 120px 0 160px;
        }
        .wrapper {
          display: flex;
          position: relative;
        }
        .content {
          padding: 56px;
          background: #fbf4ef;
          width: 640px;
        }
        .btn-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 24px;
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
        .sidebar {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          margin-left: 32px;
          position: relative;
        }
        .title {
          font-weight: 800;
          font-size: 26px;
          line-height: 38px;
          text-align: center;
          max-width: 377px;
          margin-top: 0;
          margin-bottom: 24px;
        }
        .link {
          color: #e56a61;
          font-weight: 800;
          font-size: 26px;
          line-height: 38px;
          text-decoration: none;
          text-align: center;
        }
        .img-wrapper {
          position: relative;
          text-align: right;
        }
        .img {
          max-width: 226px;
          height: auto;
          margin-top: 48px;
          position: relative;
          bottom: -8px;
          right: -13px;
        }
      `}</style>
    </section>
  )
}

export default FAQList
