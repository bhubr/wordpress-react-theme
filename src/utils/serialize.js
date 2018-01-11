 // https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object#answer-1714899
 function serializeAsURIEncoded(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

function serializeAsJSON(obj) {
  return JSON.stringify(obj);
}

export default function serialize(obj, method = 'GET') {
  return method === 'GET' ? serializeAsURIEncoded(obj) : serializeAsJSON(obj);
}
