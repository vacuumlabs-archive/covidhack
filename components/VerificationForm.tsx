import {ErrorMessage, Form, Formik} from 'formik'
import _ from 'lodash'
import Router from 'next/router'
import React from 'react'
import FormikDropzone from '../components/FormikDropzone'
import Checkbox from '../components/inputs/Checkbox'
import MultiSelect from '../components/inputs/MultiSelect'
import PhoneNumber from '../components/inputs/PhoneNumber'
import RadioButton from '../components/inputs/RadioButton'
import {verificationPrice} from '../utils/price'
import {clientVerificationRequestBodySchema} from '../utils/validations'
import Cart from './Cart'
import CategorySelect from './inputs/CategorySelect'
import TextInput from './inputs/TextInput'
import FormikErrorFocus from 'formik-error-focus'

const VerifyRequestForm = (props) => (
  <>
    <Formik
      initialValues={{
        ...clientVerificationRequestBodySchema.default(),
        category: props.query.category || clientVerificationRequestBodySchema.default().category,
      }}
      validationSchema={clientVerificationRequestBodySchema}
      onSubmit={(values, {setSubmitting}) => {
        const formData = new FormData()
        for (const name in values) {
          formData.append(name, values[name])
        }
        fetch('/api/verification-request', {
          method: 'POST',
          body: formData,
        })
          .then((_) => {
            Router.push('/success-verification')
            setSubmitting(false)
          })
          .catch((e) => {
            setSubmitting(false)
          })
      }}
      enableReinitialize={true}
      validateOnMount={true}
    >
      {(props) => (
        <Form encType="multipart/form-data">
          <div className="content">
            <div className="form">
              <div className="card card-select card-butter">
                <CategorySelect
                  name="category"
                  setFieldValue={props.setFieldValue}
                  changeCallback={() => {
                    props.setFieldValue('international_countries_validity', [])
                  }}
                />
              </div>
              {props.values.category === 'national' || props.values.category === 'international' ? (
                <div className="card">
                  <h5 className="title">Platnosť na území</h5>
                  {props.values.category === 'national' ? (
                    <>
                      <ErrorMessage
                        name="international_countries_validity"
                        component="div"
                        className="error-message error-message-country"
                      />
                      <div className="wrapper checkbox-wrapper">
                        <div className="checkbox">
                          <Checkbox
                            label="Slovenská republika"
                            name="international_countries_validity"
                            value="SK"
                          />
                          <div className="price">295 EUR</div>
                        </div>
                        <div className="checkbox">
                          <Checkbox
                            label="Česká republika"
                            name="international_countries_validity"
                            value="CZ"
                          />
                          <div className="price">449 EUR</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="card-wrapper">
                      <p className="description">
                        Vyberte krajiny, v ktorých chcete svoju ochrannú známku uplatniť. Počet
                        krajín nie je obmedzený.
                      </p>
                      <div className="multiselect-wrapper">
                        <ErrorMessage
                          name="international_countries_validity"
                          component="div"
                          className="error-message error-message-multiselect"
                        />
                        <MultiSelect name="international_countries_validity" />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <></>
              )}
              <div className="card card-butter">
                <h5 className="title">Druh ochrannej známky</h5>
                <div className="card-wrapper">
                  <p className="description">
                    Vyberte druh, ktorý najlepšie vystihuje Vašu známku, a ktorý budete v obchodnom
                    styku skutočne používať.
                  </p>
                  <div className="wrapper radio-wrapper">
                    <div className="radio-btn">
                      <RadioButton name="type" value="text" label="Slovná ochranná známka" />
                      {props.values.type === 'text' && (
                        <p className="note">
                          Známka znázornená pomocou slov, písmen, čísel alebo iných znakov, ktoré sa
                          dajú napísať na klávesnici. Vhodné pre registráciu názvu produktu alebo
                          sloganu.
                        </p>
                      )}
                    </div>
                    <div className="radio-btn">
                      <RadioButton name="type" value="image" label="Obrazová ochranná známka" />
                      {props.values.type === 'image' && (
                        <p className="note">
                          Známka znázornená pomocou obrázkov, grafických prvkov a neštandardných
                          písmen. Môže obsahovať slová. Vhodná pre logo firmy alebo kombináciu loga
                          a názvu.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {props.values.type === 'text' ? (
                <div className="card card-detail">
                  <h5 className="title">Znenie ochrannej známky</h5>
                  <div className="card-wrapper">
                    <p className="description description-detail">
                      Známka musí byť spôsobilá odlíšiť vaše tovary alebo služby od tovarov a
                      služieb inej osoby. Nemôžu ju tvoriť označenia určujúce druh, kvalitu,
                      množstvo, účel, prípadne iné vlastnosti tovarov alebo služieb.
                    </p>
                    <ErrorMessage
                      name="value"
                      component="div"
                      className="error-message error-message-text"
                    />
                    <TextInput type="text" name="value" placeholder="Príklad: Trama" />
                  </div>
                </div>
              ) : props.values.type === 'image' ? (
                <div className="card card-detail">
                  <h5 className="title">Vyobrazenie ochrannej známky</h5>
                  <div className="dropzone">
                    <div className="dropzone-wrapper">
                      <FormikDropzone
                        setFieldValue={props.setFieldValue}
                        setFieldError={props.setFieldError}
                        setFieldTouched={props.setFieldTouched}
                        isFileUploaded={props.values.file}
                      />
                      {props.values.file && props.values.file.type !== '' && (
                        <div className="thumbnail">
                          <img
                            className="thumbnail-img"
                            src={URL.createObjectURL(props.values.file)}
                          />
                        </div>
                      )}
                      <ErrorMessage
                        name="file"
                        component="div"
                        className="error-message error-message-file"
                      />
                    </div>
                    <div className="dropzone-footer">
                      <div className="dropzone-notes">
                        <span className="dropzone-note-text">
                          <strong>Podporované formáty:</strong> .JPG
                        </span>
                        <span className="dropzone-note-text">
                          <strong>Maximálna veľkosť:</strong> 2MB
                        </span>
                      </div>
                      {props.values.file && (
                        <div
                          className="btn"
                          onClick={() => {
                            props.setFieldValue('file', undefined)
                            props.setFieldTouched('file', false)
                          }}
                        >
                          Vymazať
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div className="card">
                <h5 className="title">Služba alebo tovar, ktorý chcete chrániť</h5>
                <div className="card-wrapper">
                  <p className="description description-detail">
                    Orientačne zadajte tovary alebo služby, ktoré chcete chrániť, prípadne oblasť
                    podnikania.
                  </p>
                  <ErrorMessage
                    name="service_description"
                    component="div"
                    className="error-message error-message-text"
                  />
                  <TextInput
                    type="text"
                    name="service_description"
                    placeholder="Príklad: Výživové doplnky, Hudobné vydavateľstvo, Výroba a predaj oblečenia"
                  />
                </div>
              </div>
              <div className="card">
                <h5 className="title">Kontakt na Vás</h5>
                <div className="wrapper contact-wrapper">
                  <div className="contact-item">
                    <span className="contact-label">Meno</span>
                    <ErrorMessage
                      name="first_name"
                      component="div"
                      className="error-message error-message-contact"
                    />
                    <TextInput type="text" name="first_name" />
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">Priezvisko</span>
                    <ErrorMessage
                      name="last_name"
                      component="div"
                      className="error-message error-message-contact"
                    />
                    <TextInput type="text" name="last_name" />
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">Email</span>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-message error-message-contact"
                    />
                    <TextInput type="email" name="email" placeholder="@" />
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">Telefónne číslo</span>
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="error-message error-message-contact"
                    />
                    <PhoneNumber name="phone" />
                  </div>
                </div>
              </div>
            </div>
            <div className="sidebar">
              <Cart
                type="verification"
                international={props.values.category === 'international'}
                onSubmit={props.handleSubmit}
                buttonDisabled={props.isSubmitting}
                formComplete={_.isEmpty(props.errors)}
                price={verificationPrice(props.values)}
              />
            </div>
          </div>
          <FormikErrorFocus
            offset={100}
            align={'bottom'}
            focusDelay={100}
            ease={'linear'}
            duration={500}
          />
        </Form>
      )}
    </Formik>
    <style jsx>{`
      .content {
        margin-top: 64px;
        display: flex;
        justify-content: space-between;
      }
      .form {
        width: 100%;
        max-width: 560px;
        min-width: 560px;
      }
      .sidebar {
        width: 100%;
        max-width: 428px;
        min-width: 428px;
      }
      .card {
        background: #ffff;
        border: 4px solid #fbf4ef;
        padding: 24px;
        position: relative;
      }
      .card:not(:last-of-type) {
        margin-bottom: 32px;
      }
      .card:last-of-type {
        margin-bottom: 0;
      }
      .card-butter {
        background: #fdfcfc;
      }
      .card-select {
        padding: 0;
      }
      .title {
        font-weight: 800;
        font-size: 18px;
        line-height: 25px;
        margin-top: 0;
        margin-bottom: 16px;
      }
      .wrapper {
        display: flex;
        flex-direction: column;
      }
      .checkbox-wrapper {
        margin: 32px 16px 0;
      }
      .checkbox {
        display: flex;
        justify-content: space-between;
      }
      .checkbox + .checkbox {
        margin-top: 24px;
      }
      .price {
        font-weight: 800;
        font-size: 16px;
        line-height: 28px;
      }
      .card-wrapper {
        margin: 0 16px;
        position: relative;
      }
      .description {
        font-size: 14px;
        line-height: 22px;
        font-style: italic;
        margin: 0;
      }
      .description-detail {
        margin-bottom: 32px;
      }
      .radio-wrapper {
        margin-top: 32px;
      }
      .radio-btn + .radio-btn {
        margin-top: 24px;
      }
      .note {
        font-size: 14px;
        line-height: 22px;
        font-style: italic;
        margin: 8px 0 0 32px;
      }
      .card-detail {
        margin-top: -36px;
      }
      .contact-wrapper {
        margin: 32px 16px 8px;
      }
      .contact-item + .contact-item {
        margin-top: 24px;
      }
      .contact-label {
        display: block;
        font-weight: 800;
        font-size: 14px;
        line-height: 22px;
        padding-left: 8px;
        margin-bottom: 4px;
      }
      .dropzone {
        margin-top: 32px;
      }
      .dropzone-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        margin-top: 16px;
        margin-left: 16px;
      }
      .dropzone-notes {
        display: flex;
        flex-direction: column;
      }
      .dropzone-note-text {
        font-size: 14px;
        line-height: 22px;
        color: #938e8a;
        font-style: italic;
      }
      .dropzone-note-text strong {
        font-weight: 800;
      }
      .btn {
        font-weight: 800;
        font-size: 16px;
        line-height: 28px;
        color: #e56a61;
        padding: 12px 40px;
        background: #f6e0df;
        cursor: pointer;
        position: absolute;
        top: -2px;
        right: 0;
      }
      .dropzone-wrapper {
        width: 100%;
        height: 207px;
        position: relative;
      }
      .thumbnail {
        width: 100%;
        height: 100%;
        background-color: #fbf4ef;
        position: absolute;
        top: 0;
      }
      .thumbnail-img {
        display: block;
        width: 100%;
        height: 207px;
        object-fit: contain;
      }
      .multiselect-wrapper {
        margin-top: 28px;
      }
    `}</style>
    <style jsx global>{`
      .error-message {
        position: absolute;
        color: #ff0000;
        font-weight: 800;
        font-size: 10px;
        line-height: 16px;
        padding-left: 24px;
        margin-top: 4px;
      }
      .error-message:before {
        content: '';
        position: absolute;
        background-repeat: no-repeat;
        background-position: center top;
        background-image: url('/images/alert.svg');
        width: 16px;
        height: 16px;
        left: 0;
        top: -1px;
      }
      .error-message-text,
      .error-message-multiselect {
        bottom: 50px;
        margin-bottom: 2px;
        margin-top: 0;
      }
      .error-message-contact {
        position: relative;
        margin-top: 0;
        bottom: 0;
        margin-bottom: 2px;
      }
      .error-message + input.input,
      .error-message-contact + .react-tel-input .form-control {
        border: 1px solid #ff0000;
      }
      .error-message-multiselect + .css-2b097c-container {
        border: 1px solid #ff0000;
        border-radius: 4px;
      }
      .error-message + .checkbox-wrapper .checkbox label .checkmark {
        background: #fbf4ef;
        border: 1px solid #ff0000;
        box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.08);
      }
      .error-message-country {
        margin-top: -12px;
      }
      .error-message-file {
        margin-left: 16px;
        bottom: 8px;
      }
    `}</style>
  </>
)

export default VerifyRequestForm
