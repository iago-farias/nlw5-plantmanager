import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header(){
  const [userName, setUserName] = useState<string>();

  async function loadStorageUserName(){
    const name = await AsyncStorage.getItem('@plantmanager:user');
    setUserName(name || '');
  }

  useEffect(() => {
    loadStorageUserName();
  }, []);

  return(
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <Image 
        source={{uri:'https://avatars.githubusercontent.com/u/61480933?v=4'}}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    width: '100%',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop: Constants.statusBarHeight,
  },

  greeting:{
    fontSize: 32,
    fontFamily: fonts.text,
    color: colors.heading
  },

  userName:{
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40
  },

  image:{
    width: 70,
    height: 70,
    borderRadius: 40
  }
});