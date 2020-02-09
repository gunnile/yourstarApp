import { Plugins } from '@capacitor/core';
import { Event } from '../models/Event';
import { Star } from '../models/Star';
import { User } from '../models/User';
import { Post } from '../models/Post';

const { Storage } = Plugins;

const locationsUrl = '/assets/data/locations.json';
const sessionsUrl = '/assets/data/sessions.json';
const eventsUrl = '/assets/data/events.json';
const starsUrl = '/assets/data/stars.json';



const clientId = '1234'
const clientSecret = '1234'

const authUrl = 'http://localhost:8000/o/token/'
// const eventsUrl = 'https://localhost:8000/events/';
// const starsUrl = 'https://localhost:8000/stars/';
const testUrl = 'https://jsonplaceholder.typicode.com/posts';


const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
const USERNAME = 'username';
const ACCESS_TOKEN = 'access_token';


export const getAccessTokenData = async () => {
    const response = await fetch(authUrl, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({
        grant_type : 'password',
        client_id : '1234',
        client_secret : '1234',        
        username : 'admin',
        password : 'skrjsdlf'
      })
    });

    const user = await response.json();
    // await setAccessToken(user.access_token);
    return user;
  }

  // export const getEventData = async () => {
    // const token = await Storage.get({key:ACCESS_TOKEN});
    // const access_token = token.value as string;
    // const response = await fetch(eventsUrl, {
    //   headers: {
    //     'Content-type':'application/json',
    //     access_token : access_token
    //   }
    // });

  // }

export const getEventData = async () => {
  const response = await fetch(eventsUrl);
  const events =  await response.json() as Event[]
  const data = {
    events
  }
  return data;
}

export const getStarData = async () => {
  const response = await fetch(starsUrl);
  const stars =  await response.json() as Star[]
  const data = {
    stars
  }
  return data;
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