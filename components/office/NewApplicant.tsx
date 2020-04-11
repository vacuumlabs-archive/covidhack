import {Button, Dialog, DialogActions, DialogTitle, TextField} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import {Form, Formik} from 'formik'
import React from 'react'
import {useDispatch} from 'react-redux'
import * as Yup from 'yup'
import {createNewApplicant} from '../../logic/actions'

const useStyles = makeStyles({
  dialog: {maxWidth: 450, padding: 24},
  formField: {marginBottom: '8px !important'},
})

type Props = any

const NewApplicant = ({open, setOpen}: Props) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        classes={{paperScrollPaper: classes.dialog}}
      >
        <DialogTitle style={{textAlign: 'center'}}>Údaje o novom žiadeťeľovi</DialogTitle>
        <Formik
          initialValues={{
            pacient: '',
            personalNumber: '',
            sampleCollectionDate: '',
            sampleReceiveDate: '',
            sampleCode: '',
            sender: '',
          }}
          onSubmit={(values) => dispatch(createNewApplicant())}
          validationSchema={Yup.object({
            pacient: Yup.string().required('Toto pole nesmie byť prázdne'),
            personalNumber: Yup.string().required('Toto pole nesmie byť prázdne'),
            sampleCollectionDate: Yup.string().required('Toto pole nesmie byť prázdne'),
            sampleReceiveDate: Yup.string().required('Toto pole nesmie byť prázdne'),
            sampleCode: Yup.string().required('Toto pole nesmie byť prázdne'),
            sender: Yup.string().required('Toto pole nesmie byť prázdne'),
          })}
        >
          {({values, handleChange, errors, touched}) => (
            <Form>
              <TextField
                className={classes.formField}
                name="sender"
                value={values.sender}
                onChange={handleChange}
                label="Odosielateľ (meno, adresa, tel. číslo)"
                fullWidth
                error={touched.sender && !!errors.sender}
                helperText={touched.sender && errors.sender}
              />

              <TextField
                className={classes.formField}
                name="sampleCode"
                value={values.sampleCode}
                onChange={handleChange}
                label="Číslo vzorky"
                fullWidth
                error={touched.sampleCode && !!errors.sampleCode}
                helperText={touched.sampleCode && errors.sampleCode}
              />

              <TextField
                className={classes.formField}
                name="pacient"
                value={values.pacient}
                onChange={handleChange}
                label="Priezvisko a meno pacienta"
                fullWidth
                error={touched.pacient && !!errors.pacient}
                helperText={touched.pacient && errors.pacient}
              />

              <TextField
                className={classes.formField}
                name="personalNumber"
                value={values.personalNumber}
                onChange={handleChange}
                label="Rodné číslo"
                fullWidth
                error={touched.personalNumber && !!errors.personalNumber}
                helperText={touched.personalNumber && errors.personalNumber}
              />

              <TextField
                className={classes.formField}
                name="sampleCollectionDate"
                value={values.sampleCollectionDate}
                onChange={handleChange}
                label="Dátum odberu vzorky"
                fullWidth
                error={touched.sampleCollectionDate && !!errors.sampleCollectionDate}
                helperText={touched.sampleCollectionDate && errors.sampleCollectionDate}
              />

              <TextField
                className={classes.formField}
                name="sampleReceiveDate"
                value={values.sampleReceiveDate}
                onChange={handleChange}
                label="Dátum príjmu vzorky"
                fullWidth
                error={touched.sampleReceiveDate && !!errors.sampleReceiveDate}
                helperText={touched.sampleReceiveDate && errors.sampleReceiveDate}
              />

              <DialogActions style={{padding: '8px 0'}}>
                <Button type="submit" color="primary" variant="contained">
                  Vytvoriť žiadateľa
                </Button>
                <Button onClick={() => setOpen(false)} autoFocus variant="contained">
                  Zrušiť
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  )
}

export default NewApplicant
