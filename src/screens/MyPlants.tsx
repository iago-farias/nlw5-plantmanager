import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';

import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlantCardSecundary } from '../components/PlantCardSecundary';

import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { PlantProps, loadPlant, removePlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function MyPlants(){
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>()

  async function loadStorageData(){
    const plantsStoraged = await loadPlant();

    const nextTime = formatDistance(
      new Date(plantsStoraged[0].dateTimeNotification).getTime(),
      new Date().getTime(),
      {locale: ptBR}
    );

    setNextWatered(
      `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}.`
    );

    setMyPlants(plantsStoraged);
    setLoading(false);
  }

  function handleRemove(plant : PlantProps){
      Alert.alert('Remover', `Deseja remover a ${plant.name}?`,[
        {
          text: 'Não 🙏',
          style: 'cancel'
        },
        {
          text: 'Sim 😥',
          onPress: async () => {
            try {
            await removePlant(plant.id);
              setMyPlants((oldData) => 
                oldData.filter((item) => item.id !== plant.id)
              );

            }catch(error) {
              Alert.alert('Não foi possível remover! 😥');
            }
          }
        }
      ]);
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
      <Header />

      <View style={styles.spotlight}>
        <Image 
          source={waterdrop}
          style={styles.spotlightImage}
        />
        <Text style={styles.spotlightText}>
          {nextWatered}
        </Text>
      </View>

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
              handleRemove={() => handleRemove(item)}
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