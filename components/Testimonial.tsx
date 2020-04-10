import React, {useEffect, useState} from 'react'
import {CSSTransition} from 'react-transition-group'

const testimonialList = [
  {
    src: '/images/testimonial/vacuumlabs.jpg',
    alt: 'vacuumlabs',
    quote:
      'Trama mení spôsob, akým sa v Európe registrujú ochranné známky. Je prístupnejšia, lacnejšia a pripravená pre plne digitálny zážitok. Som veľmi rád, že sme sa mohli podieľať na vývoji tohto produktu.',
    author: 'Matej Ftáčnik - zakladateľ&nbsp; Vacuumlabs',
  },

  {
    src: '/images/testimonial/lubive.jpg',
    alt: 'lubive',
    quote:
      'Proces registrácie ochrannej známky bol pre nás španielska dedina. Preto sme radi, že sme mohli prostredníctvom aplikácie Trama hravo požiadať o ochranú známku pre našu značku ľúbivé. Všetko prebehlo hladko, stačilo iba pár klikov.',
    author: 'Veronika Svinčáková - zakladateľka ľúbivé',
  },
  {
    src: '/images/testimonial/bbsk.jpg',
    alt: 'bbsk',
    quote:
      'Ďakujeme veľmi pekne za rýchlu a perfektnú pomoc pri registrácii ochrannej známky. Fakt skvelá robota, som pyšná na vaše pokrokové služby.',
    author: 'JUDr. Gabriela Stopková – riaditeľka, Rozvojová agentúra BBSK, n.o.',
  },
  {
    src: '/images/testimonial/legito.jpg',
    alt: 'legito',
    quote: 'Konečne advokáti, ktorí sa neboja nových technológií. Skvelá spolupráca.',
    author: 'Ondřej Materna - CEO, Legito',
  },
]

const Quote = (props) => {
  return (
    <>
      <CSSTransition in={props.inAnimation} timeout={900} classNames="quote-wrapper">
        <div className="content">
          <div className="img-wrapper">
            <img src={props.src} alt={props.alt} className="img" />
          </div>
          <p className="quote-text">{props.quote}</p>
          <span
            className="quote-author"
            dangerouslySetInnerHTML={{__html: `${props.author}`}}
          ></span>
        </div>
      </CSSTransition>
      <style jsx>{`
        .content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 520px;
          min-height: 286px;
        }
        .img-wrapper {
          background: #fff;
          display: flex;
          justify-content: center;
          border-radius: 50%;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
        }
        .img {
          width: 104px;
          height: 104px;
          object-fit: cover;
          border-radius: 50%;
        }
        .quote-text {
          font-size: 16px;
          line-height: 28px;
          font-style: italic;
          text-align: center;
          margin-top: 32px;
          margin-bottom: 16px;
          max-width: 495px;
          min-height: 112px;
          display: flex;
          align-items: center;
        }
        .quote-author {
          font-size: 14px;
          line-height: 22px;
          text-align: center;
          max-width: 435px;
          min-height: 44px;
          display: flex;
          align-items: center;
        }
      `}</style>
      <style jsx global>{`
        .quote-wrapper-enter {
          opacity: 0;
        }
        .quote-wrapper-enter-active {
          opacity: 1;
          transition: opacity 700ms;
        }
        .quote-wrapper-exit {
          opacity: 1;
        }
        .quote-wrapper-exit-active {
          opacity: 0;
          transition: opacity 700ms;
        }
      `}</style>
    </>
  )
}

const Testimonial = () => {
  const [index, setIndex] = useState(0)
  const length = testimonialList.length - 1
  const current = testimonialList[index]
  const [inAnimation, setInAnimation] = useState(false)

  const handleNext = () => {
    index === length ? setIndex(0) : setIndex(index + 1)
    setInAnimation(true)
  }

  const handlePrevious = () => {
    index === 0 ? setIndex(length) : setIndex(index - 1)
    setInAnimation(true)
  }

  const showNext = () => {
    setTimeout(() => {
      setInAnimation(false)
      handleNext()
    }, 1)
  }

  const showPrevious = () => {
    setTimeout(() => {
      setInAnimation(false)
      handlePrevious()
    }, 1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setInAnimation(false)
      index === length ? setIndex(0) : setIndex(index + 1)
      setInAnimation(true)
    }, 5000)
    return () => clearInterval(interval)
  })

  return (
    <div className="references" id="references">
      <div className="container">
        <div className="wrapper">
          <img
            src="/images/chevron_left.svg"
            alt="chevron-left"
            className="chevron chevron-left"
            onClick={() => showPrevious()}
          />
          <Quote
            src={current.src}
            alt={current.alt}
            quote={current.quote}
            author={current.author}
            inAnimation={inAnimation}
          />
          <img
            src="/images/chevron_left.svg"
            alt="chevron-right"
            className="chevron chevron-right"
            onClick={() => showNext()}
          />
        </div>
      </div>
      <style jsx>{`
        .references {
          padding-top: 80px;
        }
        .wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .chevron {
          cursor: pointer;
          width: 24px;
          height: 24px;
          position: relative;
        }
        .chevron-left {
          left: -109px;
        }
        .chevron-right {
          transform: rotate(180deg);
          right: -109px;
        }
      `}</style>
    </div>
  )
}

export default Testimonial
