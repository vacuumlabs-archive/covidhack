import cn from 'classnames'
import React, {useState} from 'react'

const LegalFooter = () => {
  const [descriptionOpen, setDescriptionOpen] = useState(false)

  const setScrolling = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollTop + 180,
        left: 0,
      })
    }, 10)
  }

  const handleClick = () => {
    if (!descriptionOpen) {
      setDescriptionOpen(true)
      setScrolling()
    } else setDescriptionOpen(false)
  }

  return (
    <section className="legal-footer">
      <div className="container">
        <span className={cn('title', descriptionOpen && 'underline')} onClick={handleClick}>
          Legal notice
        </span>
        <div className={cn('wrapper', descriptionOpen && 'open')}>
          <p className="description">
            Právne služby spojené s registráciou ochrannej známky poskytuje advokátska kancelária
            Law & Tech s.r.o., so sídlom Rooseveltova 809/22, 040 01 Košice - Staré Mesto, Slovenská
            republika, IČO: 53 004 621. Law & Tech s.r.o. má potrebné poistenie zodpovednosti za
            škodu a je zapísaná v zozname Slovenskej advokátskej komory v súlade so zákonom č.
            586/2003 Z. z. o advokácii v znení neskorších predpisov. Kontaktnou adresou je
            pracovisko Law & Tech s.r.o. na ulici Jarková 14, 080 01 Prešov.
          </p>
          <p className="description">
            Softvér trama poskytuje spoločnosť Sparring s. r. o., so sídlom Radlinského 10, 811 07
            Bratislava - Staré Mesto, Slovenská republika, IČO: 52 325 369. Sparring s.r.o.
            neposkytuje právne poradenstvo ani sa nepodieľa na právnom zastúpení.
          </p>
        </div>
      </div>
      <style jsx>{`
        .legal-footer {
          background-color: #000;
          padding: 23px 0;
        }
        .container {
          width: 100%;
          max-width: 1090px;
          padding: 0 15px;
          margin: 0 auto;
        }
        .title {
          display: inline-block;
          font-size: 16px;
          line-height: 28px;
          font-weight: 800;
          letter-spacing: 0.02em;
          color: #fff;
          cursor: pointer;
        }
        .title:hover,
        .title:focus {
          text-decoration: underline;
          transition: all 0.1s linear;
        }
        .underline {
          text-decoration: underline;
        }
        .wrapper {
          display: none;
        }
        .open.wrapper {
          display: block;
        }
        .description {
          font-size: 14px;
          line-height: 22px;
          color: #fff;
          letter-spacing: 0.02em;
          text-align: justify;
          margin: 24px 0 0;
        }
      `}</style>
    </section>
  )
}

export default LegalFooter
