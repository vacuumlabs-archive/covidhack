import React from 'react'

const ServicesFee = (props) => (
  <>
    {props.national
      ? props.numberOfServices > 3 && (
          <div className="wrapper">
            <div className="title-wrapper">
              <span className="title">Cena za tovary a služby nad rámec základného poplatku</span>
              <span className="price">{props.servicesFee}&nbsp;EUR</span>
            </div>
            <span className="note">Počet tried v cene: 3 | Každá ďalšia trieda + 20 EUR</span>
          </div>
        )
      : props.european
      ? props.numberOfServices > 1 && (
          <div className="wrapper">
            <div className="title-wrapper">
              <span className="title">Cena za tovary a služby nad rámec základného poplatku</span>
              <span className="price">{props.servicesFee}&nbsp;EUR</span>
            </div>
            <span className="note">
              Počet tried v cene: 1 | Druhá trieda + 50 EUR a každá ďalšia trieda + 150 EUR
            </span>
          </div>
        )
      : props.numberOfServices > 0 && (
          <div className="wrapper">
            <span className="note international">
              Výsledná cena závisí aj od počtu zvolených tried. S výslednou cenou Vás kontaktuje náš
              právnik.
            </span>
          </div>
        )}
    <style jsx>{`
      .wrapper {
        margin-top: 24px;
        padding-top: 24px;
        border-top: 2px solid #fbf4ef;
      }
      .title-wrapper {
        margin-bottom: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .title {
        font-weight: 800;
        font-size: 16px;
        line-height: 28px;
      }
      .note {
        font-style: italic;
        font-size: 14px;
        line-height: 22px;
        color: #938e8a;
        padding-left: 24px;
        margin-top: 8px;
        position: relative;
        display: block;
      }
      .note:before {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        top: 2px;
        left: 0;
        background-image: url('/images/info.svg');
      }
      .note.international {
        margin-top: 0;
      }
      .price {
        font-weight: 800;
        font-size: 16px;
        line-height: 28px;
        color: #e56a61;
      }
    `}</style>
  </>
)

export default ServicesFee
