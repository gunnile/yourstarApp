import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Menu from './components/Menu';
import { Plugins } from '@capacitor/core';
import { Event } from './models/Event';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { loadEventData } from './data/event/events.actions';
import { connect } from './data/connect';
import { AppContextProvider } from './data/AppContext';
import EventDetailPage from './pages/EventDetailPage';
import EventsPage from './pages/EventsPage';
import StarsPage from './pages/StarsPage';
import StarDetailPage from './pages/StarDetailPage';
import EvaluatePage from './pages/EvaluatePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserPage from './pages/UserPage';

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  );
};




const ACCESS_TOKEN = 'access_token';

const { Storage } = Plugins;

export const setAccessTokenInData = async (access_token: string) => {
  await Storage.set({ key: ACCESS_TOKEN, value: access_token});
}

interface StateProps {
  events: Event[];
}

interface DispatchProps {
  // loadAccessTokenData: typeof loadAccessTokenData;
  loadEventData: typeof loadEventData;
}

interface IonicAppProps extends StateProps, DispatchProps { }

const IonicApp: React.FC<IonicAppProps> =  () => {
  useEffect(() => {
    // loadAccessTokenData();    
    // eslint-disable-next-line
  }, []);
  
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu/>
          <IonRouterOutlet id="main">
            <Route path="/events" component={EventsPage} exact={true} />
            <Route path="/stars" component={StarsPage} exact={true} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/events/:id" component={EventDetailPage} />
            <Route path="/stars/:id" component={StarDetailPage} />
            <Route path="/evaluate/:id" component={EvaluatePage} />
            <Route path="/mypage" component={UserPage} />
            <Route path="/" render={() => <Redirect to="/events"/> } exact={true} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  component: IonicApp
});