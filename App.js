import { Anime } from "./src/pages/Animes";
import { Financial } from "./src/pages/Financial";
import { Text, View, TouchableOpacity, Modal, Image } from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import styles from './src/styles/styles'
import { Market } from "./src/pages/Market";
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch (e) {
      // read key error
    }

    console.log(keys)
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  }
  getAllKeys()


  //AsyncStorage.removeItem(JhonatanrsAppDatabase);
  return (
    <View style={styles.containerApp}>
      <StatusBar style='auto' />
      <View style={styles.viewButtonsApp}>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsApp} onPress={abrirPageAnimes}>
          <Image style={styles.buttonIconApp} source={require('./assets/animes.png')} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsApp} onPress={abrirPageFinancial}>
          <Image style={styles.buttonIconApp} source={require('./assets/finance.png')} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsApp} onPress={abrirPageMarket}>
          <Image style={styles.buttonIconApp} source={require('./assets/market.png')} />
        </TouchableOpacity>
      </View>
      <View>
        <Modal visible={pageAnimes} animationType="fade" onRequestClose={() => setPageAnimes(false)}>
          <Anime closeWindow={() => setPageAnimes(false)} openWindow={() => setPageAnimes(true)} />
        </Modal>
        <Modal visible={pageFinancial} animationType="fade" onRequestClose={() => setPageFinancial(false)}>
          <Financial closeWindow={() => setPageFinancial(false)} openWindow={() => setPageFinancial(true)} />
        </Modal>
        <Modal visible={pageMarket} animationType="fade" onRequestClose={() => setPageMarket(false)}>
          <Market closeWindow={() => setPageMarket(false)} openWindow={() => setPageMarket(true)} />
        </Modal>
      </View>
    </View>
  );
}
