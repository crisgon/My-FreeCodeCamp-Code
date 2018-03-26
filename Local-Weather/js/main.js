function $ (element) {
  return document.querySelector(element);
}

city = $('[data-js="city"]');
temp = $('[data-js="temp"]');
description = $('[data-js="description"]');
img = $('img');
console.log(img);

if("geolocation" in navigator)
  getLocation();
else
  alert('Browser does not support geolocation')

  

  function getLocation () {
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    conection (lat,long);
  });
}

function conection (lat,long) {
  const apiConect = new XMLHttpRequest();
  apiConect.open('GET', 'https://fcc-weather-api.glitch.me/api/current?lat='+ lat +'&lon=' + long);
  apiConect.send();
  apiConect.addEventListener('load', function() {
  const response = JSON.parse(apiConect.responseText);
  changeHtml(response);
});
}


function changeHtml (response) {
  city.innerHTML = response.name + ", " + response.sys.country;
  description.innerHTML = response.weather[0].main + ", " + response.weather[0].description;
  temp.innerHTML = Math.round(response.main.temp) + " C°";
  var image = icon(response.weather[0].main);
  img.setAttribute('src', image);
  console.log(response);
  console.log(response.weather[0].description);
}




function icon (status) {
  var icons = {
    Drizzle:	'https://image.flaticon.com/icons/svg/146/146526.svg',
    Clouds: 'https://image.flaticon.com/icons/svg/146/146517.svg',
    Rain: 'https://image.flaticon.com/icons/svg/146/146526.svg',
    Snow: 'https://image.flaticon.com/icons/svg/146/146520.svg',
    Clear: 'https://image.flaticon.com/icons/svg/146/146519.svg',
    Mist: 'https://image.flaticon.com/icons/svg/146/146518.svg',
    Storm: 'https://image.flaticon.com/icons/svg/146/146523.svg' 
  }

  return icons[status];
}
