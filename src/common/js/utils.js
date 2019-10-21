import axios from 'axios'

axios.defaults.baseURL="https://api.heweather.net/s6/weather";

export const getWeather=function(type,location){
  if(type!=='now'&&type!=='forecast'&&type!=='lifestyle')throw new Error('getWeather error: type类型错误');
  if(!location) throw new Error('getWeather error: location not defined');
  return axios.get(`/${type}`,{
    params:{
      location,
      key:'f8d080810d4840468f67d430edc833b4'
    }
  }).then(function(res){
    return res.data.HeWeather6[0];
  })
}

export const initDay=async function(){
  let e=await this.getWeather('now',this.city);
  this.subWeather=e.now.cond_txt;
  this.curTemp=e.now.tmp;
  this.webIcon=e.now.cond_code;
}

export const initDayDetail=async function(){
  let fore=await this.getWeather('forecast',this.city);
  this.foreDays=fore.daily_forecast;
  let life=await this.getWeather('lifestyle',this.city);
  this.lifeStyle=life.lifestyle;
}

export const searchCity=function(location){
  if(!location) throw new Error('searchCity error: location not defined');
  return axios.get(`now`,{
    params:{
      location,
      key:'f8d080810d4840468f67d430edc833b4'
    }
  }).then(function(res){
    return res.data.HeWeather6;
  })
}
