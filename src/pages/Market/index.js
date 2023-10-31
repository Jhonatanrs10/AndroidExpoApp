import { Text, View, TouchableOpacity, ToastAndroid, Modal, FlatList, Linking, TextInput } from 'react-native';
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JhonatanrsAppDatabase, Database } from './database';
import styles from '../../styles/styles'
import { Manage } from './manage';
import { TextInputMask } from 'react-native-masked-text'//https://github.com/bhrott/react-native-masked-text

export function Market({ closeWindow, openWindow }) {

  function getMonthTrue(month) {
    if (month + 1 < 10) {
      return ('0' + (month + 1))
    } else {
      return (month + 1)
    }
  }

  const [today, setToday] = useState((new Date().getDate()) + '/' + getMonthTrue(new Date().getMonth()) + '/' + new Date().getFullYear());

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
  const [searchType, setSearchType] = useState('product');
  const [filteredData, setFilteredData] = useState([]);
  const [myData, setMyData] = useState(null);


  const searchMode = () => {
    if (searchType == "product") {
      setSearch('')
      setSearchType("date")
    } else if (searchType == "date") {
      setSearch('')
      setSearchType("product")
    }
  }


  const [totalMarket, setTotalMarket] = useState(null);
  async function myItensData(chave) {
    try {
      const response = await AsyncStorage.getItem(chave);
      const data = response ? JSON.parse(response) : [];
      let sortedData = [...data]
      let sortedDataDate = []
      let totalMarket = 0

      for (var i = 0; i < data.length; i++) {
        if (data[i].date == today) {
          sortedDataDate.push(data[i])
          totalMarket += (Number(data[i].amount) * Number((((data[i].value).replaceAll("R$", "")).replaceAll(".", "")).replaceAll(",", ".")));
        }
      }

      setTotalMarket(totalMarket)
      sortedData.sort((a, b) => (a.date < b.date) ? 1 : (b.date < a.date) ? -1 : 0)
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
          if (searchType == 'product') {
            if (item.product) {
              const itemData = item.product.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
            }
          } else if (searchType == 'date') {
            if (item.date) {
              const itemData = item.date.toUpperCase();
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
          <Text paddingBottom={5} numberOfLines={1} width={'auto'} onPress={() => abrirPageManage(item)}>({item?.date})</Text>
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
          <View style={styles.rowCenter}>
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
        <Manage closeWindow={() => { setPageManage(false); closeWindow(); openWindow() }} item={data} />
      </Modal>
      <Modal visible={database} animationType="fade" transparent={true}>
        <Database closeWindow={() => { setDatabase(false); closeWindow(); openWindow() }} />
      </Modal>
    </View>
  )
}
