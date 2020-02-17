import React, { useState, useEffect } from 'react';
import { Star } from '../models/Star';
import { Event } from '../models/Event';
import { IonCard, IonCardHeader, IonItem, IonAvatar, IonCardContent, IonList, IonRow, IonCol, IonButton, IonIcon, IonActionSheet, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { logoTwitter, shareAlt, chatboxes } from 'ionicons/icons';
import { ActionSheetButton } from '@ionic/core';
import { tsConstructorType } from '@babel/types';
import {Radar, Line, Pie} from 'react-chartjs-2'
import { Score } from '../models/Score';

interface ChartProps {
  star: Star
}

const ScoreChart: React.FC<ChartProps> = ({star}) => {
    const [scores, setScores] = useState<Number[]>([]);
    const [labels, setLabels] = useState<String[]>([]);

    useEffect(()=>{
        star.score_list.score_list.map(l => {
            labels.push(l.element)
            scores.push(parseInt(l.average))
        })
    }, [star])


    const data = {
        labels: labels,
        datasets:[{
            data: scores
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
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    },
                    legend:{
                        display: false
                    }
                }}

            />
        </div>
    );
};

export default ScoreChart;