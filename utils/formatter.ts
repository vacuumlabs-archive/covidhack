import moment from 'moment'

export const formatDate = (date) =>
  moment(date)
    .locale('sk')
    .format('D.M.YYYY')
