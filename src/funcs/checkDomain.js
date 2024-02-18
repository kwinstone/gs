const domain = window.location.origin
const checkDomain = (first, second, isLogo) => {
  if(domain === 'https://bao.gscore.ru' && isLogo) {
    return second
  }
  // if(domain === 'https://macarons.gscore.ru') {
  //   return second
  // }
  if(domain === 'https://rosso.gscore.ru' && isLogo) {
    return first
  } 
  if((domain === 'https://bao.gscore.ru' || domain === 'https://rosso.gscore.ru' || domain === 'https://macarons.gscore.ru') && !isLogo) {
    return second
  }
  if(domain !== 'https://bao.gscore.ru' && domain !== 'https://rosso.gscore.ru') {
    return first
  }
}
export default checkDomain;