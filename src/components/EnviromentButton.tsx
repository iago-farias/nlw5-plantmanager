import React from 'react';
import {
  Text, 
  StyleSheet
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps {
  title: string;
  isActive?: boolean;
}

export function EnviromentButton({
  title, 
  isActive = false,
  ...rest
} : EnviromentButtonProps){

  return(
    <RectButton 
      style={[
        styles.container,
        isActive && styles.containerActive
      ]}
      {...rest}
      activeOpacity={0.7}
    >
      <Text 
        style={[
          styles.text,
          isActive && styles.textActive
        ]}
      >
        {title}
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.shape,
    width: 76,
    height: 40,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 12,
    marginHorizontal: 5
  },

  containerActive:{
    backgroundColor: colors.green_light
  },

  text:{
    color: colors.heading,
    fontFamily: fonts.text
  },

  textActive:{
    fontFamily: fonts.heading,
    color: colors.green_dark
  } 
});