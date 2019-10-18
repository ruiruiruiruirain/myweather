import axios from 'axios'
axios.defaults.baseURL="https://free-api.heweather.net/s6/weather";
export const getWeather=function(type,location){
  return axios.get(`/${type}`,{
    params:{
      location,
      key:'f8d080810d4840468f67d430edc833b4'
    }
  }).then(function(res){
    return res.data.HeWeather6[0];
  })
}
