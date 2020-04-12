import _ from 'lodash'
import * as yup from 'yup'

// in case anyone needed these..
export type ApplicantType = 'physical' | 'legal' | 'physical-contractor'

export const updateLabResultBodySchema = yup
  .object()
  .shape({
    gridId: yup.string().required(),
    column: yup.number().required(),
    row: yup.number().required(),
    positive: yup.boolean(),
    sampleCode: yup.string(),
  })
  .noUnknown()

export const updateGridBodySchema = yup
  .object()
  .shape({
    title: yup.string(),
    test_initiation_date: yup.string(),
    test_finished_date: yup.string(),
    sample_taken_date: yup.string(),
    sample_arrival_date: yup.string(),
    finished: yup.boolean(),
  })
  .noUnknown()

// TODO validate existence of control samples
export const gridSchema = yup
  .array()
  .min(8)
  .max(8)
  .of(
    yup
      .array()
      .min(12)
      .max(12)
      .required()
      .ensure()
      .of(
        yup
          .object()
          .shape({value: yup.string().ensure(), positive: yup.boolean()})
          .noUnknown(),
      ),
  )
  .ensure()

export const createGridBodySchema = yup
  .object()
  .shape({
    grid: gridSchema,
    title: yup.string().required(),
    test_initiation_date: yup.string().required(),
    test_finished_date: yup.string().required(),
    sample_taken_date: yup.string().required(),
    sample_arrival_date: yup.string().required(),
  })
  .noUnknown()

// these can be run on both frontend and backend
export const verificationRequestBodySchema = yup
  .object()
  .shape({
    category: yup
      .string()
      .required('Kategória je povinná.')
      .oneOf(['national', 'european', 'international'])
      .default('national'),
    international_countries_validity: yup
      .array()
      .of(yup.string())
      .default([])
      .when('category', {
        is: 'european',
        then: yup
          .array()
          .notRequired()
          .transform(() => {
            return []
          }),
        otherwise: yup
          .array()
          .min(1, 'Zvoľte územie, na ktorom má ochranná známka platiť')
          .required('Zvoľte územie, na ktorom má ochranná známka platiť'),
      }),
    type: yup
      .string()
      .required('Typ ochrannej známky je povinný.')
      .oneOf(['text', 'image'])
      .default('text'),
    service_description: yup.string().required('Zadajte názov tovaru alebo služby'),
    first_name: yup.string().required('Zadajte vaše meno'),
    last_name: yup.string().required('Zadajte vaše priezvisko'),
    email: yup
      .string()
      .email('Nesprávny formát emailu.')
      .required('Zadajte vašu emailovú adresu'),
    phone: yup
      .string()
      .min(16, 'Zadajte vaše telefónne číslo')
      .required('Zadajte vaše telefónne číslo'),
  })
  .noUnknown()

export const clientVerificationRequestBodySchema = verificationRequestBodySchema.shape({
  value: yup.string().when('type', {
    is: 'text',
    then: yup.string().required('Zadajte znenie ochrannej známky'),
    otherwise: yup.string().notRequired(),
  }),
  file: yup.mixed().when('type', {
    is: 'image',
    then: yup.mixed().required('Prosím, nahrajte správny formát/veľkosť súboru'),
  }),
})

export const serverVerificationRequestBodySchema = verificationRequestBodySchema.shape({
  value: yup.string().required('Popis ochrannej známky je povinný.'),
  international_countries_validity: yup
    .array()
    .default([])
    .when('category', {
      is: 'european',
      then: yup
        .array()
        .notRequired()
        .transform(() => {
          return []
        }),
      otherwise: yup
        .array()
        .of(yup.string())
        .min(1, 'Musíte vybrať aspoň jednu krajinu.')
        .required('Musíte vybrať aspoň jednu krajinu.')
        .transform(function(value, originalValue) {
          return this.isType(value) ? value : originalValue.split(',')
        }),
    }),
})

export const sendVerificationEmailRequestBodySchema = yup
  .object()
  .shape({
    id: yup.string().required(),
    status: yup
      .string()
      .oneOf(['approved', 'dismissed'])
      .required(),
  })
  .noUnknown()

const stringRequiredForApplicant = (applicantTypes: ApplicantType[], message) =>
  yup
    .string()
    .ensure()
    .when('applicant_person_type', {
      is: (type) => applicantTypes.indexOf(type) !== -1,
      then: yup.string().required(message),
    })

export const registrationPhysicalPersonSpecificSchema = yup.object().shape({
  physical_person_first_name: stringRequiredForApplicant(['physical'], 'Zadajte vaše meno.'),
  physical_person_last_name: stringRequiredForApplicant(['physical'], 'Zadajte vaše priezvisko.'),
  physical_person_identification_number: stringRequiredForApplicant(
    ['physical'],
    'Zadajte vaše rodné číslo.',
  ),
})

export const registrationLegalPersonAndContractorSpecificSchema = yup.object().shape({
  legal_person_bussiness_name: stringRequiredForApplicant(
    ['legal', 'physical-contractor'],
    'Zadajte obchodné meno.',
  ),
  legal_person_ico: stringRequiredForApplicant(
    ['legal', 'physical-contractor'],
    'Zadajte správne IČO.',
  ),
  legal_person_dic: stringRequiredForApplicant(
    ['legal', 'physical-contractor'],
    'Zadajte správne DIČ.',
  ),
  legal_person_dph: yup.boolean().when('applicant_person_type', {
    is: (type) => ['legal', 'physical-contractor'].indexOf(type) !== -1,
    then: yup
      .boolean()
      // TODO can be fixed once this lands in formik https://github.com/jaredpalmer/formik/pull/2255
      .default('true')
      .transform((s) => Boolean(s))
      .required('Zvoľte jednu z možností.')
      .typeError('Zvoľte jednu z možností.'),
  }),
  legal_person_ic_dph: stringRequiredForApplicant(
    ['legal', 'physical-contractor'],
    'Zadajte správne IČ DPH.',
  ),
  address_country: stringRequiredForApplicant(
    ['legal', 'physical-contractor'],
    'Zadajte názov štátu.',
  ),
})

export const registrationLegalPersonSpecificSchema = yup.object().shape({
  legal_person_official_first_name: stringRequiredForApplicant(
    ['legal'],
    'Zadajte meno štatutára.',
  ),
  legal_person_official_last_name: stringRequiredForApplicant(
    ['legal'],
    'Zadajte priezvisko štatutára.',
  ),
  legal_person_official_function: stringRequiredForApplicant(
    ['legal'],
    'Zadajte funkciu štatutára.',
  ),
})

export const registrationAgreementSchema = yup.object().shape({
  terms_and_conditions: yup
    .string()
    .ensure()
    .required()
    .default('false')
    .oneOf(['true'], 'Pre odoslanie objednávky označte váš súhlas s VOP'),
  gdpr: yup
    .string()
    .ensure()
    .required()
    .default('false')
    .oneOf(['true'], 'Pre odoslanie objednávky označte váš súhlas so spracovaním údajov'),
})

export const registrationRequestBodySchema = yup
  .object()
  .shape({
    verification_request_id: yup
      .string()
      .ensure()
      .required(),
    contact_first_name: yup
      .string()
      .ensure()
      .required('Zadajte vaše meno.'),
    contact_last_name: yup
      .string()
      .ensure()
      .required('Zadajte vaše priezvisko.'),
    contact_email: yup
      .string()
      .ensure()
      .email('Nesprávny formát emailu.')
      .required('Zadajte vašu emailovú adresu.'),
    contact_phone: yup
      .string()
      .min(16, 'Zadajte vaše telefónne číslo')
      .required('Zadajte vaše telefónne číslo'),
    address_street: yup
      .string()
      .ensure()
      .required('Zadajte adresu.'),
    address_number: yup
      .string()
      .ensure()
      .required('Zadajte orientačné číslo.'),
    address_psc: yup
      .string()
      .ensure()
      .required('Zadajte správne PSČ.'),
    address_city: yup
      .string()
      .ensure()
      .required('Zadajte názov mesta.'),
    lawyer_services_help_required: yup
      .boolean()
      // TODO can be fixed once this lands in formik https://github.com/jaredpalmer/formik/pull/2255
      .default('false')
      .transform((s) => Boolean(s))
      .required(),
    services: yup
      .array()
      .of(yup.mixed())
      .default([])
      .when('lawyer_services_help_required', {
        is: false,
        then: yup
          .array()
          .of(yup.mixed())
          .test(
            'services-selected',
            'Vyberte minimálne jednu položku zo zoznamu.',
            (value) => value.length,
          ),
      }),
    applicant_person_type: yup
      .string()
      .ensure()
      .oneOf(['physical', 'legal', 'physical-contractor'])
      .default('physical')
      .required('Zvoľte jednu z možností.'),
  })
  .concat(registrationPhysicalPersonSpecificSchema)
  .concat(registrationLegalPersonAndContractorSpecificSchema)
  .concat(registrationLegalPersonSpecificSchema)
  .concat(registrationAgreementSchema)

// skipping the fields not valid for current 'applicant_person_type'
// TODO typings
export const omitExtraRegistrationFields = (
  registrationRequestBody: yup.InferType<typeof registrationRequestBodySchema>,
) => {
  const physicalSpecificKeys = Object.keys(registrationPhysicalPersonSpecificSchema.fields)
  const legalSpecificKeys = Object.keys(registrationLegalPersonSpecificSchema.fields)
  const legalAndContractorSpecificKeys = Object.keys(
    registrationLegalPersonAndContractorSpecificSchema.fields,
  )
  let keysToOmitFromRequest
  switch (registrationRequestBody.applicant_person_type) {
    case 'physical':
      keysToOmitFromRequest = legalAndContractorSpecificKeys.concat(legalSpecificKeys)
      break
    case 'legal':
      keysToOmitFromRequest = physicalSpecificKeys
      break
    case 'physical-contractor':
      keysToOmitFromRequest = physicalSpecificKeys.concat(legalSpecificKeys)
      break
  }
  return _.omit(registrationRequestBody, keysToOmitFromRequest) as yup.InferType<
    typeof registrationRequestBodySchema
  >
}

export const omitAgreementFields = (
  registrationRequestBody: yup.InferType<typeof registrationRequestBodySchema>,
) => {
  return _.omit(
    registrationRequestBody,
    Object.keys(registrationAgreementSchema.fields),
  ) as yup.InferType<typeof registrationRequestBodySchema>
}
export const registrationIdRequestBodySchema = yup
  .object()
  .shape({id: yup.string().required()})
  .noUnknown()
