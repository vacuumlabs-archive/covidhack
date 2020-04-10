import React from 'react'

const Banner = () => (
  <div className="banner">
    <div className="container">
      <span className="title">
        Úspešne sme pre Vás zaregistrovali už viac ako 150 ochranných známok.
      </span>
    </div>
    <style jsx>{`
      .banner {
        background-color: #e56a61;
        padding: 12px 0;
      }
      .title {
        display: block;
        font-size: 16px;
        line-height: 28px;
        font-weight: 800;
        color: #fff;
        text-align: center;
      }
    `}</style>
  </div>
)

export default Banner
