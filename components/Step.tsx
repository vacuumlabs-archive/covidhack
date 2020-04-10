import React from 'react'

interface StepProps {
  title: string
  description: string
}

const Step = (props: StepProps) => (
  <div className="item">
    <h4 className="title">{props.title}</h4>
    <p className="description" dangerouslySetInnerHTML={{__html: `${props.description}`}}></p>

    <style jsx>{`
      .item {
        position: relative;
      }
      .item + .item {
        margin-top: 40px;
      }
      .item:nth-of-type(2):before {
        content: '';
        position: absolute;
        background-repeat: no-repeat;
        background-position: center top;
        background-image: url('/images/arrow.svg');
        width: 30px;
        height: 80px;
        left: -53px;
        top: -83px;
      }
      .item:nth-of-type(2):after {
        content: '';
        position: absolute;
        background-repeat: no-repeat;
        background-position: center top;
        background-image: url('/images/arrow.svg');
        width: 30px;
        height: 80px;
        right: -5px;
        top: 101px;
        transform: scale(-1, 1);
      }
      .title {
        font-weight: 800;
        font-size: 26px;
        line-height: 38px;
        margin-top: 0;
        margin-bottom: 16px;
        color: #e56a61;
      }
      .description {
        font-size: 16px;
        line-height: 28px;
        margin: 0;
      }
    `}</style>
  </div>
)

export default Step
