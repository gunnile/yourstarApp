import React, { useState } from 'react';
import { Star } from '../models/Star';
import { Event } from '../models/Event';
import { IonCard, IonCardHeader, IonItem, IonAvatar, IonCardContent, IonList, IonRow, IonCol, IonButton, IonIcon, IonActionSheet, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { logoTwitter, shareAlt, chatboxes } from 'ionicons/icons';
import { ActionSheetButton } from '@ionic/core';

interface StarItemProps {
  star: Star;
  events: Event[];
}

const StarItem: React.FC<StarItemProps> = ({ star }) => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionSheetButtons, setActionSheetButtons] = useState<ActionSheetButton[]>([]);
  const [actionSheetHeader, setActionSheetHeader] = useState('');

  return (
   <> 
    <IonCard className="welcome-card" routerLink ={`/star/${star.id}`}>
      <img src={star.image} alt=""/>
      <IonCardHeader>
        <IonCardSubtitle>{star.name}</IonCardSubtitle>
        <IonCardTitle>{star.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>
          {star.description}
        </p>
      </IonCardContent>
    </IonCard>
    </>
  );
};

export default StarItem;