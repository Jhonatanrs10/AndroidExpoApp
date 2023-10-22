import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Modal, ScrollView,RefreshControl, Button, FlatList, Item } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { Cadastro } from './add';
import { Delete } from './delete';
import { useEffect, useState } from 'react';
import actions from './data';
import AsyncStorage from '@react-native-async-storage/async-storage';


const statusBarHeight = StatusBar.currentHeight;

export function Animes({ closeWindow}) {

  const [idForEdit, setIdForEdit] = useState(null);
  const [pageCadastro, setPageCadastro] = useState(false);
  const [deletar, setDelete] = useState(false);

  function abrirDelete() {
    setDelete(true);
  }
  function abrirPageCadastro(value) {
    if(value == null){
      setPageCadastro(true);
    }else{
      setPageCadastro(true);
      setIdForEdit(value)
    }
    
  }

  //////////////


  const [myData, setMyData] = useState(null);
  const [myDataTotalAnimes, setMyDataTotalAnimes] = useState(null);
  const [myDataTotalHours, setMyDataTotalHours] = useState(null);


  async function myAnimesData(chave) {
    try {
      const response = await AsyncStorage.getItem(chave);
      const data = response ? JSON.parse(response) : [];
      var totalAnimes = 0;
      var totalEpisodies = 0;
      var totalAnimesName = [];
      for (var i = 0; i < data.length; i++) {
        totalAnimesName.push(data[i].name)
        if (data[i].status == "Completed") {
          totalAnimes += 1;
        }
        totalEpisodies += Number(data[i].season01) + Number(data[i].season02) + Number(data[i].season03) + Number(data[i].season04) + Number(data[i].season05) + Number(data[i].season06) + Number(data[i].season07) + Number(data[i].season08) + Number(data[i].season09) + Number(data[i].season10)
      }

      const totalHours = parseInt((totalEpisodies * 20) / 60)


      setMyDataTotalAnimes(totalAnimes)
      setMyDataTotalHours(totalHours)
      setMyData(data)

    } catch (error) {
      console.log('ERROR: ' + { error })
    }

  }

  useEffect(() => {
    myAnimesData("@JhonatanrsAndroidExpoApp:Animes");
  }, []);

  //console.log(myData)


  const [exemplo, setExemplo] = useState(null);

  const Armazenar = (chave, valor) => {
    AsyncStorage.setItem(chave, valor)
  }

  const Buscar = async (chave) => {
    const valor = await AsyncStorage.getItem(chave);
    setExemplo(valor)
  }

  //Armazenar('teste123','Exemplo')
  //Buscar('teste123')



  //const DATA = [{id: "TESTE 1"},{id: "TESTE 2"},{id: "TESTE 3"}]
  const DATA = myData

  // /actions.deleteIdData(item?.id)
  const AnimeView = ({item}) => {
    return (
      <View style={styles.containerItemList}><Text onPress={() => abrirPageCadastro(item?.id)}>{item?.id} - {item?.name} - {item?.status}</Text></View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle = "default"
      />
      <View style={styles.window}>
        <View style={styles.bar}>
          <Text style={styles.textBar}>Animes ( Completed {myDataTotalAnimes} & Hours {myDataTotalHours} )</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          

          <FlatList
            data={DATA}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <AnimeView item={item} />}
          />

        </ScrollView>
      </View>

      <View style={styles.containerDock}>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={() => abrirPageCadastro(null)}>
          <AntDesign name="plus" size={30} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={actions.importData}>
          <AntDesign name="up" size={30} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={actions.exportData}>
          <AntDesign name="download" size={30} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={abrirDelete}>
          <AntDesign name="delete" size={30} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={closeWindow}>
          <AntDesign name="close" size={30} color="#808080" />
        </TouchableOpacity>
      </View>


      <Modal visible={pageCadastro} animationType="fade">
        <Cadastro closeWindow={() => setPageCadastro(false)} idEdit={idForEdit}/>
      </Modal>
      <Modal visible={deletar} animationType="fade" transparent={true}>
        <Delete closeWindow={() => setDelete(false)} />
      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    //marginTop: statusBarHeight,
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#ffffff',
  },
  window: {
    flex: 1,
    margin: 15,
    borderRadius: 11,
    borderColor: 'black',
    paddingBottom: 0,
    borderWidth: 1,
    backgroundColor: '#fff'
  },
  buttonsBar: {
    padding: 2,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 7,
    height: 17,
    width: 17,
  },
  textBar: {
    fontWeight: "bold"
  },
  bar: {
    height: 25,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: '#B0C4DE',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 0,
  },
  content: {
    flex: 1,
    margin: 0,
  },
  containerItemList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    marginTop: 10,
    marginBottom: 5,
    marginStart: 15,
    marginEnd: 15,
    borderRadius: 15,
    backgroundColor: '#B0C4DE',
    alignItems: 'center',
  },
  containerDock: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 70,
    marginBottom: 15,
    marginStart: 15,
    marginEnd: 15,
    borderRadius: 15,
    backgroundColor: '#B0C4DE',
    alignItems: 'center',
  },
  buttonsDock: {
    padding: 5,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 13,
    height: 40,
    width: 40,
  },
})
