const _ = require('lodash');
const moment = require('moment');

module.exports = function(allLogins) {
  return {
    users,
    filter
  }

  function users(criteria = {}) {
    return _.groupBy(filter(criteria), 'username');
  }

  function filter(criteria) {
    const cutoff = criteria.within ? moment().subtract(...criteria.within.split(/\s+/)).unix() : undefined;

    function criteriaFilter(login) {
      if (criteria.ip && login.ip !== criteria.ip) return false;
      if (cutoff && login.date_last < cutoff) return false;
      return true;
    }

    return _.reverse(_.sortBy(_.filter(allLogins, criteriaFilter), 'date_last'));
  }
};
