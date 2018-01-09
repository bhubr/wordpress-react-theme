
function getMonthArchiveQuery(yearStr, monthStr) {
    let year = parseInt(yearStr, 10);
    let month = parseInt(monthStr, 10);
    console.log('getMonthArchiveQuery', year, monthStr, month);
    // 1977-04-22T06:00:00Z
    let paddedMonth = (month < 10 ? '0' : '') + month;
    const after = `${year}-${paddedMonth}-01T00:00:00Z`;
    if(month === 12) {
      year += 1;
      month = 1;
    } else {
      month++;
    }
    paddedMonth = (month < 10 ? '0' : '') + month;
    const before = `${year}-${paddedMonth}-01T00:00:00Z`;
    console.log('monthArchive', before, after);
    return { before, after };
}

function getYearArchiveQuery(year) {
    console.log('getYearArchiveQuery');
    // 1977-04-22T06:00:00Z
    const after = `${year}-01-01T00:00:00Z`;
    const before = `${year + 1}-01-01T00:00:00Z`;
    console.log('yearArchive', before, after);
    return { before, after };
}

function getAuthorArchive(authorSlug) {
  const { users } = window.INITIAL_STATE.meta;
  const author = users.find(u => (u.slug === authorSlug));
  return { author: author.id };
}

/**
 * Check the route params and call a query builder function accordingly
 */
export default function(params) {

  // Get postsPerPage from window state
  const { postsPerPage } = window.INITIAL_STATE.meta;
  const { page } = params;
  let query = {};
  console.error('### routeParamsToQuery', params);

  // Year archive
  if (params.year && ! params.year) {
    query = getYearArchiveQuery(year);
  }
  else if (params.year && params.month) {
    query = getMonthArchiveQuery(params.year, params.month);
  }
  else if(params.author) {
    query = getAuthorArchive(params.author);
  }
  const pageParam = page ? { page } : {};
  return Object.assign(query, pageParam, { per_page: postsPerPage });
}
