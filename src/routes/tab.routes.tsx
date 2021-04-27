import React from 'react';
import { Platform } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialIcons} from '@expo/vector-icons';

import { PlantSelect } from '../screens/PlantSelect';
import { MyPlants } from '../screens/MyPlants';

import colors from '../styles/colors';

const AppTabs = createBottomTabNavigator();

const AuthRoutes = () => {
  return(
    <AppTabs.Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: 'beside-icon',
        style: {
          padding: Platform.OS === 'ios' ? 20 : 0,
          height: 80
        }
      }}
    >
      <AppTabs.Screen 
        name="Nova Planta"
        component={PlantSelect}
        options={{
          tabBarIcon:(({size, color}) => (
            <MaterialIcons 
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ))
        }}
      />

      <AppTabs.Screen 
        name="Minhas Plantas"
        component={MyPlants}
        options={{
          tabBarIcon:(({size, color}) => (
            <MaterialIcons 
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ))
        }}
      />
    </AppTabs.Navigator>
  );
}

export default AuthRoutes;