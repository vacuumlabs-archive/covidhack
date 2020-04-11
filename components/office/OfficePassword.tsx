import {Button, TextField, Typography} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core/styles'
import {Form, Formik} from 'formik'
import React from 'react'
import {useDispatch} from 'react-redux'
import {changePassword} from '../../logic/actions'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: 'calc(100vh - 75px)',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: -100,
  },
  paper: {
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: '16px',
  },
})

const OfficePassword = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <div className={classes.root}>
      <Typography variant="h3" gutterBottom style={{textAlign: 'center'}}>
        Heslo kancelárie
      </Typography>
      <Paper className={classes.paper} style={{textAlign: 'center'}}>
        <Typography variant="body2" gutterBottom>
          Osobné údaje musia byť posielané na server zašifrované. Prosím, zadajte heslo kancelárie,
          ktoré sa použije na šifrovanie.
        </Typography>
        <Formik
          initialValues={{password: ''}}
          onSubmit={(values) => dispatch(changePassword(values.password))}
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
              <TextField
                name="password"
                value={values.password}
                onChange={handleChange}
                label="Heslo kancelárie"
                fullWidth
                error={!!errors.password}
                helperText={errors.password}
              />
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
      </Paper>
    </div>
  )
}

export default OfficePassword
