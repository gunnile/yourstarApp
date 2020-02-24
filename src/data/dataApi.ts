import { ScoreList } from './../models/SocreList';
import { Plugins } from '@capacitor/core';
import { Event } from '../models/Event';
import { Star } from '../models/Star';
import { User } from '../models/User';
import { AccessToken } from '../models/AccessToken';

const { Storage } = Plugins;

// const locationsUrl = '/assets/data/locations.json';
// const sessionsUrl = '/assets/data/sessions.json';
// const eventsUrl = '/assets/data/events.json';
// const starsUrl = '/assets/data/stars.json';



const clientId = '1234'
const clientSecret = '1234'
const grantType = 'password'

const authUrl = 'http://127.0.0.1:8000/o/token/'
const signUpUrl = 'http://127.0.0.1:8000/sign_up/'

const evalUrl = 'http://127.0.0.1:8000/star_scores_id_list/'
const eventsUrl = 'http://localhost:8000/events/';
const starsUrl = 'http://localhost:8000/stars/';
const userUrl = 'http://localhost:8000/users/';


export const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
const USERNAME = 'username';
const ACCESS_TOKEN = 'access_token';



export const postSignUp = async (username: string, password : string) => {
  const response = await fetch(signUpUrl, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body:  new URLSearchParams({       
        username : username,
        password : password
    })
  });


  localStorage.setItem(USERNAME, username)

  return true;
}

export const getAccessTokenData = async (username: string, password : string) => {
  const response = await fetch(authUrl, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body:  new URLSearchParams({       
        username : username,
        password : password,
        client_id : clientId,
        client_secret : clientSecret,
        grant_type : grantType
    })
  });

  const token = await response.json() as AccessToken;
  console.log(token.access_token)
  localStorage.setItem(ACCESS_TOKEN, token.access_token)
  localStorage.setItem(USERNAME, username)
  localStorage.setItem(HAS_LOGGED_IN, "LOGIN")
  
  return token;
}

export const postEvaluate = async (scores : ScoreList[]) => {
  // const token = localStorage.getItem(ACCESS_TOKEN)
  // 토큰이 만료되었을때 리프레시 토큰 과정 필요
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
  
  })   

  return true;
}

export const getUserData = async (username : string, token : string) => {
  const response = await fetch(userUrl + "?username=" + username,{
    method: 'GET',
    headers: {
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + token
    }
  });

  const jsonData =  await response.json()
  
  const users = jsonData.results as User[]

  const user = users.pop() as User
  
  return user;
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

export const getUserStateData = async () => {
  const response = await Promise.all([
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: HAS_SEEN_TUTORIAL }),
    Storage.get({ key: ACCESS_TOKEN }),
    Storage.get({ key: USERNAME })]);
  const isLoggedin = await response[0].value === 'true';
  const hasSeenTutorial = await response[1].value === 'true';
  const token = await response[2].value || undefined;
  const username = await response[3].value || undefined;
  const data = {
    isLoggedin,
    hasSeenTutorial,
    token,
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


export const setAccessTokenData = async (token?: string) => {
  if (!token) {
    await Storage.remove({ key: ACCESS_TOKEN });
  } else {
    await Storage.set({ key: ACCESS_TOKEN, value: token });
  }
}