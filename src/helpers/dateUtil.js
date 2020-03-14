import ValidatorUtil from './validatorUtil';

class DateUtil {
  static getAge(dob) {
    if (!ValidatorUtil.isDefined(dob)) { return 0; }

    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();

    if (today.getMonth <= dobDate.getMonth && today.getDay() < dobDate.getDay()) {
      age -= 1;
    }

    return age;
  }

  static getPeriodString(startDate, endDate) {
    if (!endDate && !startDate) {
      return '-';
    }
    return `${(new Date(startDate)).getFullYear()} - ${(new Date(endDate)).getFullYear()}`;
  }
}

export default DateUtil;
