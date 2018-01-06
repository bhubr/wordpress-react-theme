export default function transformPost(post) {
  const fieldsToExtract = ['content', 'excerpt', 'title', 'guid'];
  for(let field in post) {
    if(fieldsToExtract.indexOf(field) !== -1) {
      const value = post[field].rendered;
      post[field] = value;
    }
  }
  return post;
}
