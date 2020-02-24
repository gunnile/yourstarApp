import React, { useState, useEffect } from 'react';
import { IonToolbar, IonContent, IonBackButton, IonPage, IonButtons, IonTitle, 
  IonButton, IonHeader, IonItem, IonList, IonLabel, IonInput, IonRange, IonIcon, IonTextarea, IonRow, IonCol, IonImg } from '@ionic/react';
import './StarDetailPage.scss'
import { RouteComponentProps, useParams, useHistory } from 'react-router';
import { Star } from '../models/Star';
import ScoreChart from '../components/ScoreChart';
import 'react-rater/lib/react-rater.css'
import { getStarData, postEvaluate } from '../data/dataApi';

import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import { ScoreList } from '../models/SocreList';


interface OwnProps extends RouteComponentProps {
  star: Star;
};
  
interface StateProps {

};

interface DispatchProps { };

interface EvaluatePageProps extends OwnProps{};

const EvaluatePage: React.FC<EvaluatePageProps> = () => {
  const [score1, setScore1] = useState('0');
  const [score2, setScore2] = useState('0');
  const [score3, setScore3] = useState('0');
  const [score4, setScore4] = useState('0');
  const [score5, setScore5] = useState('0');
  const [score, setScore] = useState();
  const [scoredata, setScoreData] = useState<ScoreList[]>([]);
  const [star, setStar] = useState<Star>();
  const {id} = useParams();
  const hist = useHistory()

  useEffect(() => {
    getStarData(id!).then(star => setStar(star));
  }, [id]);

  function submitEval(){
    setScoreList()

    postEvaluate(scoredata).then(res => hist.goBack())
  }

  function setScoreList(){
    if(star)   
      scoredata.push({
          "score" : score1,
          "score_name" : star.score_list.score_list[0].id,
          "star" : id!
      },{
          "score" : score2,
          "score_name" : star.score_list.score_list[1].id,
          "star" : id!
        },{
          "score" : score3,
          "score_name" : star.score_list.score_list[2].id,
          "star" : id!
        },{
          "score" : score4,
          "score_name" : star.score_list.score_list[3].id,
          "star" : id!
        },{
          "score" : score5,
          "score_name" : star.score_list.score_list[4].id,
          "star" : id!
        })
  }

  function onIonRangeChange1(event: any){
    setScore1(event.detail.value)
  }

  function onIonRangeChange2(event: any){
    setScore2(event.detail.value)
  }

  function onIonRangeChange3(event: any){
    setScore3(event.detail.value)
  }

  function onIonRangeChange4(event: any){
    setScore4(event.detail.value)
  }

  function onIonRangeChange5(event: any){
    setScore5(event.detail.value)
  }

  if (!star) {
    return <div>star not found</div>
  }
  
  return (
    <IonPage id="star-page">
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle>{star.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding star-detail star-page-list">
        <IonRow>
          <IonCol>
              <IonImg src={star.image} alt={star.image} /> 
              {/* <p>{star.description}</p> */}
          </IonCol>
          <IonCol>
            {/* Overall : {star.score_list.overall} */}
            <ScoreChart star = {star}/>
          </IonCol>
        </IonRow>

        <IonList>
          <IonItem>
            {star.score_list.score_list[0].element} 
            <IonRange color="danger" min={0} max={100} 
              snaps={true} ticks={false} pin={true} onIonChange={onIonRangeChange1} /> 
            {score1}  
          </IonItem>
          <IonItem>
            {star.score_list.score_list[1].element}
            <IonRange color="danger" min={0} max={100} 
              snaps={true} ticks={false} pin={true} onIonChange={onIonRangeChange2} /> 
            {score2}  
          </IonItem>
          <IonItem>
            {star.score_list.score_list[2].element}
            <IonRange color="danger" min={0} max={100} 
              snaps={true} ticks={false} pin={true} onIonChange={onIonRangeChange3} /> 
            {score3}  
          </IonItem>
          <IonItem>
            {star.score_list.score_list[3].element}
            <IonRange color="danger" min={0} max={100} 
              snaps={true} ticks={false} pin={true} onIonChange={onIonRangeChange4} /> 
            {score4}
          </IonItem>
          <IonItem>
            {star.score_list.score_list[4].element} 
            <IonRange color="danger" min={0} max={100} 
              snaps={true} ticks={false} pin={true} onIonChange={onIonRangeChange5} /> 
            {score5}  
          </IonItem>  
        </IonList>

        <IonItem>
          <IonLabel position="floating">Comment</IonLabel>
          <IonTextarea rows={5}></IonTextarea>
        </IonItem>
        <IonButton expand="full" onClick= {submitEval}>Submit</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default EvaluatePage;