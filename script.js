window.onload = ready;

function ready(){
  
  var btns = document.getElementsByTagName("button");

  for (const btn of btns){
    btn.onclick = getWeather;
  }
  
  //variable for html elements
  var out_location = document.getElementById("location");
  var out_icon= document.getElementById("icon");
  var out_temp = document.getElementById("temperature");
  var out_cond = document.getElementById("conditions");
  var out_humid = document.getElementById("humidity");


  function getWeather(){
    var city = this.innerHTML;
    //var to hold my APIkey
    const myAPIkey = "bec2988d39b6aa2667fe623fd15759b7";

    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + myAPIkey + "&units=metric";
    console.log(url);

    //retrieve api data
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
      if ( xhr.readyState === 4) {
        if ( xhr.status === 200 ){
          var data = xhr.response;
          console.log(data);

          //output api data to html
          out_location.innerHTML = data.name;
          out_temp.innerHTML = data.main.temp;
          out_cond.innerHTML = data.weather[0].description;
          out_humid.innerHTML = data.main.humidity;

          //weather icon
          const iconId = data.weather[0].icon;
          const iconUrl = ("<img src='http://openweathermap.org/img/wn/" + iconId +"@2x.png'>");
          out_icon.innerHTML = iconUrl;

        }else{
          //handle the error
          out_location.innerHTML = "API call was unsuccessful";
          console.log(xhr.status);
        }
      }
    }
    xhr.open('GET', url ,true);
    xhr.responseType = "json";
    xhr.send(null);
    document.getElementById("output").style.display="block";

  }
  
}
