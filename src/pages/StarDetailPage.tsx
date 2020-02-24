import React, { useState, useRef, useEffect } from 'react';
import { IonThumbnail, IonToolbar, IonContent, IonBackButton, IonPage, IonButtons, 
  IonTitle, IonIcon, IonRefresher, IonRefresherContent, IonToast, IonHeader, IonItem, 
  IonList, IonLabel, IonListHeader, IonButton, IonRow, IonCol, IonImg } from '@ionic/react';
import { starHalf } from 'ionicons/icons';
import './StarDetailPage.scss'
import ShareSocialFab from '../components/ShareSocialFab';
import { RouteComponentProps, useParams, useHistory } from 'react-router';
import { Star } from '../models/Star';
import ScoreChart from '../components/ScoreChart';
import { getStarData } from '../data/dataApi';

const ACCESS_TOKEN = 'access_token';
const BASE_URL = 'http://127.0.0.1:8000';

interface OwnProps extends RouteComponentProps{

}
  
interface StateProps {
  star: Star;
  scores: [];
  labels: [];
};

;

interface StarPageProps extends OwnProps, StateProps{};

const StarDetailPage: React.FC<StarPageProps> = () => {
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const [star, setStar] = useState<Star>();  
  const {id} = useParams();
  const hist = useHistory()

  useEffect(() => {
    getStarData(id!).then(star =>  setStar(star));
  }, [id]);
  
  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500)
  };

  function onStarClick(){
    console.log(localStorage.getItem("testst"))

    if(localStorage.getItem(ACCESS_TOKEN) === null
        && localStorage.getItem(ACCESS_TOKEN) === undefined){
          hist.push('/login')
        }else{
          hist.push('/evaluate/'+id!)
        }
  }

  if (!star) 
    return <div>star not found</div>  

  return (
    <IonPage id="star-page">
      <IonHeader>
        <IonToolbar color='danger'>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>{star.name}</IonTitle>
          <IonButtons onClick = {onStarClick} slot="end">
            <IonButton onClick={() => {}}>
              <IonIcon icon={starHalf} size="large" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding star-detail star-page-list">
        <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <IonToast
          isOpen={showCompleteToast}
          message="Refresh complete"
          duration={2000}
          onDidDismiss={() => setShowCompleteToast(false)}/>       


        <IonRow>
          <IonCol>
              <IonImg src={star.image} alt={star.image} /> 
              {/* <p>{star.description}</p> */}
          </IonCol>
          <IonCol>
            {/* Overall : {star.score_list.overall} */}
            <ScoreChart star = {star}/>
          </IonCol>
        </IonRow>

        <IonList>
          <IonListHeader>
            Events
          </IonListHeader>

          {star.events.map(event => (
            <IonItem key = {event.id} routerLink ={`/events/${event.id}`}>
              <IonThumbnail slot="start">
                <img src={event.image} alt=""/>
              </IonThumbnail>
              <IonLabel>
                <h2>{event.title}</h2>
                <h3>{event.description}</h3>
              </IonLabel>
            </IonItem>
          ))}
          </IonList>

          <IonList>

          <IonListHeader>
            Feeds
          </IonListHeader>
            {star.star_eval.map(evalu => (
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

      <ShareSocialFab />
      </IonContent>
    </IonPage>
  );
};

export default StarDetailPage;