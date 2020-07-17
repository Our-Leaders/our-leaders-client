class ValidatorUtil {
  static isDefined(element) {
    if (!element) {
      return false;
    }

    if (element === 'undefined') {
      return false;
    }

    if (typeof element === 'object' && !(element instanceof Date) && !(element instanceof File) && Object.keys(element).length === 0) {
      return false;
    }

    if (Array.isArray(element) && element.length === 0) {
      return false;
    }

    if (element === null) {
      return false;
    }

    return true;
  }
}

export default ValidatorUtil;
