(function(win, doc){
  'use strict';

  const $ = doc.querySelector.bind(document);
  const $city = $('[data-js="city"]');
  const $temp = $('[data-js="temp"]');
  const $description = $('[data-js="description"]');
  const img = $('img');
  
function app() {
  return {
    init() {
      if("geolocation" in navigator)
        return app().getLocation();

      return alert('Browser does not support geolocation')
    },

    getLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        this.conection(lat, long);
      });
    },
    
    async conection(lat,long) {
      const response = await fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`);
      const data = await response.json();
      app().changeHtml(data);
    },
    
    changeHtml(response) {
      $city.innerHTML = `${response.name} ${response.sys.country}`;
      $description.innerHTML = `${response.weather[0].main} ${response.weather[0].description}`;
      $temp.innerHTML = `${Math.round(response.main.temp)} C°`;
      var image = this.icon(response.weather[0].main);
      img.setAttribute('src', image);
    },
    
    icon(status) {
      return {
        Drizzle:	'https://image.flaticon.com/icons/svg/146/146526.svg',
        Clouds: 'https://image.flaticon.com/icons/svg/146/146517.svg',
        Rain: 'https://image.flaticon.com/icons/svg/146/146526.svg',
        Snow: 'https://image.flaticon.com/icons/svg/146/146520.svg',
        Clear: 'https://image.flaticon.com/icons/svg/146/146519.svg',
        Mist: 'https://image.flaticon.com/icons/svg/146/146518.svg',
        Storm: 'https://image.flaticon.com/icons/svg/146/146523.svg' 
      }[status];
    },
  };
}
app().init();
  
}(window, document));