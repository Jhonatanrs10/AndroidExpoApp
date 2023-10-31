import { Anime } from "./src/pages/Animes";
import { Financial } from "./src/pages/Financial";
import { Text, View, TouchableOpacity, Modal, Image } from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import styles from './src/styles/styles'
import { Market } from "./src/pages/Market";
//import { JhonatanrsAppDatabase } from './manageDatabase';
export default function App() {

  const [pageAnimes, setPageAnimes] = useState(false);
  function abrirPageAnimes() {
    setPageAnimes(true);
  }

  const [pageFinancial, setPageFinancial] = useState(false);
  function abrirPageFinancial() {
    setPageFinancial(true);
  }

  const [pageMarket, setPageMarket] = useState(false);
  function abrirPageMarket() {
    setPageMarket(true);
  }

  //AsyncStorage.removeItem(JhonatanrsAppDatabase);
  return (
    <View style={styles.containerApp}>
      <View style={styles.viewButtonsApp}>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsApp} onPress={abrirPageAnimes}>
          <Image style={styles.buttonIconApp} source={require('./assets/animes.png')} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsApp} onPress={abrirPageFinancial}>
          <Text>Financial</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsApp} onPress={abrirPageMarket}>
          <Text>Market</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Modal visible={pageAnimes} animationType="fade">
          <Anime closeWindow={() => setPageAnimes(false)} openWindow={() => setPageAnimes(true)} />
        </Modal>
        <Modal visible={pageFinancial} animationType="fade">
          <Financial closeWindow={() => setPageFinancial(false)} openWindow={() => setPageFinancial(true)} />
        </Modal>
        <Modal visible={pageMarket} animationType="fade">
          <Market closeWindow={() => setPageMarket(false)} openWindow={() => setPageMarket(true)} />
        </Modal>
      </View>
      <StatusBar style='auto' />
    </View>
  );
}
