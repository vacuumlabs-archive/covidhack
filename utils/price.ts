import _ from 'lodash'
import {prices} from './constants'
import {Registration_Request, Verification_Request} from './graphqlSdk'

type ServicePricesType = {
  description: string
  basePrice: number
  basePriceExVat: number
  basePriceVat: number
}

type QuantityType = {
  qty: number
  price: number
  priceExVat: number
  priceVat: number
}

type ServicePriceWithQuantityType = ServicePricesType & QuantityType

export type PriceType = {
  lawyerServices: Array<ServicePriceWithQuantityType>
  fees: Array<ServicePriceWithQuantityType>
  lawyerPrice: number
  lawyerPriceVat: number
  feesPrice: number
  feesPriceVat: number
  totalPrice: number
}

const getServiceWithQuantity = (
  service: ServicePricesType,
  quantity: number,
): ServicePricesType & QuantityType => {
  return {
    ...service,
    qty: quantity,
    price: service.basePrice * quantity,
    priceExVat: service.basePriceExVat * quantity,
    priceVat: service.basePriceVat * quantity,
  }
}

const getBaseServices = (
  category: string,
  countries: Array<string>,
): Array<ServicePriceWithQuantityType> => {
  const services = []
  if (category === 'national') {
    if (countries.includes('SK')) services.push(getServiceWithQuantity(prices['sk-fee'], 1))

    if (countries.includes('CZ')) services.push(getServiceWithQuantity(prices['cz-fee'], 1))
  }
  if (category === 'european') services.push(getServiceWithQuantity(prices['eu-fee'], 1))

  return services
}

const getBaseFees = (
  category: string,
  countries: Array<string>,
): Array<ServicePriceWithQuantityType> => {
  const services = []
  if (category === 'national') {
    if (countries.includes('SK'))
      services.push(getServiceWithQuantity(prices['sk-registration-fee'], 1))

    if (countries.includes('CZ'))
      services.push(getServiceWithQuantity(prices['cz-registration-fee'], 1))
  }
  if (category === 'european')
    services.push(getServiceWithQuantity(prices['eu-registration-fee'], 1))

  return services
}

const getConsultationServices = (consultation: boolean): Array<ServicePriceWithQuantityType> => {
  if (consultation) return [getServiceWithQuantity(prices['consultation-fee'], 1)]
  else return [getServiceWithQuantity(prices['no-consultation-fee'], 1)]
}

const getCategoriesServices = (
  category: string,
  countries: Array<string>,
  numberOfCategories: number,
): Array<ServicePriceWithQuantityType> => {
  const services = []
  if (category === 'national' && numberOfCategories > 3) {
    if (countries.includes('SK'))
      services.push(getServiceWithQuantity(prices['sk-categories-fee'], numberOfCategories - 3))

    if (countries.includes('CZ'))
      services.push(getServiceWithQuantity(prices['cz-categories-fee'], numberOfCategories - 3))
  }

  if (category === 'european') {
    if (numberOfCategories >= 2)
      services.push(getServiceWithQuantity(prices['eu-second-category-fee'], 1))

    if (numberOfCategories >= 3)
      services.push(
        getServiceWithQuantity(prices['eu-after-second-category-fee'], numberOfCategories - 2),
      )
  }
  return services
}

const calculatePrice = (
  verification: Verification_Request,
  registration: Registration_Request,
): PriceType => {
  const baseServices = getBaseServices(
    verification.category,
    verification.international_countries_validity,
  )
  const baseFees = getBaseFees(verification.category, verification.international_countries_validity)

  const consultationServices = getConsultationServices(registration.lawyer_services_help_required)
  const categoriesFees = getCategoriesServices(
    verification.category,
    verification.international_countries_validity,
    registration.services.length,
  )

  const lawyerServices = baseServices.concat(consultationServices)
  const fees = baseFees.concat(categoriesFees)

  const lawyerPrice = _.sumBy(lawyerServices, (s) => s.price)
  const lawyerPriceVat = _.sumBy(lawyerServices, (s) => s.priceVat)

  const feesPrice = _.sumBy(fees, (s) => s.price)
  const feesPriceVat = _.sumBy(fees, (s) => s.priceVat)

  const totalPrice = lawyerPrice + feesPrice

  return {
    lawyerServices,
    fees,
    lawyerPrice,
    lawyerPriceVat,
    feesPrice,
    feesPriceVat,
    totalPrice,
  }
}

export const verificationPrice = (values) => {
  if (values.category === 'international') {
    return 'od 1499'
  } else {
    return _.sumBy(
      _.concat(
        getBaseServices(values.category, values.international_countries_validity),
        getBaseFees(values.category, values.international_countries_validity),
      ),
      (s) => s.price,
    )
  }
}

export const registrationPrice = (verificationValues, registrationValues) => {
  if (verificationValues.category === 'international') {
    return 'od 1499'
  } else {
    return _.sumBy(
      _.concat(
        getBaseServices(
          verificationValues.category,
          verificationValues.international_countries_validity,
        ),
        getBaseFees(
          verificationValues.category,
          verificationValues.international_countries_validity,
        ),
        getConsultationServices(registrationValues.lawyer_services_help_required === 'true'),
        getCategoriesServices(
          verificationValues.category,
          verificationValues.international_countries_validity,
          registrationValues.services.length,
        ),
      ),
      (s) => s.price,
    )
  }
}

export const servicesFee = (verificationValues, registrationValues) => {
  return _.sumBy(
    getCategoriesServices(
      verificationValues.category,
      verificationValues.international_countries_validity,
      registrationValues.services.length,
    ),
    (s) => s.price,
  )
}

export default calculatePrice
