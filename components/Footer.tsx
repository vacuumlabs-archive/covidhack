import React from 'react'
import FormFooter from './FormFooter'
import LegalFooter from './LegalFooter'
import PreFooter from './PreFooter'

interface FooterProps {
  isLandingPage?: boolean
}

const Footer = (props: FooterProps) => (
  <footer>
    {props.isLandingPage ? (
      <>
        <PreFooter />
        <LegalFooter />
      </>
    ) : (
      <FormFooter />
    )}
    <style jsx>{`
      footer {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 120px;
      }
    `}</style>
  </footer>
)

export default Footer
