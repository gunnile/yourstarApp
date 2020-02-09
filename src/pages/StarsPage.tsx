import {
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem,
  IonLabel, IonList, IonListHeader, IonTitle, IonToolbar, IonContent, IonPage, 
  IonButtons, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonIcon, 
  IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, 
  getConfig,
  IonGrid,
  IonRow,
  IonCol} from '@ionic/react';

import { book, build, colorFill, grid } from 'ionicons/icons';
import React, { useEffect, useState, useRef } from 'react';
import './StarsPage.scss';
// import {Event} from '../model/Event';
import { Plugins } from '@capacitor/core';
import { Post } from '../models/Post';
import { loadStarData } from '../data/star/stars.actions';
import { connect } from '../data/connect';
import * as selectors from '../data/selectors';
import EventItem from '../components/EventItem';
import { Star } from '../models/Star';
import StarItem from '../components/StarItem';

const { Storage } = Plugins;

const ACCESS_TOKEN = 'access_token';

interface OwnProps { }

interface StateProps {
  stars: Star[];
}

interface DispatchProps {
  loadStarData: typeof loadStarData;
}

interface StarsPageProps extends OwnProps, StateProps, DispatchProps { }

const StarsPage: React.FC<StarsPageProps> = ({ stars, loadStarData}) => {
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  useEffect(() => {
    loadStarData();
    // eslint-disable-next-line
  }, []);
  
  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500)
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Stars</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className={`outer-content`}>
        <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <IonToast
          isOpen={showCompleteToast}
          message="Refresh complete"
          duration={2000}
          onDidDismiss={() => setShowCompleteToast(false)}
        />             
        
        <IonList>
          <IonGrid fixed>
            <IonRow align-items-stretch>
              {stars.map(star => (
                <IonCol size="12" size-md="6" key={star.id}>
                  <StarItem
                    key={star.id}
                    star={star}
                    events={star.events}
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    stars: state.star.stars
  }),
  mapDispatchToProps: {loadStarData},
  component: React.memo(StarsPage)
});
