import React from 'react';
import {
  Text, 
  StyleSheet, 
  View,
  Animated
} from 'react-native';
import {SvgFromUri} from 'react-native-svg'
import {
  RectButton, 
  RectButtonProps, 
  Swipeable
} from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantProps extends RectButtonProps{
  data:{
    name: string;
    photo: string;
    hour: string;
  };
  handleRemove: () => void;
}

export function PlantCardSecundary({data, handleRemove, ...rest} : PlantProps){
  return(
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View  style={{height:'100%',alignItems: 'center'}}>
          <View style={{height:'100%',alignItems: 'center'}}>
            <RectButton
              style={styles.buttonRemove}
              onPress={handleRemove}
            >
              <Feather 
                name="trash"
                size={32}
                color={colors.white}
              />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton
        style={styles.container}
        {...rest}
        activeOpacity={0.7}
      >
        <SvgFromUri 
          uri={data.photo}
          width={70}
          height={70}
        />
        <Text style={styles.title}>
          { data.name }
        </Text>

        <View style={styles.details}>
          <Text style={styles.timeLabel}>
            Regar às
          </Text>

          <Text style={styles.timeLabel}>
            {data.hour}
          </Text>
        </View>
      </RectButton>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.shape,
    marginVertical: 5
  },

  title:{
    flex: 1,
    marginLeft: 10,
    color: colors.body_dark,
    fontFamily: fonts.heading,
    fontSize: 17
  },

  details:{
    alignItems:'flex-end'
  },

  timeLabel:{
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_light
  },

  time:{
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.body_dark
  },

  buttonRemove:{
    width: 100,
    height: 85,
    backgroundColor: colors.red,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    right: 15,
    top:20,
    paddingLeft: 15
  }
});