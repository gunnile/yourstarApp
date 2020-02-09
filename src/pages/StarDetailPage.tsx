import React, { useState, useRef } from 'react';
import { IonToolbar, IonContent, IonBackButton, IonPage, IonButtons, IonTitle, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig, IonAvatar, IonItem, IonList, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonListHeader } from '@ionic/react';
import { connect } from '../data/connect';
import { options } from 'ionicons/icons';
import './StarDetailPage.scss'
import * as selectors from '../data/selectors';
import ShareSocialFab from '../components/ShareSocialFab';
import { RouteComponentProps } from 'react-router';
import { Star } from '../models/Star';
import ScoreChart from '../components/ScoreChart';

interface OwnProps extends RouteComponentProps {
  star: Star;
  events: Event[];
};
  
interface StateProps {

};

interface DispatchProps { };

interface StarPageProps extends OwnProps{};

const StarDetailPage: React.FC<StarPageProps> = ({star}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);

  if (!star) {
    return <div>Star not found</div>
  }

  return (
    <IonPage id="star-page">
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>{star.name}</IonTitle>

          <IonButtons slot="end">
            <IonButton onClick={() => setShowFilterModal(true)}>
              <IonIcon icon={options} slot="icon-only" />}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding star-detail star-page-list">
        <div className="ion-text-center">
          <img src={star.image} alt={star.image} />
          <br />
        </div>

        <p>{star.description}</p>

        <ScoreChart
            star = {star}
        />

        
        <IonList>
          <IonListHeader>
            Events
          </IonListHeader>

          {star.events.map(event => (
            <IonItem routerLink ={`/event/${event.id}`}>
              <IonAvatar slot="start">
                <img src={event.image} alt=""/>
              </IonAvatar>
              <IonLabel>
                <h2>{event.title}</h2>
                <h3>{event.description}</h3>
              </IonLabel>
            </IonItem>
          ))}
          </IonList>

      <ShareSocialFab />
      </IonContent>
    </IonPage>
  );
};

export default connect({
    mapStateToProps: (state, ownProps) => ({
      star:  selectors.getStarItem(state, ownProps)
    }),
    component: StarDetailPage
});