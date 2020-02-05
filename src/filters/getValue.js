import ValidatorUtil from '../helpers/validatorUtil';

export default class GetValue {
  static money(value) {
    if (!ValidatorUtil.isDefined(value)) {
      return '&#8358;0';
    }
    return `&#8358;${value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
  }
}
