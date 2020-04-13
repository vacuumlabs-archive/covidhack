import React from 'react'
import {Button} from '@material-ui/core'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'

const WrongPassword = () => (
  <>
    <div className="container">
      <div className="error">
        <ErrorOutlineIcon color="secondary" fontSize="inherit" />{' '}
        Chyba pri načítavaní údajov, pravdepodobne nespravné heslo kancelárie
      </div>
      <Button variant="contained" color="primary" onClick={() => window.location.reload(false)}>
        Skúsiť znova
      </Button>
    </div>
    <style jsx>{`
      .container {
        margin: auto;
        text-align: center;
      }
      .error {
        height: 50px;
        margin: 8px;
        background-color: rgb(253, 236, 234);
        color: rgb(97, 26, 21);
        font-size: 19px;
        font-weight: bold;
        line-height: 50px;
        vertical-align: middle;
      }
    `}</style>
  </>
)

export default WrongPassword
