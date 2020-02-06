import moment from 'moment';
import ValidatorUtil from '../helpers/validatorUtil';

export default class GetValue {
  static money(value) {
    if (!ValidatorUtil.isDefined(value)) {
      return '&#8358;0';
    }
    return `&#8358;${value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
  }

  static date(value, format) {
    if (format) {
      return moment(value).format(format);
    }
    return moment(value).format('MMMM D YYYY');
  }
}
