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
import './EventsPage.scss';
// import {Event} from '../model/Event';
import { Plugins } from '@capacitor/core';
import { Post } from '../models/Post';
import { Event } from '../models/Event';
import { loadEventData } from '../data/event/events.actions';
import { connect } from '../data/connect';
import * as selectors from '../data/selectors';
import EventItem from '../components/EventItem';

interface Events {
  id: number;
  date: string;
  name: string;
  image: string;
  description: string;
  starIds: number[];
}

const { Storage } = Plugins;

const eventsUrl = 'https://localhost:8000/events/';
const testUrl = 'https://jsonplaceholder.typicode.com/posts';

const ACCESS_TOKEN = 'access_token';

interface OwnProps { }

interface StateProps {
  events: Event[];
}

interface DispatchProps {
  loadEventData: typeof loadEventData;
}

interface EventPageProps extends OwnProps, StateProps, DispatchProps { }

const EventsPage: React.FC<EventPageProps> = ({ events, loadEventData}) => {
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  useEffect(() => {
    loadEventData();
    // eslint-disable-next-line
  }, []);
  
  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500)
  };

  function renderlistItems(list: Event[]) {
    return list
      .map(e => (
          <IonCard className="welcome-card" routerLink ={`/event/${e.id}`}>
            <img src={e.image} alt=""/>
            <IonCardHeader>
              <IonCardSubtitle>{e.title}</IonCardSubtitle>
              <IonCardTitle>{e.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>
                {e.description}
              </p>
            </IonCardContent>
          </IonCard>
      ));
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Events</IonTitle>
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
              {events.map(event => (
                <IonCol size="12" size-md="6" key={event.id}>
                  <EventItem
                    key={event.id}
                    event={event}
                    stars={event.star_list}
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
    events: state.event.events
  }),
  mapDispatchToProps: {loadEventData},
  component: React.memo(EventsPage)
});
