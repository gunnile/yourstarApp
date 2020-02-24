import {
  IonList, IonTitle, IonToolbar, IonContent, IonPage, 
  IonButtons, IonMenuButton, IonRefresher, IonRefresherContent, IonToast, IonHeader, 
  IonGrid,
  IonRow,
  IonCol,
  IonLoading} from '@ionic/react';

import React, { useEffect, useState, useRef } from 'react';
import './EventsPage.scss';

import { loadEventData } from '../data/event/events.actions';
import EventItem from '../components/EventItem';
import { AccessToken } from '../models/AccessToken';
// import { loadAccessTokenData } from '../data/user/user.actions';
import { getEventsData } from '../data/dataApi';
import { Event } from '../models/Event';
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps {
  id: string;
}

interface StateProps {
  events: Event[];
  token: AccessToken;
}

interface DispatchProps {
  loadEventData: typeof loadEventData;
}

interface EventPageProps extends OwnProps, StateProps, DispatchProps { }

const EventsPage: React.FC<EventPageProps> = () => {
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setShowLoading(true)
    getEventsData().then(events => {
      setEvents(events)
      setShowLoading(false)
    });
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
          <IonTitle>Events</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className={`outer-content`}>
        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={'Please wait...'}
          duration={5000}
        />
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

export default EventsPage;

// export default connect<OwnProps, StateProps, DispatchProps>({
//   // mapStateToProps: (state) => ({
//   //   events: state.event.events,
//   //   token: state.user.token
//   // }),
//   // mapDispatchToProps: {loadEventData},
//   component: React.memo(EventsPage)
// });
