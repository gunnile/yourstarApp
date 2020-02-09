import React, { useState } from 'react';
import { Star } from '../models/Star';
import { Event } from '../models/Event';
import { IonCard, IonCardHeader, IonItem, IonAvatar, IonCardContent, IonList, IonRow, IonCol, IonButton, IonIcon, IonActionSheet, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { logoTwitter, shareAlt, chatboxes } from 'ionicons/icons';
import { ActionSheetButton } from '@ionic/core';

interface EventItemProps {
  event: Event;
  stars: Star[];
}

const EventItem: React.FC<EventItemProps> = ({ event, stars }) => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionSheetButtons, setActionSheetButtons] = useState<ActionSheetButton[]>([]);
  const [actionSheetHeader, setActionSheetHeader] = useState('');

  return (
   <> 
    <IonCard className="welcome-card" routerLink ={`/event/${event.id}`}>
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
    </>
  );
};

export default EventItem;