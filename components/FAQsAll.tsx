import React from 'react'

const FAQsAll = ({faq, index, toggleFAQ}) => (
  <div className={'item ' + (faq.open ? 'open' : '')} key={index} onClick={() => toggleFAQ(index)}>
    <div className="wrapper">
      <div className="question">{faq.question}</div>
      <div className="icon"></div>
    </div>
    <div className="answer">{faq.answer}</div>
    <style jsx>{`
      .item {
        padding: 24px 0;
        cursor: pointer;
        margin: 0 18px;
      }
      .item:first-of-type {
        padding-top: 0;
      }
      .item + .item {
        border-top: 2px solid #fbf4ef;
      }
      .item.open {
        padding-bottom: 24px;
      }
      .open .icon {
        transform: rotate(45deg);
      }
      .open .answer {
        max-height: 1000px;
        padding-top: 24px;
        visibility: visible;
        font-size: 16px;
        line-height: 28px;
        color: #000;
      }
      .wrapper {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .question {
        font-weight: 800;
        font-size: 18px;
        line-height: 30px;
        max-width: 600px;
      }
      .icon {
        width: 20px;
        height: 20px;
        position: relative;
        right: 0;
        background-image: url('/images/plus.svg');
        transition: all 0.3s ease;
      }
      .answer {
        visibility: hidden;
        max-height: 0;
        transition: all 0.3s ease;
        line-height: 28px;
        font-size: 16px;
        margin-left: -18px;
        margin-right: -18px;
        color: transparent;
        user-select: none;
      }
    `}</style>
  </div>
)

export default FAQsAll
