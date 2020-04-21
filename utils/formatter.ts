import moment from 'moment'

// TODO: replace with date fns
export const formatDate = (date) =>
  moment(date)
    .locale('sk')
    .format('D.M.YYYY')
