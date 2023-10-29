import { Text, View, TouchableOpacity, ToastAndroid, Modal, FlatList, Linking, TextInput } from 'react-native';
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JhonatanrsAppAnimesDatabase, AnimeDatabase } from './animeDatabase';
import styles from '../../styles/animeStyles'
import { AnimeManage } from './animeManage';


export function Anime({ closeWindow, openWindow }) {

  const [data, setData] = useState(null);
  const [pageAnimeManage, setPageAnimeManage] = useState(false);
  const [animeDatabase, setAnimeDatabase] = useState(false);

  function abrirAnimeDatabase() {
    setAnimeDatabase(true);
  }

  function abrirPageAnimeManage(value) {
    setPageAnimeManage(true);
    setData(value)
  }

  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('name');
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
      var sortedDataW= [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].status == "Completed") {
          totalAnimesC += 1;
        } else if (data[i].status == "Watching") {
          totalAnimesW += 1;
          sortedDataW.push(data[i])
        }
        totalEpisodies += Number(data[i].season01) + Number(data[i].season02) + Number(data[i].season03) + Number(data[i].season04) + Number(data[i].season05) + Number(data[i].season06) + Number(data[i].season07) + Number(data[i].season08) + Number(data[i].season09) + Number(data[i].season10)
      }

      const totalHours = parseInt((totalEpisodies * 20) / 60)

      setMyDataTotalAnimesC(totalAnimesC)
      setMyDataTotalAnimesW(totalAnimesW)
      setMyDataTotalHours(totalHours)
      let sortedData = [...data]
      sortedDataW.sort((a, b) => (a.release > b.release) ? 1 : (b.release > a.release) ? -1 : 0)
      setMyData(sortedData)
      setFilteredData(sortedDataW)

    } catch (error) {
      console.log('ERROR: ' + { error })
    }

  }

  useEffect(() => {
    myAnimesData(JhonatanrsAppAnimesDatabase);
  }, []);

  const searchFilter = (text) => {
    if (text) {
      const dataFiltrada = myData.filter(
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
          } else if (searchType == 'Watching') {
            if (item.status) {
              const itemData = item.status.toUpperCase();
              const textData = search.toUpperCase();
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
      <View style={styles.containerItemListAnimes} onPress={() => abrirPageAnimeManage(item)}>
        <View flex={1}>
          <Text paddingBottom={5} numberOfLines={1} width={'auto'} onPress={() => abrirPageAnimeManage(item)}>{item?.name}</Text>
          <Text numberOfLines={1} width={'auto'} onPress={() => abrirPageAnimeManage(item)}>{item?.release.substring(2)} (Ep:{atualSeason}) {item?.status}</Text>
        </View>
        <TouchableOpacity style={styles.buttonsItemListAnimes} activeOpacity={0.3} onPress={() => { if (item.linkW !== '') { Linking.openURL(item.linkW) } else { ToastAndroid.show('No link', ToastAndroid.SHORT); } }} onLongPress={() => { Linking.openURL('https://myanimelist.net/search/all?q=' + item?.name) }}>
          <FontAwesome5 name="play" size={12} color='#808080' />
        </TouchableOpacity>
      </View> 
    );
  }


  return (
    <View style={styles.containerAnimes}>
      <View style={styles.windowAnimes}>
        <View style={styles.barAnimes}>
          <Text style={styles.textBarAnimes}>ANIMES</Text>
          <Text style={styles.textBarAnimes} onPress={() => {setMyData(myData)}}>( Watching {myDataTotalAnimesW} & Completed {myDataTotalAnimesC} & Hours {myDataTotalHours} )</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredData}
          refreshing={true}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <AnimeView item={item} />}
        />
        <View style={styles.searchAnimes}>
          <TouchableOpacity style={styles.searchButtonAnimes} activeOpacity={0.3} onPress={searchMode}>
            <AntDesign name="search1" size={25} color="#808080" />
          </TouchableOpacity>
          <TextInput paddingStart={5} numberOfLines={1} width={'83%'} value={search} placeholder={"Search by: " + searchType} onChangeText={searchFilter} />
        </View>
      </View>

      <View style={styles.containerDockAnimes}>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDockAnimes} onPress={() => abrirPageAnimeManage('empty')}>
          <AntDesign name="plus" size={30} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDockAnimes} onLongPress={abrirAnimeDatabase}>
          <MaterialCommunityIcons name="database-cog-outline" size={30} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDockAnimes} onPress={closeWindow}>
          <AntDesign name="close" size={30} color="#808080" />
        </TouchableOpacity>
      </View>
      <Modal visible={pageAnimeManage} animationType="fade">
        <AnimeManage closeWindow={() => { setPageAnimeManage(false); closeWindow(); openWindow() }} item={data} />
      </Modal>
      <Modal visible={animeDatabase} animationType="fade" transparent={true}>
        <AnimeDatabase closeWindow={() => { setAnimeDatabase(false); closeWindow(); openWindow() }} />
      </Modal>
    </View>
  )
}
