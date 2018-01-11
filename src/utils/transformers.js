function extractRendered(obj, fieldsToExtract) {
  for(let field in obj) {
    if(fieldsToExtract.indexOf(field) !== -1) {
      const value = obj[field].rendered;
      obj[field] = value;
    }
  }
  return obj;
}

export function transformPost(post) {
  post = extractRendered(post, ['content', 'excerpt', 'title', 'guid']);
  post.link = post.link.substr(window.location.origin.length);
  return post;
}

export function transformComment(comment) {
  return extractRendered(comment, ['content']);
}
