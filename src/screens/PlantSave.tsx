import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {SvgFromUri} from 'react-native-svg';
import {useRoute, useNavigation} from '@react-navigation/native';
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';
import {PlantProps, savePlant} from '../libs/storage';

import { Button } from '../components/Button';

import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export interface Params {
  plant: PlantProps,
  pageType: 'save' | 'edit'
}

const buttonTitles = {
  save: 'Cadastrar planta',
  edit: 'Confirmar alterações'
}

export function PlantSave(){
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const route = useRoute();
  const navigation = useNavigation();
  const {plant, pageType} = route.params as Params;

  function handleChangeTime(event : Event, dateTime: Date | undefined){
    if(Platform.OS === 'android'){
      setShowDatePicker(oldState => !oldState);
    }

    if(dateTime && isBefore(dateTime, new Date())){
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha uma hora no futuro! ⏰');
    }

    if(dateTime){
      setSelectedDateTime(dateTime);
    }
  }

  function handleOpenDateTimePickerAndroid(){
    setShowDatePicker(oldState => !oldState);
  }

  async function handleSave(){       
    try{
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      });

      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar de cuidar da sua plantinha com muito cuidado.',
        buttonTitle: 'Muito Obrigado :D',
        icon: 'hug',
        nextScreenName: 'PlantSelect'
      });
    } catch(err) {
      Alert.alert('Não foi possível salvar. 😥');     
    }
  }

  async function handleEdit(){

  }

  useEffect(() => {
    if(plant.hour){
      const [hour, minute] = plant.hour.split(':');
      const date = new Date();
      date.setHours(Number(hour), Number(minute));

      setSelectedDateTime(date);
    }
  }, []);

  return(
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1}}
    >
      <View style={styles.container}>
        <View style={styles.plantInfoContainer}>

          <SvgFromUri 
            uri={plant.photo}
            width={150}
            height={150}
          />

          <Text style={styles.plantName}>
            {plant.name}
          </Text>

          <Text style={styles.plantAbout}>
            {plant.about}
          </Text>
        </View>

        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image 
              source={waterdrop}
              style={styles.tipImage}
            />

            <Text style={styles.tipText}>
            {plant.water_tips}
            </Text>
          </View>

          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado:
          </Text>

          {
            showDatePicker && (
              <DateTimePicker 
                value={selectedDateTime}
                mode="time"
                display="spinner"
                onChange={handleChangeTime}
              />
            )
          }

          {
            Platform.OS === 'android' && (
              <TouchableOpacity
                style={styles.dateTimePickerButton}
                onPress={handleOpenDateTimePickerAndroid}
              >
                <Text style={styles.dateTimePickerText}>
                  {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                </Text>
              </TouchableOpacity>
            )
          }

          <Button 
            title={buttonTitles[pageType]}
            onPress={pageType === 'save' 
            ? handleSave
            : handleEdit
          }
          />

        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },

  plantInfoContainer:{
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
  },

  plantName:{
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15
  },

  plantAbout:{
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10
  },

  controller:{
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20
  },

  tipContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 80
  },

  tipImage:{
    width: 56,
    height: 56
  },

  tipText:{
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
  },

  alertLabel:{
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5
  },

  dateTimePickerButton:{
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40
  },

  dateTimePickerText:{
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.heading
  }
});