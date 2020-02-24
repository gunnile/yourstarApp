import React from 'react';
import { Star } from '../models/Star';
import { Event } from '../models/Event';
import { IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router';

interface EventItemProps extends RouteComponentProps {
  event: Event;
  stars: Star[];
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {

  return (
    <IonCard className="welcome-card" routerLink ={`/events/${event.id}`}>
      <img src={event.image} alt=""/>
      <IonCardHeader>
        <IonCardSubtitle>{event.title}</IonCardSubtitle>
        <IonCardTitle>{event.title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>
          {event.description}
        </p>
      </IonCardContent>
    </IonCard>
  );
};

export default withRouter(EventItem);