import { Animes } from "./src/pages/Animes/index";
import { StyleSheet, Text, View, StatusBar, TouchableOpacity,Modal, Image } from 'react-native';
import { useState } from 'react';


const statusBarHeight = StatusBar.currentHeight;

export default function App() {
  const [pageAnimes, setPageAnimes] = useState(false);

  function abrirPageAnimes(){
    setPageAnimes(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.pages}>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={abrirPageAnimes}>
          <Image style={styles.animesButtonIcon} source={require('./assets/animes.png')}/>
        </TouchableOpacity>
      </View>
      <View>
        <Modal visible={pageAnimes} animationType="fade">
          <Animes closeWindow={() => setPageAnimes(false)}/>
        </Modal>
      </View>
    </View>
  );
 
}

const styles = StyleSheet.create({
  container: {
    //marginTop: statusBarHeight,
    flex: 1,
    backgroundColor: '#B0C4DE',
    padding: '15%',
    flexDirection: 'row',
  },
  pages:{
    flex: 1,
    flexDirection: 'column-reverse',
    justifyContent: 'space-around',
    alignItems: "center",
    alignContent: 'center',
  },
  animesButtonIcon:{
    padding: 0,
    margin: 0,
    height: 40,
    width: 40,
  },
  buttonsDock:{
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: "center",
    alignContent: 'center',
    borderRadius: 13,
    height: 60,
    width: 60,
    borderColor: 'black',
    borderWidth: 1,
  },
  contentText:{
    marginTop: 1,
    fontSize: 9,
    marginStart: 'auto',
    marginEnd: 'auto'
  }
})
