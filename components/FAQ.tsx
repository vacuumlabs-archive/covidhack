import React from 'react'

const FAQ = ({faq, index, toggleFAQ}) => (
  <div className={'item ' + (faq.open ? 'open' : '')} key={index} onClick={() => toggleFAQ(index)}>
    <div className="wrapper">
      <div className="question">{faq.question}</div>
      <div className="icon"></div>
    </div>
    <div className="answer">{faq.answer}</div>
    <style jsx>{`
      .item {
        padding: 24px 8px;
        cursor: pointer;
      }
      .item:first-of-type {
        padding-top: 0;
      }
      .item + .item {
        border-top: 1px solid #d0cbc8;
      }
      .open .icon {
        transform: rotate(45deg);
      }
      .open .answer {
        visibility: visible;
        max-height: 1000px;
        padding-top: 24px;
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
        padding-left: 16px;
        max-width: 600px;
        user-select: none;
      }
      .icon {
        width: 20px;
        height: 20px;
        position: relative;
        right: 16px;
        background-image: url('/images/plus.svg');
        transition: all 0.3s ease;
      }
      .answer {
        visibility: hidden;
        max-height: 0;
        transition: all 0.3s ease;
        line-height: 28px;
        font-size: 16px;
        color: transparent;
        user-select: none;
      }
    `}</style>
  </div>
)

export default FAQ
