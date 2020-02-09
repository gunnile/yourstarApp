import React, { useState } from 'react';
import { Star } from '../models/Star';
import { Event } from '../models/Event';
import { IonCard, IonCardHeader, IonItem, IonAvatar, IonCardContent, IonList, IonRow, IonCol, IonButton, IonIcon, IonActionSheet, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { logoTwitter, shareAlt, chatboxes } from 'ionicons/icons';
import { ActionSheetButton } from '@ionic/core';
import { tsConstructorType } from '@babel/types';
import {Radar, Line, Pie} from 'react-chartjs-2'

interface ChartProps {
  star: Star;
}

const ScoreChart: React.FC<ChartProps> = ({ star }) => {

    const data = {
        labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
        datasets: [{
            data: [89, 88, 90, 99]
        }]
    }

    return (
        <div className = "chart">
            <Radar
                data = {data}
                options={{
                    scale: {
                        angleLines: {
                            display: false
                        },
                        ticks: {
                            suggestedMin: 50,
                            suggestedMax: 100
                        }
                    }
                }}
            />
        </div>
    );
};

export default ScoreChart;