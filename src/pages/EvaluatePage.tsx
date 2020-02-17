import React, { useState, useRef, useEffect } from 'react';
import { IonThumbnail, IonToolbar, IonContent, IonBackButton, IonPage, IonButtons, IonTitle, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig, IonAvatar, IonItem, IonList, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonListHeader, IonRippleEffect, IonTextarea, IonInput } from '@ionic/react';
import { connect } from '../data/connect';
import { options, starHalf } from 'ionicons/icons';
import './StarDetailPage.scss'
import * as selectors from '../data/selectors';
import ShareSocialFab from '../components/ShareSocialFab';
import { RouteComponentProps, useParams, useHistory } from 'react-router';
import { Star } from '../models/Star';
import ScoreChart from '../components/ScoreChart';
import 'react-rater/lib/react-rater.css'
import { getStarData, postEvaluate } from '../data/dataApi';
import { number } from 'prop-types';

import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import { Score } from '../models/Score';
import { ScoreList } from '../models/SocreList';

const IS_LOGGED_IN = "IS_LOGGED_IN"

interface OwnProps extends RouteComponentProps {
  star: Star;
};
  
interface StateProps {

};

interface DispatchProps { };

interface EvaluatePageProps extends OwnProps{};

const EvaluatePage: React.FC<EvaluatePageProps> = () => {
  const [score1, setScore1] = useState();
  const [score2, setScore2] = useState();
  const [score3, setScore3] = useState();
  const [score4, setScore4] = useState();
  const [score5, setScore5] = useState();
  const [scoredata, setScoreData] = useState<ScoreList[]>([]);
  const [star, setStar] = useState<Star>();
  const {id} = useParams();
  const hist = useHistory()

  useEffect(() => {
    getStarData(id!).then(star => setStar(star));
  }, [id]);

  function submitEval(){
    reviseScore()
    setScoreList()

    postEvaluate(scoredata).then(res => hist.goBack())

    // localStorage.getItem(IS_LOGGED_IN) ? 
    //   postEvaluate(scoredata).then(res => hist.goBack()): hist.push('/login')    
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

  function reviseScore(){
    setScore1(score1 * 20)    
    setScore2(score2 * 20)    
    setScore3(score3 * 20)    
    setScore4(score4 * 20)    
    setScore5(score5 * 20)
  }

  function onRateClick1(event: any){
    setScore1(event.rating)
  }

  function onRateClick2(event: any){
    setScore2(event.rating)
  }

  function onRateClick3(event: any){
    setScore3(event.rating)
  }

  function onRateClick4(event: any){
    setScore4(event.rating)
  }

  function onRateClick5(event: any){
    setScore5(event.rating)
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
        <div className="ion-text-center">
          <img src={star.image} alt={star.image} />
          <br />
        </div>

        <p>{star.description}</p>

        <ScoreChart star = {star}/>
        
        <IonList>
          <IonItem>
            {star.score_list.score_list[0].element} <Rater total={5} onRate={onRateClick1}/>
          </IonItem>
          <IonItem>
            {star.score_list.score_list[1].element} <Rater total={5} onRate={onRateClick2}/>
          </IonItem>
          <IonItem>
            {star.score_list.score_list[2].element} <Rater total={5} onRate={onRateClick3}/>
          </IonItem>
          <IonItem>
            {star.score_list.score_list[3].element}  <Rater total={5} onRate={onRateClick4} />
          </IonItem>
          <IonItem>
            {star.score_list.score_list[4].element}  <Rater total={5} onRate={onRateClick5}/>
          </IonItem>  
        </IonList>

        <IonItem>
            <IonLabel position="stacked">Comment</IonLabel>
            <IonInput id="comment" placeholder="Leave a comment!"/>
        </IonItem>
        <IonButton expand="full" onClick= {submitEval}>Full Button</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default EvaluatePage;