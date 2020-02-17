import { ScoreList } from './../models/SocreList';
import { Plugins } from '@capacitor/core';
import { Event } from '../models/Event';
import { Star } from '../models/Star';
import { User } from '../models/User';
import { Post } from '../models/Post';
import { AccessToken } from '../models/AccessToken';
import { statement } from '@babel/template';
import { Score } from '../models/Score';

const { Storage } = Plugins;

// const locationsUrl = '/assets/data/locations.json';
// const sessionsUrl = '/assets/data/sessions.json';
// const eventsUrl = '/assets/data/events.json';
// const starsUrl = '/assets/data/stars.json';



const clientId = '1234'
const clientSecret = '1234'

const authUrl = 'http://127.0.0.1:8000/o/token/'
const evalUrl = 'http://127.0.0.1:8000/star_scores_id_list/'
const eventsUrl = 'http://localhost:8000/events/';
const starsUrl = 'http://localhost:8000/stars/';
const testUrl = 'https://jsonplaceholder.typicode.com/posts';


const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
const USERNAME = 'username';
const ACCESS_TOKEN = 'access_token';

const API_SERVER = true


export const getAccessTokenData = async () => {
    const response = await fetch(authUrl, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:  new URLSearchParams({
          grant_type : 'password',
          client_id : '1234',
          client_secret : '1234',        
          username : 'admin',
          password : 'skrjsdlf'
      })
    });

    const token = await response.json() as AccessToken;
    // await setAccessToken(user.access_token);
    console.log(token.access_token)
    
    return token;
  }

  export const postEvaluate = async (scores : ScoreList[]) => {
    // const token = localStorage.getItem(ACCESS_TOKEN)

    scores.map(async list => {
      const response = await fetch(evalUrl, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
          // 'Authorization': 'Bearer ' + token
        },
        body :  JSON.stringify({
            score : list.score,
            score_name : list.score_name,        
            star : list.star
        })
      });
    
      const jsonData =  await response.json()
    })   

    return true;
  }

export const getEventsData = async () => {
  const response = await fetch(eventsUrl,{
    method: 'GET',
    headers: {
      'Content-type':'application/json'      
    }
  });

  const jsonData =  await response.json()
  const events = jsonData.results as Event[]

  return events;
}

export const getEventData = async (id : string) => {
  const response = await fetch(eventsUrl + id,{
    method: 'GET',
    headers: {
      'Content-type':'application/json'      
    }
  });

  const jsonData =  await response.json()
  const event = jsonData as Event

  return event;
}

export const getStarsData = async () => {
  const response = await fetch(starsUrl,{
    method: 'GET',
    headers: {
      'Content-type':'application/json'      
    }
  });

  const jsonData =  await response.json()
  const stars = jsonData.results as Star[]

  return stars;
}

export const getStarData = async (id: string) => {
  const response = await fetch(starsUrl + id,{
    method: 'GET',
    headers: {
      'Content-type':'application/json'      
    }
  });

  const jsonData =  await response.json()
  const star = await jsonData as Star

  return star;
}

export const getUserData = async () => {
  const response = await Promise.all([
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: HAS_SEEN_TUTORIAL }),
    Storage.get({ key: USERNAME })]);
  const isLoggedin = await response[0].value === 'true';
  const hasSeenTutorial = await response[1].value === 'true';
  const username = await response[2].value || undefined;
  const data = {
    isLoggedin,
    hasSeenTutorial,
    username
  }
  return data;
}

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
}

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  await Storage.set({ key: HAS_SEEN_TUTORIAL, value: JSON.stringify(hasSeenTutorial) });
}

export const setUsernameData = async (username?: string) => {
  if (!username) {
    await Storage.remove({ key: USERNAME });
  } else {
    await Storage.set({ key: USERNAME, value: username });
  }
}