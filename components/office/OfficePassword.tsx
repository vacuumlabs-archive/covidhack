import {Button, TextField, Typography} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import {Form, Formik} from 'formik'
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import useSWR from 'swr'
import {changePassword} from '../../logic/actions'
import {decrypt, encrypt} from '../../logic/crypto'
import {Password_Test} from '../../utils/graphqlSdk'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: 'calc(100vh - 75px)',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: -100,
  },
  paper: {
    maxWidth: 500,
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: '16px',
  },
})

const createFetcher = (url) => fetch(url).then((r) => r.json())

const DECRYPTED_PASSWORD_TEST_VALUE = 'password test'

const OfficePassword = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [error, setError] = useState('')

  // TODO: error handling
  const {data, error: passwordFetchError} = useSWR<Password_Test[]>(
    `/api/get-password-test`,
    createFetcher,
  )
  if (!data) return null

  return (
    <div className={classes.root}>
      <Typography variant="h3" gutterBottom style={{textAlign: 'center'}}>
        Heslo kancelárie
      </Typography>
      <Paper className={classes.paper} style={{textAlign: 'center'}}>
        {/* We hope (and rely on) that users will not try to set the initial password concurrently. */}
        {data.length > 0 && (
          <Alert severity="info">
            Osobné údaje sú posielané na server zašifrované. Prosím, zadajte heslo kancelárie, ktoré
            ste zadali pri prvom použití aplikácie.
          </Alert>
        )}
        {data.length === 0 && (
          <Alert severity="warning">
            Kancelária musí citlivé údaje zašifrovať. Prosím zvoľte heslo, ktoré bude použité na
            encypciu citlivých údajov.
          </Alert>
        )}
        <Formik
          initialValues={{password: '', passwordRepeat: ''}}
          onSubmit={async (values) => {
            if (data.length > 0) {
              let decrypted
              try {
                decrypted = await decrypt(data[0].encrypted_test_phrase, values.password)
              } catch (e) {
                decrypted = null
              }

              console.log(decrypted)

              if (decrypted === DECRYPTED_PASSWORD_TEST_VALUE) {
                dispatch(changePassword(values.password))
              } else {
                setError('Nesprávne heslo')
              }
            } else {
              if (values.password === values.passwordRepeat) {
                await fetch('/api/set-test-password-phrase', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    encryptedTestPhrase: await encrypt(
                      DECRYPTED_PASSWORD_TEST_VALUE,
                      values.password,
                    ),
                  }),
                })
                dispatch(changePassword(values.password))
              } else {
                setError('Heslá sa nezhodujú')
              }
            }
          }}
          validate={(values) => {
            const errors = {} as any
            if (!values.password) {
              errors.password = 'Heslo nemôže byť prázdne'
            }
            return errors
          }}
        >
          {({values, handleChange, errors}) => (
            <Form>
              {/* To prevent material UI warning */}
              <input
                type="text"
                id="username"
                name="username"
                style={{display: 'none'}}
                autoComplete="userName"
              />
              <TextField
                style={{marginTop: 8}}
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                label="Heslo"
                fullWidth
                error={!!errors.password}
                helperText={errors.password}
                autoComplete={data.length === 0 ? 'new-password' : 'current-password'}
              />
              {data.length === 0 && (
                <TextField
                  style={{marginTop: 8}}
                  type="password"
                  name="passwordRepeat"
                  value={values.passwordRepeat}
                  onChange={handleChange}
                  label="Zopakujte heslo"
                  fullWidth
                  error={!!errors.passwordRepeat}
                  helperText={errors.passwordRepeat}
                  autoComplete="new-password"
                />
              )}

              <Button
                style={{marginTop: 8}}
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        {error && (
          <Alert severity="error" style={{marginTop: 8}}>
            {error}
          </Alert>
        )}
      </Paper>
    </div>
  )
}

export default OfficePassword
