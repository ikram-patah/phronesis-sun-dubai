import moment from 'moment'

export const formatDateTime = (date) => {
  return moment(date).format('YYYY-MM-DD, h:mm a')
}
