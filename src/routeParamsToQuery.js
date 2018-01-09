
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

export default function(params) {
  const { postsPerPage } = window.INITIAL_STATE.meta;
  const { page } = params;
  let query = {};
  console.error('### routeParamsToQuery', params);
  if (params.year) {
    const { year, month } = params;
    console.error('### routeParamsToQuery time archive', year, month);
    query = month ? getMonthArchiveQuery(year, month) : getYearArchiveQuery(year);
  }
  else if(params.author) {
    
  }
  const pageParam = page ? { page } : {};
  return Object.assign(query, pageParam, { per_page: postsPerPage });
}
