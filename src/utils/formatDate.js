export default function(date, dateFormat) {
  const { months } = WP_I18N;
  const separator = date.indexOf('T') > -1 ? 'T' : ' ';
  const datetimeBits = date.split(separator);
  const dateBits = datetimeBits[0].split('-');
  const month = parseInt(dateBits[1], 10) - 1;
  const day = parseInt(dateBits[2]);
  return dateFormat
    .replace('Y', dateBits[0])
    .replace('F', months[month])
    .replace('j', day);
}
