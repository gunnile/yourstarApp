import React, { useState, useRef, useEffect } from 'react';
import { IonThumbnail, IonToolbar, IonContent, IonBackButton, IonPage, IonButtons, 
  IonTitle, IonHeader, IonItem, IonList, IonLabel, IonListHeader, IonAvatar, IonImg } from '@ionic/react';
import { connect } from '../data/connect';
import './StarDetailPage.scss'
import { RouteComponentProps, useParams, useHistory } from 'react-router';
import { getUserData } from '../data/dataApi';
import { User } from '../models/User';

const ACCESS_TOKEN = 'access_token';
const BASE_URL = 'http://127.0.0.1:8000';

interface OwnProps extends RouteComponentProps{

}
  
interface StateProps {
  isAuthenticated: boolean;
  username: string;
  token: string;
};

;

interface StarPageProps extends OwnProps, StateProps{};

const UserPage: React.FC<StarPageProps> = ({username, token}) => {
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [, setShowCompleteToast] = useState(false);
 
  const [user, setUser] = useState<User>();  
  const {id} = useParams();
  const hist = useHistory()

  useEffect(() => {
    getUserData(username, token).then(user =>  {
      setUser(user)
      console.log(user!.username)
    });
  }, []);
  


  if (!user) 
    return <div>user not found</div>  

  return (
    <IonPage id="user-page">
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle>{user.username}</IonTitle>

            {/* <IonItem onClick = {onStarClick} slot="end">
              <IonIcon icon={starHalf} size="large" />
            </IonItem> */}
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding user-detail">
        <div className="ion-text-center">
          <IonAvatar>
            <IonImg src={user.image} alt="Ionic logo"/>
          </IonAvatar>
          <br />
        </div>

        <IonItem>
          Overall
        </IonItem>
        
        <IonList>
          <IonListHeader>
            My Feeds
          </IonListHeader>

          {user.user_star_score.map(evalu => (
            <IonItem routerLink ={`/stars/${evalu.star.id}`}>
              <IonThumbnail slot="start">
                <img src= {BASE_URL + evalu.star.image} alt=""/>
              </IonThumbnail>
              <IonLabel>
                <h2>{evalu.star.name}</h2>
                <h3>Feed : {evalu.feed}</h3>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    isAuthenticated: state.user.isLoggedin,
    username: state.user.username!,
    token: state.user.token!
  }),
  component: UserPage
})