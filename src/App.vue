<template>
  <div class="container" v-bind:id="appStatus">

    <div class="main">

        <app-header></app-header>
        <input-bar v-model="locationInput" v-on:processWeather="processWeather()"></input-bar>

        <div v-if="location.status === true">
            <location v-bind:location="location"></location>
        </div>

        <div v-if="weather.status === true">
            <weather v-bind:weather="weather"></weather>
        </div>

        <div v-if="body">

          <component v-bind:is="bodyComponent"></component>

          <div class="buttons" v-if="!locationTracked">
                <button v-on:click="TrackLocation()">{{trackStatus}}</button>
          </div>

        </div>

      </div>

  </div>
</template>

<script>

  import Input from './components/LocationInput';
  import Header from './components/Header';
  import Body from './components/Body';
  import weatherLoader from './components/weatherLoader';
  import trackLoader from './components/trackLoader';
  import Location from './components/Location';
  import Weather from './components/Weather';
  import {locationApi, weatherApi} from './plugins/axios';

  export default {

    components : {
      'input-bar' : Input,
      'app-header' : Header,
      'app-home' : Body,
      'app-weather-loader' : weatherLoader,
      'app-track-loader' : trackLoader,
      'location' : Location,
      'weather' : Weather,
    },

    data () {
      return {
        appStatus : 'default',
        tracking: false,
        trackStatus: 'Track my Location',
        currentLoad: '',
        
        weather: {
          status: false,
          temp: null,
          weather: null,
          description: null,
          location: null
        },

        location: {
          status: false,
          country: null,
          state: null,
          full: null
        },
        body: true,
        locationInput : null,
        locationTracked: false,
        bodyComponent: 'app-home',
        stat: 'home',
        support: null
      }
    },

    methods: {

      getCoords () { //get user longitube and latitube coordinates

          this.stat = 'getting coords';

        return new Promise(function(resolve, reject){

            if(navigator.geolocation){

              try {

                  console.log('getting coordinates');

                  navigator.geolocation.getCurrentPosition(positionVal => {
                  
                    //get positions values
                    const latVal = positionVal.coords.latitude.toFixed(7);
                    const lngVal = positionVal.coords.longitude.toFixed(7);

                    const coords = {
                      lat: latVal,
                      lng: lngVal
                    }

                    resolve(JSON.stringify(coords));

                  });
                    
              } catch (error) {
                    
                reject(error);
              }

            } else {

              alert('Browser not supported');
              this.Stop();

              reject('Browser not supported');

            }
               
        });

      },

      getLocation (coords) { //get users location with lng and lat coords as parameters

        this.stat = 'getting location';

        return new Promise(function(resolve, reject){

          console.log('getting location');

          locationApi.get(`?q=${coords.lat} ${coords.lng}&key=${process.env.VUE_APP_LOCATION_API}&language=en&pretty=1`).then(data => {

              console.log(data);

            if(data.data.status.code === 200 && data.data.results.length > 0){
              
              resolve(data.data.results[0]);

            } else {

              reject('An error occured');

            }

          });

        });

      },

      getWeather (location) {

        this.stat = 'getting weather';

        return new Promise(function(resolve, reject){

          weatherApi.get(`weather?q=${location}&units=metric&APPID=${process.env.VUE_APP_WEATHER_API}`).then(data => {

            if(data.status == 200){

              resolve(data.data);

            } else {

              reject('Cannot get location weather details');

            }

          }).catch( err => reject(`Cannot get location weather details: ${err}`));

        });

      },
      
      async TrackLocation () { //

        this.appStatus = 'tracking';
        this.bodyComponent = 'app-track-loader';

        if(this.tracking === true){

          this.Stop();

        } else {

          this.trackStatus = 'Stop';
          this.tracking = true;

          const coords = await this.getCoords(); // get coordinates
          console.log(coords);

          try{

            const location = await this.getLocation(JSON.parse(coords));
           
            this.location.status = true;
            this.location.country = location.components.country;
            this.location.state = location.components.state;
            this.location.full = location.formatted;
            this.locationTracked = true;
          // get weather 
            this.appStatus = 'weather';
            this.bodyComponent = 'app-weather-loader';

            this.getWeather(location.components.state).then(data => { // get weather details
              console.log(data);
              this.weather.status = true;
              this.weather.temp = data.main.temp;
              this.weather.weather = data.weather[0].main;
              this.weather.description = data.weather[0].description;

              if(data.main.temp < 20){
                this.appStatus = 'cold';
              } else {
                this.appStatus = 'warm';
              }
              
              this.body = false;

            }).catch(err => {

              alert(err);
              this.Stop();
            })


         } catch(err) {

            alert(err);
            this.Stop();

          }
        
        }

      },

      processWeather () {

        this.appStatus = 'weather';
        this.bodyComponent = 'app-weather-loader';

        this.getWeather(this.locationInput).then(data => { // get weather details

            this.weather.status = true;
            this.weather.temp = data.main.temp;
            this.weather.weather = data.weather[0].main;
            this.weather.description = data.weather[0].description;
            this.weather.location = `${data.name}, ${data.sys.country}`;
            

            if(data.main.temp < 20){
              this.appStatus = 'cold';
            } else {
              this.appStatus = 'warm';
            }
            
            this.location.status = !this.location.status;


        }).catch(err => {

          alert(err);
          this.Stop();
        })

      },

      Stop () {

          console.log('stopping');
          this.trackStatus = 'Track my Location';
          this.bodyComponent = 'app-home';
          this.tracking = false;
          this.appStatus = 'default';

      }
      
    },

    created (){
      console.log(process.env.VUE_APP_WEATHER_API);

      if(navigator.geolocation){
        this.support = true;
      }
    }

  }

</script>

<style>

  *{
    margin: 0;
    padding: 0;
  }

  body{
    font-family: 'montserrat', sans-serif;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .buttons{
    width: 100%;
    text-align: center;
  }

  .buttons > button{
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    background: rgb(57, 4, 250);
    font-weight: bold;
    font-size: 20px;
    color: #fff;
    outline: none;
    text-shadow: 0px 0px 8px #222;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    overflow: hidden;
    margin: 10px;
    box-shadow: 0px 0px 5px rgb(77, 76, 76);
    transition: 0.4s;
  }


  .buttons > button:hover{

    content: "Click to track location";
    text-shadow: 0px 0px 10px #222;
    box-shadow: 0px 0px 8px rgb(77, 76, 76);
    background: rgb(41, 5, 170);

  }

  /***APP STATUS STYLES***/
    
  div.container{

      margin: 0 auto;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: fixed;
      transition: 0.4s;
      top: -2px;
      width: 30%;
      min-height: 100vh;

  }

  .main{
    
      padding: 0 15px;
      min-height: 100vh;
      background-image: linear-gradient(to bottom, rgba(51, 35, 35, 0.061), rgba(0, 0, 0, 0.671))

  }

  div.container#tracking{
    
    background-image: url('./assets/bg.png');
    
  }

  div.container#default{
    background-image: url('./assets/bg.png');
  }


  div.container#weather{
  
    background-image: url('./assets/bg2.png');
   
  }
  
  div.container#warm{
  
    background-image: url('./assets/warm-bg.png');
   
  }
  div.container#cold{
  
    background-image: url('./assets/cold-bg.png');
   
  }


  @media screen and (max-width: 1000px){
    
    div.container{
      width: 45%;
    }

  }

  
  @media screen and (max-width: 900px){
    
    div.container{
      width: 50%;
    }

  }


  @media screen and (max-width: 768px){
    
    div.container{
      width: 60%;
    }

  }

  @media screen and (max-width: 576px){
    
    div.container{
      width: 80%;

    }

  }

  @media screen and (max-width: 400px){
    
    div.container{
      width: 90%;
    }

  }
  
  @media screen and (max-width: 350px){
    
    div.container{
      width: 100%;
    }

  }
</style>
