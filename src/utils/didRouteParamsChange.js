export default function(oldProps, nextProps) {
  const oldParams = oldProps.match.params;
  const nextParams = nextProps.match.params;

  for(let p in nextParams) {
    if (nextParams[p] !== oldParams[p]) {
      console.log('didRouteParamsChange: CHANGED', p, oldParams[p], '==>', nextParams[p]);
      return true;
    }
  }

  console.log('didRouteParamsChange: UNCHANGED');
  return false;
}
