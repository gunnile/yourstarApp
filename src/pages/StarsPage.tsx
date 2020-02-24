import {
  IonList, IonTitle, IonToolbar, IonContent, IonPage, 
  IonButtons, IonMenuButton, IonRefresher, IonRefresherContent, IonToast, IonHeader, 
  IonGrid,
  IonRow,
  IonCol,
  IonLoading,
  IonButton,
  IonIcon} from '@ionic/react';

import React, { useEffect, useState, useRef } from 'react';
import './StarsPage.scss';
// import {Event} from '../model/Event';
import { Star } from '../models/Star';
import StarItem from '../components/StarItem';
import { getStarsData } from '../data/dataApi';



interface OwnProps { }

interface StateProps {
  stars: Star[];
}

interface DispatchProps {

}

interface StarsPageProps extends OwnProps, StateProps, DispatchProps { }

const StarsPage: React.FC<StarsPageProps> = () => {
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setShowLoading(true)

    getStarsData().then(stars => {
      setStars(stars)
      setShowLoading(false)
    });
    // eslint-disable-next-line
  }, []);
  
  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500)
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Stars</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className={`outer-content`}>
        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={'Please wait...'}
          duration={5000}
        />
        <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <IonToast
          isOpen={showCompleteToast}
          message="Refresh complete"
          duration={2000}
          onDidDismiss={() => setShowCompleteToast(false)}
        />             

        <IonList>
          <IonGrid fixed>
            <IonRow align-items-stretch>
              {stars.map(star => (
                <IonCol size="12" size-md="6" key={star.id}>
                  <StarItem
                    key={star.id}
                    star={star}
                    events={star.events}
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default StarsPage;

// export default connect<OwnProps, StateProps, DispatchProps>({
//   // mapStateToProps: (state) => ({
//   //   stars: state.star.stars
//   // }),
//   // // mapDispatchToProps: {loadStarsData},
//   component: React.memo(StarsPage)
// });
