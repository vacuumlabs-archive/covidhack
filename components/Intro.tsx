import React from 'react'

const Intro = () => (
  <div className="intro">
    <div className="container">
      <div className="wrapper">
        <h2 className="title">Zaregistrujte si ochrannú známku v troch jednoduchých krokoch.</h2>
        <p className="subtitle">Vašu ochrannú známku overíme zadarmo do 48 hodín.</p>
        <img src="/images/ice_cream.svg" className="img" />
      </div>
    </div>
    <style jsx>{`
      .intro {
        padding: 80px 0 64px;
        display: flex;
        justify-content: center;
      }
      .wrapper {
        position: relative;
        max-width: 645px;
        margin: 0 auto;
      }
      .img {
        position: absolute;
        max-width: 220px;
        height: auto;
        right: -320px;
        bottom: -39px;
      }
      .title {
        font-size: 40px;
        line-height: 64px;
        font-weight: 800;
        text-align: center;
        margin-top: 0;
        margin-bottom: 24px;
      }
      .subtitle {
        font-size: 26px;
        line-height: 38px;
        text-align: center;
        font-style: italic;
        margin: 0;
      }
    `}</style>
  </div>
)

export default Intro
