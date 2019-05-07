# Weather App (Vanilla Javascript)

Web application that geolocates the user and gives informations about the weather of his location.

### Informations given
The web application gives the location name (city or borough if possible), the temperature that can be displayed in Celsius or Fahrenheit. It also display a description about the weather (overcast cloud, snow, etc.). Finally, the web app retrieve the correct image (icon) to illustrate the actual weather.

### Workflow
1. Geolocate the user by retrieving the latitude and longitude 
2. Send a request with the coordinates (lat. & long.) to the weather API
3. Get the JSON data and process it
4. Display the processed data on the web page, and let the user choose the formula (Celsius or Fahrenheit)