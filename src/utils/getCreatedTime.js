import moment from 'moment';

export const getCreatedTime = (dateTime) => {
  var now = moment().format('DD/MM/YYYY HH:mm:ss');

  var ms = moment(now, 'DD/MM/YYYY HH:mm:ss').diff(moment(dateTime, 'DD/MM/YYYY HH:mm:ss'));
  var d = moment.duration(ms);
  var mins = parseInt(d.asMinutes());

  return mins < 60 && mins > 0 ? mins + ' phút trước' : dateTime;
};
