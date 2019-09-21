function findSame(a,b){
  var result = [];
  const map = new Map();
  for(i=0;i<a.length;i++){
    map.set(a[i],1);
  }
  for(i=0;i<b.length;i++){
    if(map.has(b[i])){
      result.push(b[i])
    }
  }
  return result;
}
