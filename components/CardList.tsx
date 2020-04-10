import React from 'react'
import Card from '../components/Card'

const cardList = [
  {
    labels: ['Platnosť 10 rokov', 'Overenie do 48 hodín'],
    title: 'Národná ochranná známka',
    subtitle:
      'Chráňte svoju firmu a produkty v <strong>Slovenskej</strong> alebo <strong>Českej republike,</strong> prípadne v <strong>oboch krajinách súčasne.</strong>',
    price: 'od 295',
    currency: 'EUR',
    description: 'Cena za registráciu ochrannej známky, vrátane všetkých poplatkov',
    category: 'national',
  },
  {
    labels: ['Platnosť 10 rokov', 'Overenie do 48 hodín'],
    title: 'Európska ochranná známka',
    subtitle:
      'Získajte ochranu vo <strong>všetkých členských štátoch EÚ</strong> vrátane Slovenskej a Českej republiky za jeden poplatok.',
    price: 'od 1299',
    currency: 'EUR',
    description: 'Cena za registráciu ochrannej známky, vrátane všetkých poplatkov',
    category: 'european',
  },
  {
    labels: ['Konzultácia zadarmo'],
    title: 'Medzinárodná ochranná známka',
    subtitle:
      'Chráňte svoj biznis <strong>v USA a ďalších štátoch po celom svete.</strong> Pre kombináciu USA a EÚ vyberte túto možnosť.',
    price: 'od 1499',
    currency: 'EUR',
    description: 'Cena závisí od počtu štátov a počtu a druhu vybraných tovarov a služieb',
    category: 'international',
  },
]

const CardList = () => (
  <div className="container">
    <div className="wrapper">
      {cardList.map((card, i) => (
        <Card
          key={i}
          labels={card.labels}
          title={card.title}
          subtitle={card.subtitle}
          price={card.price}
          currency={card.currency}
          description={card.description}
          href={{pathname: '/verification', query: {category: card.category}}}
        />
      ))}
    </div>
    <style jsx>{`
      .wrapper {
        display: flex;
        justify-content: space-between;
      }
    `}</style>
  </div>
)

export default CardList
