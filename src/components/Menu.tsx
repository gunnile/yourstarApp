import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { home, list, person, logIn} from 'ionicons/icons';
import { connect } from '../data/connect';

const routes = {
  appPages: [
    { title: 'EVENTS', path: '/events', icon: home },
    { title: 'STARS' , path: '/stars', icon: list }
  ],
  loggedInPages : [{ title: 'USER', path: '/mypage', icon: person }],
  loggedOutPages : [{ title: 'LOGIN', path: '/login', icon: logIn }]
};


interface Pages {
  title: string,
  path: string,
  icon: { ios: string, md: string },
  routerDirection?: string
}

interface StateProps {
  isAuthenticated: boolean;
}

interface MenuProps extends RouteComponentProps, StateProps {
}

const Menu: React.FunctionComponent<MenuProps> = ({isAuthenticated}) => {

  function renderlistItems(list: Pages[]) {
    return list
      .filter(route => !!route.path)
      .map(p => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem button routerLink={p.path} routerDirection="none">
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu type="overlay" contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="outer-content">
        <IonList>
          {renderlistItems(routes.appPages)}
        </IonList>
        <IonList>
          {isAuthenticated ? renderlistItems(routes.loggedInPages) : renderlistItems(routes.loggedOutPages)}
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    isAuthenticated: state.user.isLoggedin
  }),
  component: withRouter(Menu)
})