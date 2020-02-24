import React, { useState, useEffect } from 'react';
import { Star } from '../models/Star';
import {Radar} from 'react-chartjs-2'

interface ChartProps {
  star: Star
}

const ScoreChart: React.FC<ChartProps> = ({star}) => {
    const [scores] = useState<Number[]>([]);
    const [labels] = useState<String[]>([]);

    useEffect(()=>{
        star.score_list.score_list.map(l => {
            labels.push(l.element)
            scores.push(parseInt(l.average))
        })
    }, [star])


    const data = {
        labels: labels,
        datasets:[{
            data: scores,
            fill: true
        }]
         
    }

    return (
        // <div className = "chart">
            <Radar
                data = {data}
                width = {5}
                height = {1}
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
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    
                }}
                

            />
        // </div>
    );
};

export default ScoreChart;