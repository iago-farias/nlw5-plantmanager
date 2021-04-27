import React from 'react';
import {  
  TouchableOpacity, 
  TouchableOpacityProps,
  Text, 
  StyleSheet 
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, ...rest } : ButtonProps){
  return(
    <TouchableOpacity 
      style={styles.container}
      {...rest}
    >
      <Text style={styles.text}>
        { title }
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.green,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text:{ 
    fontFamily: fonts.heading,
    color: colors.white,
    fontSize: 18
  }
});