import {Button, Dialog, DialogActions, DialogTitle, TextField} from '@material-ui/core'
import {DateTimePicker} from '@material-ui/pickers'
import {makeStyles} from '@material-ui/styles'
import {Form, Formik} from 'formik'
import React from 'react'
import {useDispatch} from 'react-redux'
import * as Yup from 'yup'

const useStyles = makeStyles({
  dialog: {maxWidth: '450px !important', padding: 24},
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
            sampleCollectionDate: new Date(),
            sampleReceiveDate: new Date(),
            sampleCode: '',
            sender: '',
          }}
          onSubmit={async (values) => {
            setOpen(false)
            // TODO: maybe wait for response first
            const response = await fetch('/api/create-applicant', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            })
          }}
          validationSchema={Yup.object({
            pacient: Yup.string().required('Toto pole nesmie byť prázdne'),
            personalNumber: Yup.string().required('Toto pole nesmie byť prázdne'),
            sampleCode: Yup.string().required('Toto pole nesmie byť prázdne'),
            sender: Yup.string().required('Toto pole nesmie byť prázdne'),
          })}
        >
          {({values, handleChange, errors, touched, setFieldValue, setFieldError}) => (
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

              <DateTimePicker
                className={classes.formField}
                variant="inline"
                autoOk
                ampm={false}
                label="Dátum odberu vzorky"
                name="sampleCollectionDate"
                value={values.sampleCollectionDate}
                onChange={(newDate) => {
                  console.log(newDate)
                  setFieldValue('sampleCollectionDate', newDate)
                }}
                disablePast
                format="dd.MM.yyyy - HH:mm"
                style={{width: '100%'}}
              />

              <DateTimePicker
                className={classes.formField}
                variant="inline"
                autoOk
                ampm={false}
                label="Dátum prijatia vzorky"
                name="sampleReceiveDate"
                value={values.sampleReceiveDate}
                onChange={(newDate) => {
                  setFieldValue('sampleReceiveDate', newDate)
                }}
                disablePast
                format="dd.MM.yyyy - HH:mm"
                style={{width: '100%'}}
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
