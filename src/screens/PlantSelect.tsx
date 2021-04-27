import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import api from '../services/api';
import {PlantProps} from '../libs/storage';

import { Header } from '../components/Header';
import { EnviromentButton } from '../components/EnviromentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';
 
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentProps {
  key: string;
  title: string;
}

export function PlantSelect(){
  const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const navigation = useNavigation();

  async function fetchEnviroments(){
    const { data } = await api
    .get('plants_environments?_sort=title&_order=asc');

    setEnviroments([
      {
        key: 'all',
        title: 'Todos'
      },
      ...data
    ]);
  }

  async function fetchPlants(){
    const { data } = await api
    .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);   

    if(!data){
      return setIsLoading(true);
    }

    if(page > 1){
      setPlants(oldValue => [...oldValue, ...data]);
      setFilteredPlants(oldValue => [...oldValue, ...data]);
    }else {
      setPlants(data);
      setFilteredPlants(data);
    }
    setIsLoading(false);
    setLoadingMore(false);
  }

  function handleEnviromentSelected(enviroment : string){
    setEnviromentSelected(enviroment);

    if(enviroment === 'all'){
      return setFilteredPlants(plants);
    }

    const filtered = plants.filter(plant => 
      plant.environments.includes(enviroment)  
    );

    setFilteredPlants(filtered);
  }

  function handleFetchMore(distance : number){
    if(distance < 1){
      return;
    }

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }

  function handlePlantSelect(plant : PlantProps){
    navigation.navigate("PlantSave", {plant});
  }
  
  useEffect(() => {
    fetchEnviroments();
  }, []);
  
  useEffect(() => {
    fetchPlants();
  }, []);

  if(isLoading){
    return(
      <Load />
    )
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>
          Em qual ambiente
        </Text>

        <Text style={styles.subTitle}>
          você quer colocar sua planta?
        </Text>

      </View>

      <View>
        <FlatList 
          data={enviroments}
          keyExtractor={(item => item.key)}
          renderItem={({ item }) => (
            <EnviromentButton 
              title={item.title}
              isActive={enviromentSelected === item.key}
              onPress={() => handleEnviromentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <PlantCardPrimary 
              data={item}
              onPress={() => handlePlantSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({distanceFromEnd}) => handleFetchMore(distanceFromEnd)}
          ListFooterComponent={
            loadingMore 
            ? (<ActivityIndicator color={colors.green} />) 
            : null
          }
        />    
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: colors.background,
    paddingTop: 20
  },

  header:{
    paddingHorizontal: 30
  },

  title:{
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 30
  },

  subTitle:{
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.text,
    lineHeight: 20,
  },

  enviromentList:{
    height:40,
    justifyContent: 'center',
    marginLeft: 32,
    paddingRight:32,
    marginVertical: 32,
  },

  plants:{
    flex:1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  }
});