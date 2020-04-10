import React from 'react'
import Step from './Step'

const stepList = [
  {
    title: 'Overenie zadarmo',
    description:
      'Vyplníte formulár a odošlete nezáväznú objednávku. My <strong>overíme, či je možné známku registrovať</strong> a do 48 hodín Vás prostredníctvom emailu informujeme o výsledku.',
  },
  {
    title: 'Záväzná objednávka',
    description:
      'Ak overenie dopadne v poriadku, <strong>záväzne si objednáte registráciu</strong> Vašej známky a my Vám zašleme ďalší email s faktúrou a splnomocnením.',
  },
  {
    title: 'Žiadosť o registráciu',
    description:
      'Po úhrade faktúry a doručení podpísaného splnomocnenia <strong>advokátska kancelária podá žiadosť o registráciu</strong> ochrannej známky na príslušný úrad duševného vlastníctva.',
  },
]

const StepList = () => (
  <section className="steps" id="steps">
    <div className="container">
      <div className="wrapper">
        <img src="/images/girl.svg" className="img" alt="girl-reading-book" />
        <div className="content">
          <h3 className="title">Ako to funguje?</h3>
          <div className="step-list">
            {stepList.map((step, i) => (
              <Step title={step.title} description={step.description} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      .steps {
        padding-top: 120px;
      }
      .wrapper {
        display: flex;
        max-width: 1038px;
        margin: 0 auto;
      }
      .img {
        max-width: 351px;
        height: auto;
        position: relative;
        left: 22px;
      }
      .content {
        padding: 56px 74px 56px 117px;
        background-color: #fff;
        border: 4px solid #fbf4ef;
        position: relative;
        left: -21px;
      }
      .title {
        font-weight: 800;
        font-size: 28px;
        line-height: 30px;
        margin-top: 0;
        margin-bottom: 32px;
      }
      .step-list {
        display: flex;
        flex-direction: column;
      }
    `}</style>
  </section>
)

export default StepList
