import React from 'react'

export interface DocHeaderProps {
  phoneNumber: string
  title: string
  protocolNumber: string
}

const DocHeader = ({phoneNumber, title, protocolNumber}: DocHeaderProps) => (
  <>
    <div className="block">
      <div>
        <strong>Úrad Verejného Zdravotníctva</strong>
      </div>
      <div>
        <strong>Slovenskej Republiky</strong>
      </div>
    </div>
    <div className="block">
      <div>
        <strong>Trnavská cesta 52</strong>
      </div>
      <div>
        <strong>P.O.BOX 45</strong>
      </div>
      <div>826 45 Bratislava</div>
    </div>
    <div className="block">
      <div>
        <strong>Odbor lekárskej mikrobiológie</strong>
      </div>
      <div>tel.: {phoneNumber}</div>
    </div>
    <div className="title">
      <div>
        <strong>{title}</strong>
      </div>
      <div>
        <strong>Protokol o skúške</strong>
      </div>
      <div>
        <strong>č. {protocolNumber}</strong>
      </div>
    </div>
    <style jsx>{`
      .block {
        margin-bottom: 1em;
        padding-left: 40px;
      }
      .title {
        margin-bottom: 1em;
        font-size: 16px;
        text-align: center;
      }
    `}</style>
  </>
)

export default DocHeader
