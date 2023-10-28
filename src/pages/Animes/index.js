import { StyleSheet, Text, View, StatusBar, Button, TouchableOpacity, Modal, FlatList, Linking, TextInput } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'
import { Cadastro } from './add';
import { Delete } from './delete';
import { useEffect, useState } from 'react';
import React from 'react';
import actions from './data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CadastroEdit } from './edit';
import { ImportAnime } from './ImportAnime';


const statusBarHeight = StatusBar.currentHeight;

export function Animes({ closeWindow, openWindow }) {


  const [idForEdit, setIdForEdit] = useState(null);
  const [pageCadastro, setPageCadastro] = useState(false);
  const [pageCadastroEdit, setPageCadastroEdit] = useState(false);
  const [deletar, setDelete] = useState(false);
  const [importAnimes, setImportAnimes] = useState(false);

  function abrirDelete() {
    setDelete(true);
  }

  function abrirImportAnimes() {
    setImportAnimes(true);
  }
  function abrirPageCadastro() {
    setPageCadastro(true);
  }
  function abrirPageCadastroEdit(value) {
    setPageCadastroEdit(true);
    setIdForEdit(value)
  }

  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('status');
  const [filteredData, setFilteredData] = useState([]);
  const [myData, setMyData] = useState(null);
  const [myDataTotalAnimesC, setMyDataTotalAnimesC] = useState(null);
  const [myDataTotalAnimesW, setMyDataTotalAnimesW] = useState(null);
  const [myDataTotalHours, setMyDataTotalHours] = useState(null);


  const searchMode = () => {
    if (searchType == "name") { 
      setSearch('')
      setSearchType("status")
    } else if (searchType == "status") {
      setSearch('')
      setSearchType("release")
    } else if (searchType == "release") {
      setSearch('')
      setSearchType("obs")
    } else if (searchType == "obs") {
      setSearch('')
      setSearchType("name")
    }
  }

  async function myAnimesData(chave) {
    try {
      const response = await AsyncStorage.getItem(chave);
      const data = response ? JSON.parse(response) : [];
      var totalAnimesC = 0;
      var totalAnimesW = 0;
      var totalEpisodies = 0;
      var totalAnimesName = [];
      for (var i = 0; i < data.length; i++) {
        totalAnimesName.push(data[i].name)
        if (data[i].status == "Completed") {
          totalAnimesC += 1;
        } else if(data[i].status == "Watching"){
          totalAnimesW += 1;
        }
        totalEpisodies += Number(data[i].season01) + Number(data[i].season02) + Number(data[i].season03) + Number(data[i].season04) + Number(data[i].season05) + Number(data[i].season06) + Number(data[i].season07) + Number(data[i].season08) + Number(data[i].season09) + Number(data[i].season10)
      }

      const totalHours = parseInt((totalEpisodies * 20) / 60)


      setMyDataTotalAnimesC(totalAnimesC)
      setMyDataTotalAnimesW(totalAnimesW)
      setMyDataTotalHours(totalHours)
      //setMyData(data)
      let sortedData = [...data]
      sortedData.sort((a, b)=>(a.release > b.release)?1:(b.release > a.release)?-1:0);
      setMyData(sortedData)
      setFilteredData(sortedData)

    } catch (error) {
      console.log('ERROR: ' + { error })
    }

  }

  useEffect(() => {
    myAnimesData("@JhonatanrsAndroidExpoApp:Animes");
  }, []);

  const searchFilter = (text) => {
    if (text) {
      const dataFiltrada = filteredData.filter(
        function (item) {
          if (searchType == 'name') {
            if (item.name) {
              const itemData = item.name.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
            }
          } else if (searchType == 'status') {
            if (item.status) {
              const itemData = item.status.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
            }
          } else if (searchType == 'release') {
            if (item.release) {
              const itemData = item.release.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
            }
          } else if (searchType == 'obs') {
            if (item.obs) {
              const itemData = item.obs.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
            }
          }

        });
      setFilteredData(dataFiltrada);
    } else {
      setFilteredData(myData);
    }
    setSearch(text);
  };

  const AnimeView = ({ item }) => {

    var atualSeason = 0;
    if (item.season10 > 0) {
      atualSeason = item.season10
    } else if (item.season09 > 0) {
      atualSeason = item.season09
    } else if (item.season08 > 0) {
      atualSeason = item.season08
    } else if (item.season07 > 0) {
      atualSeason = item.season07
    } else if (item.season06 > 0) {
      atualSeason = item.season06
    } else if (item.season05 > 0) {
      atualSeason = item.season05
    } else if (item.season04 > 0) {
      atualSeason = item.season04
    } else if (item.season03 > 0) {
      atualSeason = item.season03
    } else if (item.season02 > 0) {
      atualSeason = item.season02
    } else if (item.season01 > 0) {
      atualSeason = item.season01
    }
  
    return (
      <View style={styles.containerItemList} onPress={() => abrirPageCadastroEdit(item)}>
        <View flex={1}>
          <Text paddingBottom={5} numberOfLines={1} width={'auto'} onPress={() => abrirPageCadastroEdit(item)}>{item?.name}</Text>
          <Text numberOfLines={1} width={'auto'} onPress={() => abrirPageCadastroEdit(item)}>{item?.status} (Ep:{atualSeason}) {item?.release.substring(2)}</Text>
        </View>
        <TouchableOpacity style={styles.buttonsItemList} activeOpacity={0.3} onPress={() => { if (item.linkW !== '') { Linking.openURL(item.linkW) } else { actions.showMsg("No link") } }} onLongPress={() => { Linking.openURL('https://myanimelist.net/search/all?q=' + item?.name) }}>
          <FontAwesome5 name="play" size={12} color='#808080' />
        </TouchableOpacity>
      </View>
    );
  }


  ///////////

  async function savefile() {
    let fileuri = filesystem.documentdirectory + "/text.txt";
    await filesystem.writeasstringasync(fileuri, "hello world", { encoding: filesystem.encodingtype.utf8 });
    alert("Tentativa de criar arquivo de texto");
  }

  ///////////
  return (
    <View style={styles.container}>



      <View style={styles.window}>
        <View style={styles.bar}>
          <Text style={styles.textBar}>ANIMES</Text>
          <Text style={styles.textBar}>( Watching {myDataTotalAnimesW} & Completed {myDataTotalAnimesC} & Hours {myDataTotalHours} )</Text>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredData}
          refreshing={true}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <AnimeView item={item} />}

        />
        <View style={styles.search}>
          <TouchableOpacity style={styles.searchButton} activeOpacity={0.3} onPress={searchMode}>
            <AntDesign name="search1" size={25} color="#808080" />
          </TouchableOpacity>
          <TextInput paddingStart={5} numberOfLines={1} width={'83%'} value={search} placeholder={"Search by: " + searchType} onChangeText={searchFilter}/>
        </View>
      </View>

      <View style={styles.containerDock}>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={abrirPageCadastro}>
          <AntDesign name="plus" size={30} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={abrirImportAnimes}>
          <AntDesign name="up" size={30} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={actions.exportData}>
          <AntDesign name="download" size={30} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onLongPress={abrirDelete}>
          <AntDesign name="delete" size={30} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={closeWindow}>
          <AntDesign name="close" size={30} color="#808080" />
        </TouchableOpacity>
      </View>


      <Modal visible={pageCadastro} animationType="fade">
        <Cadastro closeWindow={() => { setPageCadastro(false); closeWindow(); openWindow() }} item={idForEdit} />
      </Modal>
      <Modal visible={pageCadastroEdit} animationType="fade">
        <CadastroEdit closeWindow={() => { setPageCadastroEdit(false); closeWindow(); openWindow() }} item={idForEdit} />
      </Modal>
      <Modal visible={deletar} animationType="fade" transparent={true}>
        <Delete closeWindow={() => { setDelete(false); closeWindow(); openWindow() }} />
      </Modal>
      <Modal visible={importAnimes} animationType="fade" transparent={true}>
        <ImportAnime closeWindow={() => { setImportAnimes(false); closeWindow(); openWindow() }} />
      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    //marginTop: statusBarHeight,
    flex: 1,
    justifyContent: 'flex-end',
    //backgroundColor: '#000',
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
    height: 50,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: '#B0C4DE',
    flexDirection: 'column',
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
    justifyContent: 'space-between',
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 5,
    marginStart: 15,
    marginEnd: 15,
    borderRadius: 15,
    backgroundColor: '#B0C4DE',
    alignItems: 'center',
  },
  buttonsItemList: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingStart: 2,
    height: 30,
    width: 45,
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
  search: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#B0C4DE',
    paddingStart: 5,
    borderBottomStartRadius: 10 ,
    borderBottomEndRadius: 10,
    borderTopColor: '#000',
    borderTopWidth: 1,
    height: 50,
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 11,
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: '#B0C4DE'

  },
})
