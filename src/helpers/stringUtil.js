import ValidatorUtil from './validatorUtil';

class StringUtil {
  static buildQuery(url, filter) {
    if (filter == null) {
      return url;
    }

    const keys = Object.keys(filter);
    let isFirst = true;
    let queryString = '';

    keys.forEach((key) => {
      if (ValidatorUtil.isDefined(filter[key])) {
        if (Array.isArray(filter[key]) || typeof filter[key] === 'object') {
          const pruned = this.pruneObject(filter[key]);
          if (pruned != null) {
            queryString = isFirst ? queryString += `${key}=${JSON.stringify(pruned)}` : queryString += `&${key}=${JSON.stringify(pruned)}`;
          }
        } else {
          queryString = isFirst ? queryString += `${key}=${filter[key]}` : queryString += `&${key}=${filter[key]}`;
        }
        isFirst = false;
      }
    });


    return queryString.length > 0 ? `${url}?${queryString}` : url;
  }

  static getErrorText(err) {
    if (!err.response || !err.response.data) {
      return 'An error occured. Please contact admin.';
    }

    return err.response.data.message;
  }
}

export default StringUtil;
