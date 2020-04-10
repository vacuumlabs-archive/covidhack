import FileType from 'file-type'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {GetServerSideProps} from 'next'
import Router from 'next/router'
import React, {useState} from 'react'
import Cart from '../../components/Cart'
import PhoneNumber from '../../components/inputs/PhoneNumber'
import RadioButton from '../../components/inputs/RadioButton'
import TextInput from '../../components/inputs/TextInput'
import Layout from '../../components/Layout'
import ServicesFee from '../../components/ServicesFee'
import ServicesForm from '../../components/ServicesForm'
import ServicesList from '../../components/SevicesList'
import {downloadFile} from '../../utils/aws'
import {streamToBuffer} from '../../utils/backendHelper'
import {client} from '../../utils/gql'
import {
  RegistrationRequestVerificationQueryQuery,
  VerificationRequestQueryQuery,
} from '../../utils/graphqlSdk'
import {registrationPrice, servicesFee} from '../../utils/price'
import {omitExtraRegistrationFields, registrationRequestBodySchema} from '../../utils/validations'
import InputMask from 'react-input-mask'
import FormikErrorFocus from 'formik-error-focus'

interface RegisterRequestFormProps {
  verification: VerificationRequestQueryQuery['verification_request_by_pk']
  verificationRequestImageString: string
  verificationRequestImageMime: string
  registrationRequest: RegistrationRequestVerificationQueryQuery['registration_request']
  registrationFilled: boolean
}

const RegisterRequestForm = (props: RegisterRequestFormProps) => {
  const [categoriesModalOpen, setCategoriesModalOpen] = useState(false)

  const setCategoriesModalClosed = () => {
    if (categoriesModalOpen) {
      setCategoriesModalOpen(!categoriesModalOpen)
    }
  }

  return (
    <Layout isFormPage>
      <div className="container">
        <div className="wrapper">
          <h2 className="title">
            {props.verification.category === 'international'
              ? 'Nezáväzná registrácia ochrannej známky'
              : 'Záväzná registrácia ochrannej známky'}
          </h2>
          <div className="content">
            <Formik
              initialValues={{
                ...registrationRequestBodySchema.default(),
                verification_request_id: props.verification.id,
                contact_first_name: props.verification.first_name,
                contact_last_name: props.verification.last_name,
                contact_email: props.verification.email,
                contact_phone: props.verification.phone,
                ...props.registrationRequest,
              }}
              validationSchema={registrationRequestBodySchema}
              onSubmit={(values, {setSubmitting}) => {
                fetch('/api/registration-request', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(omitExtraRegistrationFields(values)), // body data type must match "Content-Type" header
                })
                  .then((response) => {
                    if (response.ok)
                      response.json().then((data) => {
                        Router.push(`/success-registration/${data.id}`)
                      })
                  })
                  .catch(() => {
                    setSubmitting(false)
                  })
              }}
            >
              {(formikProps) => (
                <Form style={{display: 'flex', justifyContent: 'space-between'}}>
                  <div className="form">
                    <div className="success-bar">
                      <img
                        src="/images/check-circle-white.svg"
                        alt="check-circle"
                        className="success-icon"
                      />
                      <h3 className="success-text">
                        Gratulujeme! Vaša známka je vhodná na registráciu.
                      </h3>
                    </div>
                    <div className="card card-butter">
                      <div className="card-item">
                        <h5 className="card-title">Platnosť na území</h5>
                        <div className="card-wrapper">
                          <div className="card-text">
                            {props.verification.category === 'national' ? (
                              props.verification.international_countries_validity.map((country) =>
                                country === 'SK' ? (
                                  <div key={country} className="validity-wrapper">
                                    <span className="card-text">Slovenská republika</span>
                                    <span className="card-text validity-price">295 EUR</span>
                                  </div>
                                ) : (
                                  <div key={country} className="validity-wrapper">
                                    <span className="card-text">Česká republika</span>
                                    <span className="card-text validity-price">449 EUR</span>
                                  </div>
                                ),
                              )
                            ) : props.verification.category === 'international' ? (
                              props.verification.international_countries_validity.join(', ')
                            ) : (
                              <div className="validity-wrapper">
                                <span className="card-text">Všetky krajiny EÚ</span>
                                <span className="card-text validity-price">1299 EUR</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {props.verification.type === 'image' ? (
                        <div className="card-item">
                          <h5 className="card-title">Vyobrazenie ochrannej známky</h5>
                          <div className="img-wrapper">
                            <img
                              src={`data:${props.verificationRequestImageMime};base64,${props.verificationRequestImageString}`}
                              className="img"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="card-item">
                          <h5 className="card-title">Znenie slovnej ochrannej známky</h5>
                          <div className="card-wrapper">
                            <div className="card-text">{props.verification.value}</div>
                          </div>
                        </div>
                      )}
                      <div className="card-item">
                        <h5 className="card-title">Tovary a služby, ktoré chcete chrániť</h5>
                        <div className="card-wrapper">
                          <div className="card-text">{props.verification.service_description}</div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <h5 className="card-title">Kontakt na Vás</h5>
                      <div className="card-wrapper contact-wrapper">
                        <div className="contact-item">
                          <div className="contact-label-wrapper">
                            <span className="contact-label">Meno</span>
                          </div>
                          <ErrorMessage
                            name="contact_first_name"
                            component="div"
                            className="error-message error-message-contact"
                          />
                          <Field
                            type="text"
                            name="contact_first_name"
                            className="text-input"
                            disabled={formikProps.isSubmitting || props.registrationFilled}
                          />
                        </div>
                        <div className="contact-item">
                          <div className="contact-label-wrapper">
                            <span className="contact-label">Priezvisko</span>
                          </div>
                          <ErrorMessage
                            name="contact_last_name"
                            component="div"
                            className="error-message error-message-contact"
                          />
                          <Field
                            type="text"
                            name="contact_last_name"
                            className="text-input"
                            disabled={formikProps.isSubmitting || props.registrationFilled}
                          />
                        </div>
                        <div className="contact-item">
                          <div className="contact-label-wrapper">
                            <span className="contact-label">Email</span>
                          </div>
                          <ErrorMessage
                            name="contact_email"
                            component="div"
                            className="error-message error-message-contact"
                          />
                          <Field
                            type="email"
                            name="contact_email"
                            className="text-input"
                            disabled={formikProps.isSubmitting || props.registrationFilled}
                          />
                        </div>
                        <div className="contact-item">
                          <div className="contact-label-wrapper">
                            <span className="contact-label">Telefónne číslo</span>
                          </div>
                          <ErrorMessage
                            name="contact_phone"
                            component="div"
                            className="error-message error-message-contact"
                          />
                          <PhoneNumber
                            name="contact_phone"
                            disabled={formikProps.isSubmitting || props.registrationFilled}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card card-butter">
                      <h5 className="card-title">Údaje o prihlasovateľovi</h5>
                      <div className="card-wrapper">
                        <p className="card-description">
                          Mala by to byť osoba, ktorá bude ochrannú známku v skutočnosti používať.
                          Zníži sa tým riziko možného napadnutia ochrannej známky a ochrana
                          produktov bude silnejšia. Majiteľom môže byť tak fyzická osoba ako aj
                          firma alebo iná právnická osoba, napr. občianske združenie.
                        </p>
                      </div>
                      <div className="radio-wrapper">
                        <div className="radio-btn">
                          <RadioButton
                            name="applicant_person_type"
                            type="radio"
                            value="physical"
                            label="Fyzická osoba"
                            disabled={formikProps.isSubmitting || props.registrationFilled}
                          />
                        </div>
                        <div className="radio-btn">
                          <RadioButton
                            name="applicant_person_type"
                            type="radio"
                            value="legal"
                            label="Právnická osoba"
                            disabled={formikProps.isSubmitting || props.registrationFilled}
                          />
                        </div>
                        <div className="radio-btn">
                          <RadioButton
                            name="applicant_person_type"
                            type="radio"
                            value="physical-contractor"
                            label="Fyzická osoba - podnikateľ"
                            disabled={formikProps.isSubmitting || props.registrationFilled}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card card-detail">
                      <div className="card-detail-item">
                        {formikProps.values.applicant_person_type === 'physical' ? (
                          <>
                            <h5 className="card-title">Osobné údaje</h5>
                            <div className="contact-wrapper">
                              <div className="contact-item">
                                <div className="contact-label-wrapper">
                                  <span className="contact-label">Meno</span>
                                </div>
                                <ErrorMessage
                                  name="physical_person_first_name"
                                  component="div"
                                  className="error-message error-message-contact"
                                />
                                <TextInput
                                  type="text"
                                  name="physical_person_first_name"
                                  disabled={formikProps.isSubmitting || props.registrationFilled}
                                />
                              </div>
                              <div className="contact-item">
                                <div className="contact-label-wrapper">
                                  <span className="contact-label">Priezvisko</span>
                                </div>
                                <ErrorMessage
                                  name="physical_person_last_name"
                                  component="div"
                                  className="error-message error-message-contact"
                                />
                                <TextInput
                                  type="text"
                                  name="physical_person_last_name"
                                  disabled={formikProps.isSubmitting || props.registrationFilled}
                                />
                              </div>
                              <div className="contact-item">
                                <div className="contact-label-wrapper">
                                  <span className="contact-label">Rodné číslo</span>
                                  <p className="card-description contact-description">
                                    Rodné číslo je povinný údaj v žiadosti o zápis ochrannej známky,
                                    bez neho nie je možné požiadať o registráciu.
                                  </p>
                                </div>
                                <ErrorMessage
                                  name="physical_person_identification_number"
                                  component="div"
                                  className="error-message error-message-contact"
                                />
                                <Field name="physical_person_identification_number">
                                  {({field}) => {
                                    return (
                                      <InputMask
                                        mask="999999/9999"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        disabled={
                                          formikProps.isSubmitting || props.registrationFilled
                                        }
                                        alwaysShowMask={true}
                                        maskChar=" "
                                      >
                                        {(inputProps) => (
                                          <input
                                            {...inputProps}
                                            name={field.name}
                                            className="text-input identification-number-input"
                                          />
                                        )}
                                      </InputMask>
                                    )
                                  }}
                                </Field>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <h5 className="card-title">Údaje o spoločnosti</h5>
                            <div className="contact-wrapper">
                              <div className="contact-item">
                                <div className="contact-label-wrapper">
                                  <span className="contact-label">Obchodné meno</span>
                                </div>
                                <ErrorMessage
                                  name="legal_person_bussiness_name"
                                  component="div"
                                  className="error-message error-message-contact"
                                />
                                <TextInput
                                  type="text"
                                  name="legal_person_bussiness_name"
                                  disabled={formikProps.isSubmitting || props.registrationFilled}
                                />
                              </div>
                              <div className="contact-item">
                                <div className="contact-label-wrapper">
                                  <span className="contact-label">IČO</span>
                                </div>
                                <ErrorMessage
                                  name="legal_person_ico"
                                  component="div"
                                  className="error-message error-message-contact"
                                />
                                <TextInput
                                  type="text"
                                  name="legal_person_ico"
                                  disabled={formikProps.isSubmitting || props.registrationFilled}
                                />
                              </div>
                              <div className="contact-item">
                                <div className="contact-label-wrapper">
                                  <span className="contact-label">DIČ</span>
                                </div>
                                <ErrorMessage
                                  name="legal_person_dic"
                                  component="div"
                                  className="error-message error-message-contact"
                                />
                                <TextInput
                                  type="text"
                                  name="legal_person_dic"
                                  disabled={formikProps.isSubmitting || props.registrationFilled}
                                />
                              </div>
                              <div className="radio-wrapper">
                                <ErrorMessage
                                  name="legal_person_dph"
                                  component="div"
                                  className="error-message error-message-dph error-message-contact"
                                />
                                <div className="radio-wrapper-horizontal">
                                  <div className="radio-btn-horizontal">
                                    <RadioButton
                                      name="legal_person_dph"
                                      type="radio"
                                      value="true"
                                      label="Platca DPH"
                                      disabled={
                                        formikProps.isSubmitting || props.registrationFilled
                                      }
                                    />
                                  </div>
                                  <div className="radio-btn-horizontal">
                                    <RadioButton
                                      name="legal_person_dph"
                                      type="radio"
                                      value="false"
                                      label="Neplatca DPH"
                                      disabled={
                                        formikProps.isSubmitting || props.registrationFilled
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              {String(formikProps.values.legal_person_dph) === 'true' && (
                                <div className="contact-item">
                                  <div className="contact-label-wrapper">
                                    <span className="contact-label">IČ DPH</span>
                                  </div>
                                  <ErrorMessage
                                    name="legal_person_ic_dph"
                                    component="div"
                                    className="error-message error-message-contact"
                                  />
                                  <TextInput
                                    type="text"
                                    name="legal_person_ic_dph"
                                    disabled={formikProps.isSubmitting || props.registrationFilled}
                                  />
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="card-detail-item">
                        {formikProps.values.applicant_person_type === 'physical' ? (
                          <>
                            <h5 className="card-title">Trvalé bydlisko</h5>
                            <div className="contact-wrapper">
                              <div className="contact-label-wrapper">
                                <p className="card-description">
                                  Zadajte údaje podľa občianskeho preukazu.
                                </p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <h5 className="card-title">Sídlo podnikania</h5>
                        )}
                        <div className="contact-wrapper">
                          <div className="contact-item">
                            <div className="contact-label-wrapper">
                              <span className="contact-label">Ulica</span>
                            </div>
                            <ErrorMessage
                              name="address_street"
                              component="div"
                              className="error-message error-message-contact"
                            />
                            <TextInput
                              type="text"
                              name="address_street"
                              disabled={formikProps.isSubmitting || props.registrationFilled}
                            />
                          </div>
                          <div className="contact-item">
                            <div className="contact-label-wrapper">
                              <span className="contact-label">Číslo</span>
                            </div>
                            <ErrorMessage
                              name="address_number"
                              component="div"
                              className="error-message error-message-contact"
                            />
                            <TextInput
                              type="text"
                              name="address_number"
                              disabled={formikProps.isSubmitting || props.registrationFilled}
                            />
                          </div>
                          <div className="contact-item">
                            <div className="contact-label-wrapper">
                              <span className="contact-label">Mesto</span>
                            </div>
                            <ErrorMessage
                              name="address_city"
                              component="div"
                              className="error-message error-message-contact"
                            />
                            <TextInput
                              type="text"
                              name="address_city"
                              disabled={formikProps.isSubmitting || props.registrationFilled}
                            />
                          </div>
                          <div className="contact-item">
                            <div className="contact-label-wrapper">
                              <span className="contact-label">PSČ</span>
                            </div>
                            <ErrorMessage
                              name="address_psc"
                              component="div"
                              className="error-message error-message-contact"
                            />
                            <TextInput
                              type="text"
                              name="address_psc"
                              disabled={formikProps.isSubmitting || props.registrationFilled}
                            />
                          </div>
                          {formikProps.values.applicant_person_type !== 'physical' && (
                            <div className="contact-item">
                              <div className="contact-label-wrapper">
                                <span className="contact-label">Štát</span>
                              </div>
                              <ErrorMessage
                                name="address_country"
                                component="div"
                                className="error-message error-message-contact"
                              />
                              <TextInput
                                type="text"
                                name="address_country"
                                disabled={formikProps.isSubmitting || props.registrationFilled}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      {formikProps.values.applicant_person_type === 'legal' && (
                        <div className="card-detail-item">
                          <h5 className="card-title">Údaje o štatutárovi</h5>
                          <div className="contact-wrapper">
                            <div className="contact-item">
                              <div className="contact-label-wrapper">
                                <span className="contact-label">Meno</span>
                              </div>
                              <ErrorMessage
                                name="legal_person_official_first_name"
                                component="div"
                                className="error-message error-message-contact"
                              />
                              <TextInput
                                type="text"
                                name="legal_person_official_first_name"
                                disabled={formikProps.isSubmitting || props.registrationFilled}
                              />
                            </div>
                            <div className="contact-item">
                              <div className="contact-label-wrapper">
                                <span className="contact-label">Priezvisko</span>
                              </div>
                              <ErrorMessage
                                name="legal_person_official_last_name"
                                component="div"
                                className="error-message error-message-contact"
                              />
                              <TextInput
                                type="text"
                                name="legal_person_official_last_name"
                                disabled={formikProps.isSubmitting || props.registrationFilled}
                              />
                            </div>
                            <div className="contact-item">
                              <div className="contact-label-wrapper">
                                <span className="contact-label">Funkcia</span>
                              </div>
                              <ErrorMessage
                                name="legal_person_official_function"
                                component="div"
                                className="error-message error-message-contact"
                              />
                              <TextInput
                                type="text"
                                name="legal_person_official_function"
                                disabled={formikProps.isSubmitting || props.registrationFilled}
                              />
                              <ErrorMessage
                                name="legal_person_official_function"
                                component="div"
                                className="error-message"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="card card-butter">
                      <h5 className="card-title">Tovary a sluzby</h5>
                      <div className="card-wrapper">
                        <p className="card-description">
                          Vaša prihláška ochrannej známky musí obsahovať zoznam výrobkov a/alebo
                          služieb, na ktoré sa známka vzťahuje.
                        </p>
                        <div className="radio-wrapper">
                          <div className="radio-btn radio-btn-services">
                            <RadioButton
                              name="lawyer_services_help_required"
                              type="radio"
                              value="false"
                              label="Sám si vyberiem tovary a služby, ktorých sa ochranná známka týka"
                              disabled={formikProps.isSubmitting || props.registrationFilled}
                            />
                          </div>
                          <div className="radio-btn radio-btn-services">
                            <RadioButton
                              name="lawyer_services_help_required"
                              type="radio"
                              value="true"
                              label="Chcem, aby mi s výberom tovarov a služieb pomáhal právnik"
                              disabled={formikProps.isSubmitting || props.registrationFilled}
                            />
                            <div className="radio-price">+ 50 EUR</div>
                          </div>
                          <ErrorMessage
                            name="lawyer_services_help_required"
                            component="div"
                            className="error-message"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Typescript is wrong here - while the transformed value of lawyer_services_help_required is boolean
                      the value we work with inside the form is still a string of "true" or "false" - waiting for https://github.com/jaredpalmer/formik/pull/2255
                    // @ts-ignore */}
                    {formikProps.values.lawyer_services_help_required === 'false' && (
                      <div className="card card-detail">
                        <h5 className="card-title">Výber tovarov a služieb</h5>
                        <div className="card-wrapper">
                          {props.verification.category === 'international' ? (
                            <>
                              <p className="card-description">
                                <strong>
                                  Zo zoznamu vyberte tovary a služby, ktoré budete poskytovať pod
                                  vlastnou značkou.
                                </strong>
                                Ak predávate výrobky tretích osôb (retail), nie je nutné vyberať
                                všetky výrobky, ktoré predávate. Pre maloobchodný a veľkoobchodný
                                predaj stačí vybrať služby v triede 35.
                              </p>
                              <p className="card-description">
                                Cena známky závisí od počtu štátov a počtu tried tovarov a služieb,
                                ktoré sú predmetom ochrany.
                                <strong>S finálnou cenou sa Vám ozve náš právnik.</strong>
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="card-description">
                                <strong>
                                  Zo zoznamu vyberte tovary a služby, ktoré budete poskytovať pod
                                  vlastnou značkou.
                                </strong>{' '}
                                Ak predávate výrobky tretích osôb (retail), nie je nutné vyberať
                                všetky výrobky, ktoré predávate. Pre maloobchodný a veľkoobchodný
                                predaj stačí vybrať služby v triede 35.
                              </p>
                              <p className="card-description">
                                <strong>
                                  Celková výška úradného poplatku závisí od počtu zvolených tried.
                                </strong>
                              </p>
                            </>
                          )}
                        </div>
                        <div className="card-checklist">
                          <div className="selected-services">
                            <ServicesList
                              services={formikProps.values.services}
                              setFieldValue={formikProps.setFieldValue}
                            />
                            <ServicesFee
                              numberOfServices={formikProps.values.services.length}
                              servicesFee={servicesFee(props.verification, formikProps.values)}
                              national={props.verification.category === 'national'}
                              european={props.verification.category === 'european'}
                            />
                          </div>
                          <ErrorMessage
                            name="services"
                            component="div"
                            className="error-message error-message-services"
                          />
                          <button
                            type="button"
                            className="btn"
                            name="services"
                            onClick={() => setCategoriesModalOpen(!categoriesModalOpen)}
                            disabled={formikProps.isSubmitting || props.registrationFilled}
                          >
                            <img src="/images/list.svg" alt="list-icon" className="btn-icon" />
                            {formikProps.values.services.length > 0
                              ? 'Upraviť výber'
                              : 'Vyberte zo zoznamu'}
                          </button>
                          {categoriesModalOpen && (
                            <ServicesForm
                              closeModal={setCategoriesModalClosed}
                              numberOfServices={formikProps.values.services.length}
                              servicesFee={servicesFee(props.verification, formikProps.values)}
                              international={props.verification.category === 'international'}
                              national={props.verification.category === 'national'}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="sidebar">
                    <Cart
                      type="registration"
                      international={props.verification.category === 'international'}
                      onSubmit={formikProps.handleSubmit}
                      buttonDisabled={formikProps.isSubmitting}
                      price={registrationPrice(props.verification, formikProps.values)}
                      lawyearHelp={
                        String(formikProps.values.lawyer_services_help_required) === 'true'
                      }
                      servicesFee={servicesFee(props.verification, formikProps.values)}
                    />
                  </div>
                  <FormikErrorFocus
                    offset={0}
                    align={'middle'}
                    focusDelay={100}
                    ease={'linear'}
                    duration={500}
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <style jsx>{`
      .wrapper {
        padding-top: 80px;
        padding-bottom: 160px;
      }
      .title {
        font-size: 28px;
        line-height: 38px;
        font-weight: 800;
        text-align: center;
        margin: 0;
      }
      .content {
        margin-top: 64px;
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
      .success-bar {
        background: #73c694;
        height: 89px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 32px;
      }
      .success-icon {
        width: 24px;
        height: 24px;
        margin-right: 12px;
      }
      .success-text {
        font-weight: 800;
        font-size: 18px;
        line-height: 24px;
        color: #fff;
        margin: 0;
      }
      .card {
        background: #fff;
        border: 4px solid #fbf4ef;
        padding: 24px;
        position: relative;
      }
      .card:not(:last-of-type) {
        margin-bottom: 32px;
      }
      .card-butter {
        background: #fdfcfc;
      }
      .card-item + .card-item {
        margin-top: 32px;
      }
      .card-detail {
        margin-top: -36px;
      }
      .card.card-detail + .card {
        margin-top: 0;
      }
      .card-title {
        font-weight: 800;
        font-size: 18px;
        line-height: 25px;
        margin-top: 0;
        margin-bottom: 12px;
      }
      .card-wrapper {
        margin: 0 16px;
      }
      .card-text {
        font-size: 16px;
        line-height: 28px;
      }
      .card-description {
        font-style: italic;
        font-size: 14px;
        line-height: 22px;
        margin: 0;
      }
      .card-description + .card-description {
        margin-top: 16px;
      }
      .card-description strong {
        font-weight: 800;
      }
      .contact-description {
        margin-bottom: 8px;
      }
      .img-wrapper {
        width: 480px;
        height: 160px;
        position: relative;
        margin: 0 auto;
        background: #fbf4ef;
      }
      .img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .contact-wrapper {
        margin: 32px 16px 8px;
      }
      .contact-item + .contact-item {
        margin-top 24px;
      }
      .contact-label-wrapper {
        margin-left: 8px;
      }
      .contact-label {
        display: block;
        font-weight: 800;
        font-size: 14px;
        line-height: 22px;
        margin-bottom: 4px;
      }
      .radio-wrapper {
        margin-top: 32px;
      }
      .radio-btn + .radio-btn {
        margin-top: 24px;
      }
      .radio-wrapper-horizontal {
        display: flex;
        margin-bottom: 32px;
      }
      .radio-btn-horizontal {
        width: 100%;
        max-width: 50%;
      }
      .radio-btn-services {
        display: flex;
        justify-content: space-between;
      }
      .radio-price {
        font-weight: 800;
        font-size: 16px;
        line-height: 28px;
        text-align: right;
        color: #e56a61;
      }
      .card-detail-item + .card-detail-item {
        margin-top: 40px;
      }
      .card-checklist {
        margin: 32px 16px 0;
      }
      .btn {
        padding: 12px 40px;
        background: #f6e0df; 
        font-weight: 800;
        font-size: 16px;
        line-height: 28px;
        color: #e56a61;
        border: 0;
        outline: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .btn-icon {
        width: 24px;
        height: 24px;
        margin-right: 10px;
      }
      .sidebar {
        width: 100%;
        max-width: 428px;
        min-width: 428px;
      }
      .validity-wrapper {
        display: flex;
      }
      .validity-wrapper + .validity-wrapper {
        margin-top: 12px;
      }
      .validity-price {
        color: #e56a61;
        font-weight: 800;
        position: relative;
        padding-left: 12px;
        margin-left: 16px;
      }
      .validity-price:before {
        content: '-';
        position: absolute;
        left: 0;
      }
      .selected-services {
        margin-bottom: 32px;
      }
    `}</style>
      <style jsx global>{`
        /* TODO only for prefilled contact data */
        input.text-input {
          border: 0;
          outline: none;
          background: #fdfcfc;
          box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.06);
          border-radius: 4px;
          width: 100%;
          font-size: 16px;
          line-height: 28px;
          padding: 10px 12px;
        }
        input.identification-number-input {
          max-width: 160px;
        }
        .radio-btn-services .label {
          line-height: 24px;
          max-width: 352px;
        }
        .radio-btn-services .label .radio {
          top: 3px;
        }
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
        .error-message-contact {
          position: relative;
          margin-top: 0;
          bottom: 0;
          margin-bottom: 2px;
        }
        .error-message-services {
          bottom: 80px;
          margin-top: 0;
        }
        .error-message + input.input,
        .error-message-contact + input.identification-number-input,
        .error-message-contact + .react-tel-input .form-control {
          border: 1px solid #ff0000;
        }
        .error-message-dph + .radio-wrapper-horizontal .radio-btn-horizontal .label .radio {
          background: #fbf4ef;
          border: 1px solid #ff0000;
          box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.08);
        }
        .error-message-dph {
          margin-top: 26px;
        }
      `}</style>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const verificationRequest = await client.VerificationRequestQuery({
    id: context.params.id,
  })

  const registrationRequestData = (
    await client.RegistrationRequestVerificationQuery({
      id: context.params.id,
    })
  ).registration_request

  let registrationFilled = false
  let registrationRequest = {}

  if (Array.isArray(registrationRequestData) && registrationRequestData.length) {
    registrationFilled = true
    registrationRequest = registrationRequestData[0]
    // @ts-ignore
    // small hack to match types used in form
    registrationRequest.lawyer_services_help_required = registrationRequest.lawyer_services_help_required.toString()
  }

  if (verificationRequest.verification_request_by_pk.status !== 'approved') {
    console.error('Trying to register with an invalid verification request, aborting')
    context.res.statusCode = 404
    context.res.end('Not found')
    return
  }
  let verificationRequestImageString = null
  let verificationRequestImageMime = null
  if (verificationRequest.verification_request_by_pk.type === 'image') {
    const verificationRequestImageStream = await downloadFile(
      verificationRequest.verification_request_by_pk.value,
    )
    const verificationRequestImageBuffer = (await streamToBuffer(
      verificationRequestImageStream,
    )) as Buffer
    verificationRequestImageMime = (await FileType.fromBuffer(verificationRequestImageBuffer)).mime
    verificationRequestImageString = verificationRequestImageBuffer.toString('base64')
  }
  return {
    props: {
      verification: verificationRequest.verification_request_by_pk,
      verificationRequestImageString,
      verificationRequestImageMime,
      registrationRequest,
      registrationFilled,
    },
  }
}
export default RegisterRequestForm
