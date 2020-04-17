import {
  Button,
  CircularProgress,
  DialogActions,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'
import {DatePicker} from '@material-ui/pickers'
import {makeStyles} from '@material-ui/styles'
import {Form, Formik} from 'formik'
import {pick} from 'lodash'
import {GetServerSideProps} from 'next'
import Router from 'next/router'
import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import * as Yup from 'yup'
import Layout from '../../components/Layout'
import WrongPassword from '../../components/office/WrongPassword'
import {decrypt, encrypt} from '../../logic/crypto'
import {State} from '../../logic/state'
import {allowAccessFor} from '../../utils/auth'
import {client} from '../../utils/gql'
import {Application} from '../../utils/graphqlSdk'
import {mapValuesAsync} from '../../utils/helpers'

const useStyles = makeStyles({
  dialog: {maxWidth: '450px !important', padding: 24},
  formField: {marginBottom: '8px !important'},
  paper: {
    margin: '16px auto',
    padding: 16,
    maxWidth: 450,
  },
})

type Props = {
  application: Application
}

const EditApplication = ({application: encryptedApplication}: Props) => {
  const password = useSelector((state: State) => state.officePassword)
  const [application, setApplication] = useState<Application>(null)
  const [error, setError] = useState()
  const classes = useStyles()

  useEffect(() => {
    mapValuesAsync(
      pick(encryptedApplication, ['pacient_name', 'personal_number', 'sample_code', 'sender']),
      (val) => decrypt(val as string, password),
    )
      .then((decryptedValues) => {
        setApplication({...encryptedApplication, ...decryptedValues})
      })
      .catch((err) => setError(err))
  }, [encryptedApplication, password])

  if (error) return <WrongPassword />

  if (!application)
    return (
      <Layout>
        <div style={{textAlign: 'center', marginTop: '20px'}}>
          <CircularProgress />
        </div>
      </Layout>
    )

  return (
    <Layout>
      <Typography variant="h3" gutterBottom style={{textAlign: 'center'}}>
        Upraviť žiadosť {application.sample_code}
      </Typography>
      <Paper className={classes.paper}>
        <Formik
          initialValues={{
            id: application.id,
            pacient: application.pacient_name,
            personalNumber: application.personal_number,
            sampleCollectionDate: application.sample_collection_date,
            sampleReceiveDate: application.sample_receive_date,
            sender: application.sender,
          }}
          onSubmit={async (values) => {
            const response = await fetch('/api/update-applicant', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...values,
                ...(await mapValuesAsync(
                  pick(values, ['pacient', 'personalNumber', 'sender']),
                  (val) => encrypt(val as string, password),
                )),
              }),
            })
            Router.push('/office')
          }}
          validationSchema={Yup.object({
            pacient: Yup.string().required('Toto pole nesmie byť prázdne'),
            personalNumber: Yup.string().required('Toto pole nesmie byť prázdne'),
            sender: Yup.string().required('Toto pole nesmie byť prázdne'),
          })}
        >
          {({values, handleChange, errors, touched, setFieldValue}) => (
            <Form>
              <TextField
                className={classes.formField}
                name="id"
                value={values.id}
                onChange={handleChange}
                disabled
                label="Id"
                fullWidth
                error={touched.id && !!errors.id}
                helperText={touched.id && errors.id}
              />

              <TextField
                className={classes.formField}
                name="sender"
                autoFocus
                value={values.sender}
                onChange={handleChange}
                label="Odosielateľ (meno, adresa, tel. číslo)"
                fullWidth
                error={touched.sender && !!errors.sender}
                helperText={touched.sender && errors.sender}
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

              <DatePicker
                className={classes.formField}
                variant="inline"
                autoOk
                label="Dátum odberu vzorky"
                name="sampleCollectionDate"
                value={values.sampleCollectionDate}
                onChange={(newDate) => {
                  setFieldValue('sampleCollectionDate', newDate)
                }}
                format="d.M.yyyy"
                style={{width: '100%'}}
              />
              <DatePicker
                className={classes.formField}
                variant="inline"
                autoOk
                label="Dátum prijatia vzorky"
                name="sampleReceiveDate"
                value={values.sampleReceiveDate}
                onChange={(newDate) => {
                  setFieldValue('sampleReceiveDate', newDate)
                }}
                format="d.M.yyyy"
                style={{width: '100%'}}
              />

              <DialogActions style={{padding: '8px 0'}}>
                <Button type="submit" color="primary" variant="contained">
                  Uložiť
                </Button>
                <Button onClick={() => Router.push('/office')} variant="contained">
                  Zrušiť
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Paper>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context): Promise<{props: Props}> => {
  if (!allowAccessFor(context.req.headers.authorization, ['kancelaria'])) {
    context.res.statusCode = 401
    context.res.setHeader('WWW-Authenticate', 'Basic')
    context.res.end('Unauthorized')
    return
  }

  const {application} = await client.ApplicationQuery({
    id: context.params.id,
  })

  return {
    props: {
      application: application[0],
    },
  }
}

export default EditApplication
