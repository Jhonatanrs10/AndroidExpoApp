import { Text, View, TouchableOpacity, ScrollView, Modal, FlatList, TextInput } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JhonatanrsAppDatabase, Database } from './database';
import styles from '../../styles/styles'
import { Manage } from './manage';
import { TextInputMask } from 'react-native-masked-text'//https://github.com/bhrott/react-native-masked-text

export function Financial({ closeWindow, openWindow }) {

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

  const allOperation = [
    {
        op:'00-Transferencia Enviada'
    },
   {
        op:'01-Transferencia Recebida'
    },
   {
        op:'02-Emprestado Enviada'
    },
   {
        op:'03-Emprestado Recebida'
    },
   {
        op:'04-Investimento em Renda Fixa'
    },
   {
        op:'05-Resgate Renda Fixa'
    },
   {
        op:'06-Investimento em Tesouro'
    },
   {
        op:'07-Resgate Tesouro'
    },
   {
        op:'08-Investimento em FIIs'
    },
   {
        op:'09-Resgate FIIs'
    },
   {
        op:'10-Dividendos do FIIs'
    },
   {
        op:'11-T. Enviada (SaldoMãe)'
    },
   {
        op:'12-T. Recebida (SaldoMãe)'
    },
   {
        op:'13-T. Enviada (SaldoPai)'
    },
   {
        op:'14-T. Recebida (SaldoPai)'
    },
  ]


  const searchMode = () => {
    if (searchType == "Produto") {
      setSearch('')
      setSearchType("Data")
    } else if (searchType == "Data") {
      setSearch('')
      setSearchType("Operação")
    } else if (searchType == "Operação") {
      setSearch('')
      setSearchType("Produto")
    }
  }

  const [investments, setInvestments] = useState([]);

  function negativeValue(valor){
    if(valor < 0){
      return "-"
    }else{
      return ""
    }

  }

  async function myItensData(chave) {
    try {
      const response = await AsyncStorage.getItem(chave);
      const data = response ? JSON.parse(response) : [];
      let sortedData = [...data]
      let allInvestments = []

      let saldoAtual = 0
      let invFiis = 0
      let invRendaFixa = 0
      let invTesouro = 0
      let rendFiis = 0
      let rendFiisMonth = 0
      let saldoMae = 0
      let saldoPai = 0

      for (var i = 0; i < data.length; i++) {

        const amountValueFormat = (Number(data[i].amount) * Number((((data[i].value).replaceAll("R$", "")).replaceAll(".", "")).replaceAll(",", ".")));
        console.log(allOperation[11].op)
        if (data[i].operation == allOperation[0].op || data[i].operation == allOperation[2].op || data[i].operation == allOperation[4].op || data[i].operation == allOperation[6].op || data[i].operation == allOperation[8].op || data[i].operation == allOperation[11].op || data[i].operation == allOperation[13].op) {
          saldoAtual -= amountValueFormat
        } else if (data[i].operation == allOperation[1].op || data[i].operation == allOperation[3].op || data[i].operation == allOperation[5].op || data[i].operation == allOperation[7].op || data[i].operation == allOperation[9].op || data[i].operation == allOperation[10].op || data[i].operation == allOperation[12].op || data[i].operation == allOperation[14].op) {
          saldoAtual += amountValueFormat
        }

        if (data[i].operation == allOperation[8].op) {
          invFiis += amountValueFormat
        } else if (data[i].operation == allOperation[9].op) {
          invFiis -= amountValueFormat
        }

        if (data[i].operation == allOperation[6].op) {
          invTesouro += amountValueFormat
        } else if (data[i].operation == allOperation[7].op) {
          invTesouro -= amountValueFormat
        }

        if (data[i].operation == allOperation[4].op) {
          invRendaFixa += amountValueFormat
        } else if (data[i].operation == allOperation[5].op) {
          invRendaFixa -= amountValueFormat
        }

        if (data[i].operation == allOperation[10].op) {
          rendFiis += amountValueFormat
          if (data[i].date.slice(6,10) == new Date().getFullYear() && data[i].date.slice(3,5) == new Date().getMonth()+1) {
            rendFiisMonth += amountValueFormat
          }
        }

        if (data[i].operation == allOperation[11].op) {
          saldoMae -= amountValueFormat
        } else if (data[i].operation == allOperation[12].op) {
          saldoMae += amountValueFormat
        }

        if (data[i].operation == allOperation[13].op) {
          saldoPai -= amountValueFormat
        } else if (data[i].operation == allOperation[14].op) {
          saldoPai += amountValueFormat
        }

      }

      allInvestments.push(saldoAtual)
      allInvestments.push(rendFiisMonth)

      allInvestments.push(saldoMae)
      allInvestments.push(saldoPai)

      allInvestments.push(invFiis)
      allInvestments.push(invTesouro)
      allInvestments.push(invRendaFixa)
      allInvestments.push(rendFiis)
      setInvestments(allInvestments)
      
      sortedData.sort((a, b) => (a.id < b.id) ? 1 : (b.id < a.id) ? -1 : 0)
      sortedData.sort((a, b) => (((a.date).slice(6,10)+(a.date).slice(3,5)+(a.date).slice(0,2)) < ((b.date).slice(6,10)+(b.date).slice(3,5)+(b.date).slice(0,2))) ? 1 : (((b.date).slice(6,10)+(b.date).slice(3,5)+(b.date).slice(0,2)) < ((a.date).slice(6,10)+(a.date).slice(3,5)+(a.date).slice(0,2))) ? -1 : 0)
      setMyData(sortedData)
      setFilteredData(sortedData)
/// 00/00/0000

    } catch (error) {
      console.log('ERROR: ' + { error })
    }

  }

  useEffect(() => {
    myItensData(JhonatanrsAppDatabase);
  }, []);

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
          } else if (searchType == 'Operação') {
            if (item.operation) {
              const itemData = item.operation.toUpperCase();
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

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const ItemView = ({ item }) => {

    return (
      <View style={styles.containerItemList} onPress={() => abrirPageManage(item)}>
         <View flex={1}>
          <Text paddingBottom={5} numberOfLines={1} width={'auto'} onPress={() => abrirPageManage(item)}>({(item?.date)})</Text>
          <Text size={40} style={styles.textBar20} paddingBottom={5} numberOfLines={1} width={'auto'} onPress={() => abrirPageManage(item)}>{Capitalize(item?.product)} </Text>
          <Text numberOfLines={1} width={'auto'} onPress={() => abrirPageManage(item)}>( {item?.amount}x {item?.value} )</Text>
          <TextInputMask style={styles.textBar20} color={'black'} type={'money'} readOnly={true} value={Number(item?.amount) * Number(((((item?.value).replaceAll("R$", "")).replaceAll(".", "")).replaceAll(",", ".")))} />
        </View>
      </View>
    );
  }


  return (
    <View style={styles.containerIndex}>
      <View style={styles.window}>
        <View style={styles.bar}>
          <Text style={styles.textBar}>Finance</Text>
          <ScrollView style={styles.viewLetreiro} horizontal={true} showsHorizontalScrollIndicator={false}>
            <Text alignSelf={'center'}>Saldo Atual: {negativeValue(investments[0])}</Text>
            <TextInputMask color={'black'} type={'money'} readOnly={true} value={investments[0]} />
            <Text alignSelf={'center'} > / FIIs Rendimentos: {negativeValue(investments[1])}</Text>
            <TextInputMask color={'black'} type={'money'} readOnly={true} value={investments[1]} />
            <Text alignSelf={'center'} > / SaldoMãe: {negativeValue(investments[2])}</Text>
            <TextInputMask color={'black'} type={'money'} readOnly={true} value={investments[2]} />
            <Text alignSelf={'center'} > / SaldoPai: {negativeValue(investments[3])}</Text>
            <TextInputMask color={'black'} type={'money'} readOnly={true} value={investments[3]} />
            <Text alignSelf={'center'} > / FIIs: {negativeValue(investments[4])}</Text>
            <TextInputMask color={'black'} type={'money'} readOnly={true} value={investments[4]} />
            <Text alignSelf={'center'} > / Tesouro: {negativeValue(investments[5])}</Text>
            <TextInputMask color={'black'} type={'money'} readOnly={true} value={investments[5]} />
            <Text alignSelf={'center'} > / Renda Fixa: {negativeValue(investments[6])}</Text>
            <TextInputMask color={'black'} type={'money'} readOnly={true} value={investments[6]} />
            <Text alignSelf={'center'} > / FIIs Total Rendimentos: {negativeValue(investments[7])}</Text>
            <TextInputMask color={'black'} type={'money'} readOnly={true} value={investments[7]} />
          </ScrollView>
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
      <Modal visible={pageManage} animationType="fade" onRequestClose={() => setPageManage(false)}>
        <Manage closeWindow={() => { setPageManage(false); closeWindow(); openWindow() }} item={data} allOperation={allOperation} />
      </Modal>
      <Modal visible={database} animationType="fade" transparent={true} onRequestClose={() => setDatabase(false)}>
        <Database closeWindow={() => { setDatabase(false); closeWindow(); openWindow() }} />
      </Modal>
    </View>
  )
}
