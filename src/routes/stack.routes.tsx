import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { Welcome } from '../screens/Welcome';
import { UserIdentification } from '../screens/UserIdentification';
import { Confirmation } from '../screens/Confirmation';
import { PlantSave } from '../screens/PlantSave';

import colors from '../styles/colors';
import AuthRoutes from './tab.routes';


const StackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <StackRoutes.Navigator 
    headerMode="none"
    screenOptions={{
      cardStyle:{
        backgroundColor: colors.white
      }
    }}
  >
    <StackRoutes.Screen name="Welcome" component={Welcome} />
    <StackRoutes.Screen name="UserIdentification" component={UserIdentification} />
    <StackRoutes.Screen name="Confirmation" component={Confirmation} />
    <StackRoutes.Screen name="PlantSelect" component={AuthRoutes} />
    <StackRoutes.Screen name="PlantSave" component={PlantSave} />
  </StackRoutes.Navigator>
)

export default AppRoutes;