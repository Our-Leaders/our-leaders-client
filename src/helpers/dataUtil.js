import ValidatorUtil from './validatorUtil';

class DataUtil {
  static sortArray(array, descending, key) {
    if (!ValidatorUtil.isDefined(array)) {
      return array;
    }

    if (descending) {
      if (ValidatorUtil.isDefined(key)) {
        array.sort((a, b) => {
          if (a[key] < b[key]) {
            return 1;
          }
          return -1;
        });
      } else {
        array.sort((a, b) => {
          if (a < b) {
            return 1;
          }
          return -1;
        });
      }
    }

    if (ValidatorUtil.isDefined(key)) {
      array.sort((a, b) => {
        if (a[key] > b[key]) {
          return 1;
        }
        return -1;
      });
    } else {
      array.sort((a, b) => {
        if (a > b) {
          return 1;
        }
        return -1;
      });
    }

    return array;
  }
}

export default DataUtil;
