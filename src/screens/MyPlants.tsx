import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlantCardSecundary } from '../components/PlantCardSecundary';
import {Params} from './PlantSave';

import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { PlantProps, loadPlant, removePlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { RemovePlantModal } from '../components/RemovePlantModal';

export function MyPlants(){
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>()
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<PlantProps>();

  const navigation = useNavigation();

  async function loadStorageData(){
    const plantsStoraged = await loadPlant();
    
    if(plantsStoraged.length === 0){
      setLoading(false);
      return;
    }

    findNextWatered(plantsStoraged);
    setMyPlants(plantsStoraged);
    setLoading(false);
  }

  async function handleRemove(plant : PlantProps){    
    await removePlant(plant.id);

    setMyPlants((oldData) => 
      oldData.filter((item) => item.id !== plant.id)
    );

    findNextWatered(myPlants);
    setModalIsVisible(false);
  }
  
  function findNextWatered(plants : PlantProps[]){
    if(plants.length === 0){
      setNextWatered(undefined);
      return;
    }

    const nextTime = formatDistance(
      new Date(plants[0].dateTimeNotification).getTime(),
      new Date().getTime(),
      {locale: ptBR}
    );

    setNextWatered(
      `Não esqueça de regar a ${plants[0].name} à ${nextTime}.`
    );
  }

  function showModal(plant : PlantProps){
    setSelectedPlant(plant);
    setModalIsVisible(true);
  }

  function navigateToEditPlant(plant : PlantProps){
    navigation.navigate("PlantSave",{
      plant,
      pageType: 'edit'
    } as Params);
  }

  useEffect(() => {
    loadStorageData();
  }, []);

  if(loading){
    return(
      <Load />
    )
  }

  return(
    <View style={styles.container}>
      {
        selectedPlant && (
          <RemovePlantModal 
            isVisible={modalIsVisible}
            plant={selectedPlant}
            hideModal={() => setModalIsVisible(false)}
            handleRemove={() => handleRemove(selectedPlant)}
          />
        )
      }

      <Header pageType="MyPlants" />
      
      {
        nextWatered && (
          <View style={styles.spotlight}>
            <Image 
              source={waterdrop}
              style={styles.spotlightImage}
            />
          
            <Text style={styles.spotlightText}>
              {nextWatered}
            </Text>
          </View>
        )
      }

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>
          Próximas regadas
        </Text>

        <FlatList 
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <PlantCardSecundary 
              data={item}
              handleRemove={() => showModal(item)}
              onPress={() => navigateToEditPlant(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          style={{flex:1}}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'space-between',
    paddingHorizontal: 30,
    paddingTop: 20,
    backgroundColor: colors.background
  },

  spotlight:{
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:20
  },
  
  spotlightImage:{
    width: 60,
    height: 60
  },

  spotlightText:{
    flex: 1,
    color: colors.blue,
    fontSize: 15,
    fontFamily: fonts.text,
    lineHeight: 23,
    paddingHorizontal: 20,
  },

  plants:{
    flex: 1,
    width: '100%'
  },

  plantsTitle:{
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.heading,
    marginVertical: 20
  }

});