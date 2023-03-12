class UtilService {
    static objectToUrl(obj) {
      let url = Object.keys(obj).map(function(k) {
          return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])
      }).join('&');
      return url;
    }
  
    static redirectToProtocol(protocol, otherProtocol, dev) {
      if(dev || protocol === document.location.protocol) {
        return true;
      }
      window.location = window.location.href.replace(otherProtocol, protocol);
    }
  
    static redirectToHttps(dev) {
      return this.redirectToProtocol('https:','http:',dev);
    }
    static redirectToHttp(dev) {
      return this.redirectToProtocol('http:','https:',dev);
    }  
  }
  export default UtilService;
  