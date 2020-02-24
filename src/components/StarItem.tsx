import React, { useState, useEffect } from 'react';
import { Star } from '../models/Star';
import { Event } from '../models/Event';
import { IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { ActionSheetButton } from '@ionic/core';

interface StarItemProps {
  star: Star;
  events: Event[];
}

const StarItem: React.FC<StarItemProps> = ({ star }) => {
  const [] = useState(false);
  const [] = useState<ActionSheetButton[]>([]);
  const [] = useState('');

  useEffect(() => {
    if(star.type === "1"){
      star.type = "힙합"
    }else if(star.type === "2"){
      star.type = "정치"
    }

  })
  
  return (
   <> 
    <IonCard className="welcome-card" routerLink ={`/stars/${star.id}`}>
      <img src={star.image} alt=""/>
      <IonCardHeader>
        <IonCardSubtitle>{star.type}</IonCardSubtitle>
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