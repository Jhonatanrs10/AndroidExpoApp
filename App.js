import { Anime } from "./src/pages/Animes/anime";
import { ToastAndroid, View, TouchableOpacity, Modal, Image } from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import styles from './src/styles/animeStyles'
//import { JhonatanrsAppAnimesDatabase } from './manageDatabase';
export default function App() {
  const [pageAnimes, setPageAnimes] = useState(false);
  function abrirPageAnimes() {
    setPageAnimes(true);
  }
  //AsyncStorage.removeItem(JhonatanrsAppAnimesDatabase);
  return (
    <View style={styles.containerApp}>
      <View style={styles.viewButtonsApp}>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsApp} onPress={abrirPageAnimes}>
          <Image style={styles.buttonIconApp} source={require('./assets/animes.png')} />
        </TouchableOpacity>
      </View>
      <View>
        <Modal visible={pageAnimes} animationType="fade">
          <Anime closeWindow={() => setPageAnimes(false)} openWindow={() => setPageAnimes(true)} />
        </Modal>
      </View>
      <StatusBar style='auto' />
    </View>
  );
}
