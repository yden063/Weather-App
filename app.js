window.addEventListener('load', () => {
  let long, lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition
      (
        // Success callback
        currentPosition => {
          long = currentPosition.coords.longitude;
          lat = currentPosition.coords.latitude;
        },
        // Error callback
        errorPosition => {
          console.log(errorPosition.message);
          document.getElementsByClassName('location-timezone')[0].innerHTML = errorPosition.message;
        }
      );
  } else {
    console.log('error');
    document.getElementsByClassName('location-timezone').innerHTML = "Geolocation is not supported by your navigator!";
  }
});