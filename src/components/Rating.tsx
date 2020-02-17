import React, { useState, useEffect } from 'react';
import { Star } from '../models/Star';
import { Event } from '../models/Event';
import { IonCard, IonCardHeader, IonItem, IonAvatar, IonCardContent, IonList, IonRow, IonCol, IonButton, IonIcon, IonActionSheet, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { logoTwitter, shareAlt, chatboxes } from 'ionicons/icons';
import { ActionSheetButton } from '@ionic/core';
import { tsConstructorType } from '@babel/types';
import {Radar, Line, Pie} from 'react-chartjs-2'
import { Score } from '../models/Score';
import Rater from 'react-rater';
import ScoreChart from './ScoreChart';

interface ChartProps {
  star: Star
}

const Rating: React.FC<ChartProps> = ({star}) => {
    const [ratings, setRatings] = useState<Number[]>([]);

    useEffect(()=>{
        
    }, [star])

    return (
        <IonList>
          <IonItem>
            <Rater total={5} rating={0}/>
          </IonItem>
          <IonItem>
            <Rater total={5} rating={0}/>
          </IonItem>
          <IonItem>
            <Rater total={5} rating={0}/>
          </IonItem>
          <IonItem>
            <Rater total={5} rating={0}/>
          </IonItem>
          <IonItem>
            <Rater total={5} rating={0}/>
          </IonItem>  
        </IonList>
    );
};

export default ScoreChart;