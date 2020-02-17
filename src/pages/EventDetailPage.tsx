import React, { useState, useRef, useEffect } from 'react';
import { IonToolbar, IonContent, IonBackButton, IonPage, IonButtons, IonTitle, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig, IonAvatar, IonItem, IonList, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonListHeader, IonThumbnail } from '@ionic/react';
import { connect } from '../data/connect';
import { options } from 'ionicons/icons';
import './EventsPage.scss'
import * as selectors from '../data/selectors';
import ShareSocialFab from '../components/ShareSocialFab';
import { Event } from '../models/Event';
import { RouteComponentProps, withRouter, useParams } from 'react-router';
import { Star } from '../models/Star';
import { getEventData } from '../data/dataApi';
import { match } from "react-router-dom";


interface OwnProps extends RouteComponentProps{
  id: string;
};
  
interface StateProps {

};

interface DispatchProps { };

interface EventPageProps extends OwnProps{};

const EventDetailPage: React.FC<OwnProps> = ({match}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [event, setEvent] = useState<Event>();
  const {id} = useParams();

  useEffect(() => {
    getEventData(id!).then(event => setEvent(event));
  }, []);
  

  if (!event) {
    return <div>Event not found</div>
  }

  return (
    <IonPage id="event-page">
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>{event.title}</IonTitle>

          <IonButtons slot="end">
            <IonButton onClick={() => setShowFilterModal(true)}>
              <IonIcon icon={options} slot="icon-only" />}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding event-detail event-page-list">
        <div className="ion-text-center">
          <img src={event.image} alt={event.image} />
          <br />
        </div>

        <p>{event.description}</p>

        <IonList>
          <IonListHeader>
            Stars
          </IonListHeader>

          {event.star_list.map(star => (
            <IonItem routerLink ={`/stars/${star.id}`}>
              <IonThumbnail slot="start">
                <img src={star.image} alt=""/>
              </IonThumbnail>
              <IonLabel>
                <h2>{star.name}</h2>
                <h3>{star.description}</h3>
              </IonLabel>
            </IonItem>
          ))}
          </IonList>

      <ShareSocialFab />
      </IonContent>
    </IonPage>
  );
};

export default EventDetailPage;

// export default connect({
//     // mapStateToProps: (state, ownProps) => ({
//     //   event:  selectors.getEventItem(state, ownProps)
//     // }),
//     component: EventDetailPage
// });