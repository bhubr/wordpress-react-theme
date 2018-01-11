export default function(oldProps, nextProps) {
  const oldParams = oldProps.match.params;
  const nextParams = nextProps.match.params;

  for(let p in nextParams) {
    if (! oldParams[p] || nextParams[p] !== oldParams[p]) {
      return true;
    }
  }
  for(let p in oldParams) {
    if (! nextParams[p] || nextParams[p] !== oldParams[p]) {
      return true;
    }
  }

  return false;
}
