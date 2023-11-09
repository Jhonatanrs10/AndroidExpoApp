import { Text, View, TouchableOpacity, ToastAndroid, Modal, FlatList, Linking, TextInput } from 'react-native';
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JhonatanrsAppDatabase, Database } from './database';
import styles from '../../styles/styles'
import { Manage } from './manage';
import { TextInputMask } from 'react-native-masked-text'//https://github.com/bhrott/react-native-masked-text

export function Market({ closeWindow, openWindow }) {

  function getNTrue(n) {
    if (n < 10) {
      return ('0' + (n))
    } else {
      return (n)
    }
  }

  const [today, setToday] = useState(getNTrue(new Date().getDate()) + '/' + (getNTrue(new Date().getMonth()+1)) + '/' + getNTrue(new Date().getFullYear()));

  const [data, setData] = useState(null);
  const [pageManage, setPageManage] = useState(false);
  const [database, setDatabase] = useState(false);


  function abrirDatabase() {
    setDatabase(true);
  }

  function abrirPageManage(value) {
    setPageManage(true);
    setData(value)
  }

  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('Produto');
  const [filteredData, setFilteredData] = useState([]);
  const [myData, setMyData] = useState(null);

  const [allMarkets, setAllMarkets] = useState([]);


  const searchMode = () => {
    if (searchType == "Produto") {
      setSearch('')
      setSearchType("Data")
    } else if (searchType == "Data") {
      setSearch('')
      setSearchType("Local")
    } else if (searchType == "Local") {
      setSearch('')
      setSearchType("Produto")
    }
  }


  const [totalMarket, setTotalMarket] = useState(null);
  async function myItensData(chave) {
    try {
      const response = await AsyncStorage.getItem(chave);
      const data = response ? JSON.parse(response) : [];
      let sortedData = [...data]
      let sortedDataDate = []
      let allMarkets = []
      let totalMarket = 0

      for (var i = 0; i < data.length; i++) {
        allMarkets.push(data[i].localMarket)
        if (data[i].date == today) {
          sortedDataDate.push(data[i])
          totalMarket += (Number(data[i].amount) * Number((((data[i].value).replaceAll("R$", "")).replaceAll(".", "")).replaceAll(",", ".")));
        }
      }

      sortedData.sort((a, b) => (a.id < b.id) ? 1 : (b.id < a.id) ? -1 : 0)
      sortedDataDate.sort((a, b) => (a.id < b.id) ? 1 : (b.id < a.id) ? -1 : 0)
      setAllMarkets(allMarkets)
      setTotalMarket(totalMarket)
      sortedData.sort((a, b) => (((a.date).slice(6,10)+(a.date).slice(3,5)+(a.date).slice(0,2)) < ((b.date).slice(6,10)+(b.date).slice(3,5)+(b.date).slice(0,2))) ? 1 : (((b.date).slice(6,10)+(b.date).slice(3,5)+(b.date).slice(0,2)) < ((a.date).slice(6,10)+(a.date).slice(3,5)+(a.date).slice(0,2))) ? -1 : 0)
      setMyData(sortedData)
      setFilteredData(sortedDataDate)


    } catch (error) {
      console.log('ERROR: ' + { error })
    }

  }

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    myItensData(JhonatanrsAppDatabase);
  }, [today, setToday]);

  const searchFilter = (text) => {
    if (text) {
      const dataFiltrada = myData.filter(
        function (item) {
          if (searchType == 'Produto') {
            if (item.product) {
              const itemData = item.product.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
            }
          } else if (searchType == 'Data') {
            if (item.date) {
              const itemData = item.date.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
            }
          } else if (searchType == 'Local') {
            if (item.localMarket) {
              const itemData = item.localMarket.toUpperCase();
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

  const ItemView = ({ item }) => {

    return (
      <View style={styles.containerItemList} onPress={() => abrirPageManage(item)}>
        <View flex={1}>
          <Text paddingBottom={5} numberOfLines={1} width={'auto'} onPress={() => abrirPageManage(item)}>({item?.date}) {item?.localMarket}</Text>
          <Text size={40} style={styles.textBar20} paddingBottom={5} numberOfLines={1} width={'auto'} onPress={() => abrirPageManage(item)}>{Capitalize(item?.product)} </Text>
          <Text numberOfLines={1} width={'auto'} onPress={() => abrirPageManage(item)}>( {item?.amount}x {item?.value} )</Text>
          <TextInputMask style={styles.textBar20} color={'black'} type={'money'} readOnly={true} value={Number(item?.amount) * Number(((((item?.value).replaceAll("R$", "")).replaceAll(".", "")).replaceAll(",", ".")))} />
        </View>
        <TouchableOpacity style={styles.buttonsItemListIntegrated} activeOpacity={0.3} onPress={() => setToday(item?.date)}>
          <FontAwesome5 name="calendar-day" size={20} color='#808080' />
        </TouchableOpacity>
      </View>
    );
  }


  return (
    <View style={styles.containerIndex}>
      <View style={styles.window}>
        <View style={styles.bar}>
          <View style={styles.rowCenter}>
            <Text style={styles.textBar}>MERCADO </Text>
            <TextInputMask style={styles.textBar} keyboardType='numeric' placeholder="Date" type={'datetime'} options={{ format: 'DD/MM/YYYY' }} value={today} onChangeText={setToday} />
          </View>
          <View flex={1} style={styles.rowCenter}>
            <Text style={styles.textBar}>Total: </Text>
            <TextInputMask style={styles.textBar} color={'black'} type={'money'} readOnly={true} value={totalMarket} />
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredData}
          refreshing={true}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ItemView item={item} />}
        />
        <View style={styles.search}>
          <TouchableOpacity style={styles.searchButton} activeOpacity={0.3} onPress={searchMode}>
            <AntDesign name="search1" size={25} color="#808080" />
          </TouchableOpacity>
          <TextInput paddingStart={5} numberOfLines={1} width={'83%'} value={search} placeholder={"Search by: " + searchType} onChangeText={searchFilter} />
        </View>
      </View>

      <View style={styles.containerDock}>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={() => abrirPageManage('empty')}>
          <AntDesign name="plus" size={30} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={abrirDatabase}>
          <MaterialCommunityIcons name="database" size={30} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={closeWindow}>
          <AntDesign name="close" size={30} color="#808080" />
        </TouchableOpacity>
      </View>
      <Modal visible={pageManage} animationType="fade">
        <Manage closeWindow={() => { setPageManage(false); closeWindow(); openWindow() }} item={data} allMarkets={allMarkets}/>
      </Modal>
      <Modal visible={database} animationType="fade" transparent={true}>
        <Database closeWindow={() => { setDatabase(false); closeWindow(); openWindow() }} />
      </Modal>
    </View>
  )
}
