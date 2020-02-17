import React, { useState, useRef, useEffect } from 'react';
import { IonThumbnail, IonToolbar, IonContent, IonBackButton, IonPage, IonButtons, IonTitle, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig, IonAvatar, IonItem, IonList, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonListHeader } from '@ionic/react';
import { connect } from '../data/connect';
import { options, starHalf } from 'ionicons/icons';
import './StarDetailPage.scss'
import * as selectors from '../data/selectors';
import ShareSocialFab from '../components/ShareSocialFab';
import { RouteComponentProps, useParams } from 'react-router';
import { Star } from '../models/Star';
import ScoreChart from '../components/ScoreChart';
import { getStarData } from '../data/dataApi';

interface OwnProps extends RouteComponentProps{

}
  
interface StateProps {
  star: Star;
  scores: [];
  labels: [];
};

interface DispatchProps { };

interface StarPageProps extends OwnProps, StateProps{};

const StarDetailPage: React.FC<StarPageProps> = () => {
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const [star, setStar] = useState<Star>();  
  const {id} = useParams();

  useEffect(() => {
    getStarData(id!).then(star =>  setStar(star));
  }, [id]);
  
  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500)
  };

  if (!star) 
    return <div>star not found</div>  

  return (
    <IonPage id="star-page">
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle>{star.name}</IonTitle>

            <IonItem routerLink ={`/evaluate/${star.id}`} slot="end">
              <IonIcon icon={starHalf} size="large" />
            </IonItem>
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

        <div className="ion-text-center">
          <img src={star.image} alt={star.image} />
          <br />
        </div>

        <p>{star.description}</p>
        <IonItem>
          Overall : {star.score_list.overall}
        </IonItem>

        <ScoreChart star = {star}/>
        
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
            
          </IonList>

      <ShareSocialFab />
      </IonContent>
    </IonPage>
  );
};

export default StarDetailPage;