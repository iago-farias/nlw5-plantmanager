import React from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import {SvgFromUri} from 'react-native-svg';
import {PlantProps} from '../libs/storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface RemovePlantModalParams {
  isVisible: boolean;
  plant: PlantProps;
  hideModal: () => void;
  handleRemove: () => void;
}

export function RemovePlantModal({isVisible, plant, hideModal, handleRemove} : RemovePlantModalParams){
  return(
    <Modal
      animationType="fade"
      visible={isVisible}
      transparent
      statusBarTranslucent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <View style={styles.imageContainer}>
            <SvgFromUri 
              uri={plant.photo}
              width={90}
              height={90}
            />
          </View>

          <Text style={styles.modalText}>
            Deseja mesmo deletar sua
          </Text>

          <Text style={styles.plantName}>
            {
              plant.name
            }
            <Text style={styles.modalText}>{' ?'}</Text>
          </Text> 
          
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.modalButton, {marginRight: 15}]}
              onPress={hideModal}
            >
              <Text 
               style={[
                 styles.buttonText, 
                 {color: colors.heading}
                ]}
              >
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleRemove}
            >
              <Text 
                style={[
                  styles.buttonText, 
                  {color: colors.red}
                ]}
              >
                Deletar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)'
  },

  modal: {
    backgroundColor: colors.white,
    alignItems:'center', 
    width: Dimensions.get('window').width * 0.75,
    paddingHorizontal: 20,
    paddingVertical: 40, 
    borderRadius: 20
  },

  imageContainer:{
    backgroundColor: colors.shape,
    borderRadius: 20,
    padding: 15
  },

  modalText:{
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 17,
    marginTop: 22
  },

  plantName:{
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 17
  },

  footer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 22
  },

  modalButton:{
    padding: 20,
    backgroundColor: colors.shape,
    width: Dimensions.get('window').width * 0.3,
    alignItems: 'center',
    borderRadius: 12
  },

  buttonText:{
    fontSize: 15,
    fontFamily: fonts.heading,
  }

});