import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { TextInputMask } from 'react-native-masked-text'//https://github.com/bhrott/react-native-masked-text
import { JhonatanrsAppDatabase } from './database';
import styles from '../../styles/styles'
import * as Clipboard from 'expo-clipboard';
import { mouseProps } from 'react-native-web/dist/cjs/modules/forwardedProps';


export function Manage({ closeWindow, item }) {

  let day = new Date().getDate(); //Para obter o dia
  let month = new Date().getMonth() + 1; //Para obter o mês
  let year = new Date().getFullYear(); //Para obter o ano


  const [barTitle, setBarTitle] = useState("New Product");

  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("1");
  const [value, setValue] = useState("");
  const [date, setDate] = useState(day+"/"+month+"/"+year);

  useEffect(() => {
    if (item !== "empty") {
      setBarTitle('Edit Product (ID:' + item.id + ')')
      setProduct(item.product);
      setAmount(item.amount);
      setValue(item.value);
      setDate(item.date);
    }
  }, []);

  function deleteEdit() {
    Alert.alert('Delete (ID:' + item.id + ')', 'Are you sure about this choice?', [
      { text: "Yes,I'm sure!", onPress: () => deleteIdData(item.id) },
      { text: 'No', style: 'cancel', },]);
  }

  async function deleteIdData(valueId) {
    const response = await AsyncStorage.getItem(JhonatanrsAppDatabase);
    const data = response ? JSON.parse(response) : [];
    var allData = [];
    for (var i = 0; i < data.length; i++) {
      if (valueId == data[i].id) {
        ToastAndroid.show('Deleted Successfully.', ToastAndroid.SHORT);
      } else {
        const id = (data[i].id);
        const product = (data[i].product);
        const amount = (data[i].amount);
        const value = (data[i].value);
        const date = (data[i].date);

        const indexData = {
          id,
          product,
          amount,
          value,
          date
        }
        allData.push(indexData)
      }
    }
    AsyncStorage.setItem(JhonatanrsAppDatabase, JSON.stringify(allData));
    closeWindow();
  }


  function addEdit() {
    editIdData(item.id)
  }


  async function editIdData(valueId) {
    const response = await AsyncStorage.getItem(JhonatanrsAppDatabase);
    const data = response ? JSON.parse(response) : [];
    var allData = [];
    if (product == "") {
      alert("All Fields are required");
    } else if (product.indexOf("[") != -1 == true || product.indexOf("]") != -1 == true) {
      alert("Product cannot have the characters ([) and (]).");
    } else {
      for (var i = 0; i < data.length; i++) {
        if (valueId == data[i].id) {
          const indexData = {
            id: (data[i].id),
            product,
            amount,
            value,
            date
          }
          allData.push(indexData)
        } else {
          const id = (data[i].id);
          const product = (data[i].product);
          const amount = (data[i].amount);
          const value = (data[i].value);
          const date = (data[i].date);

          const indexData = {
            id,
            product,
            amount,
            value,
            date
          }
          allData.push(indexData)
        }
      }
      AsyncStorage.setItem(JhonatanrsAppDatabase, JSON.stringify(allData));
      ToastAndroid.show('Successfully edited.', ToastAndroid.SHORT);
      closeWindow();
    }
  }

  async function salvarNew() {
    const response = await AsyncStorage.getItem(JhonatanrsAppDatabase);
    const data = response ? JSON.parse(response) : [];
    var count = 0;
    for (var i = 0; i < data.length; i++) {
      count = data[i].id
    }
    const nextId = count + 1
    try {
      if (product == "" || amount == "" || value == "" || date == "") {
        alert("All fields are required.");
      } else if (product.indexOf("[") != -1 == true || product.indexOf("]") != -1 == true) {
        alert("Product cannot have the characters ([) and (]).");
      } else {
        
        const newData = {
          id: nextId,
          product,
          amount,
          value,
          date
        }
        const response = await AsyncStorage.getItem(JhonatanrsAppDatabase);
        const previousData = response ? JSON.parse(response) : [];
        const data = [...previousData, newData];
        await AsyncStorage.setItem(JhonatanrsAppDatabase, JSON.stringify(data));//json string convert array para string
        ToastAndroid.show('Saved successfully.', ToastAndroid.SHORT);
        closeWindow();
      }
    } catch (error) {
      console.log(error);
      alert("Unable to register.");
    }
  }
  const ViewDock = () => {
    if (item !== "empty") {
      return (
        <View style={styles.containerDock}>
          <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={() => addEdit()}>
            <AntDesign name="edit" size={30} color="#808080" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={() => deleteEdit()}>
            <AntDesign name="delete" size={30} color="#808080" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={closeWindow}>
            <AntDesign name="back" size={30} color="#808080" />
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.containerDock}>
          <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={salvarNew}>
            <AntDesign name="save" size={30} color="#808080" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={closeWindow}>
            <AntDesign name="back" size={30} color="#808080" />
          </TouchableOpacity>
        </View>
      )
    }

  }


  const increase = (value) => {
    if (value < 0) {
      return "0"
    } else {
      return (String(Number(value) + 1));
    }
  };

  const decrease = (value) => {
    if (value <= 0) {
      return "0"
    } else {
      return (String(Number(value) - 1));
    }

  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setlinkW(text);
  };

  return (
    <View style={styles.containerIndex}>
      <View style={styles.window}>
        <View style={styles.barThin}>
          <Text style={styles.textBar}>{barTitle}</Text>
        </View>
        <View style={styles.form}>
          <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput style={styles.input} marginTop={15} placeholder="Product" value={product} onChangeText={setProduct} />

          <TextInputMask style={styles.input} maxLength={20}keyboardType='numeric' placeholder="Value" type={'money'} value={value} onChangeText={setValue}/>
            
            <View style={styles.inputNumber}>
              <TouchableOpacity activeOpacity={0.3} style={styles.inputNumberIncDec} onPress={() => setAmount(decrease(amount))}>
                <Entypo name="minus" size={20} color="#808080" />
              </TouchableOpacity>
              <TextInputMask style={styles.inputNumberText} keyboardType='numeric' placeholder="Amount" type={'custom'} options={{ mask: '99999' }} value={amount} onChangeText={setAmount} />
              <TouchableOpacity activeOpacity={0.3} style={styles.inputNumberIncDec} onPress={() => setAmount(increase(amount))}>
                <Entypo name="plus" size={20} color="#808080" />
              </TouchableOpacity>
            </View>
            
           <TextInputMask style={styles.input} keyboardType='numeric' placeholder="Date" type={'datetime'} options={{   format: 'DD/MM/YYYY' }} value={date} onChangeText={setDate} />


          </ScrollView>
        </View>
      </View>
      <ViewDock />
    </View>
  )
}