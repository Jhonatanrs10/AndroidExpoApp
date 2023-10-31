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


  const [barTitle, setBarTitle] = useState("New");

  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState(day+"/"+month+"/"+year);
  const [category, setCategory] = useState('1-Transfer');
  const [operation, setOperation] = useState('1-Add');

  useEffect(() => {
    if (item !== "empty") {
      setBarTitle('Edit (ID:' + item.id + ')')
      setProduct(item.product);
      setAmount(item.amount);
      setValue(item.value);
      setDate(item.date);
      setCategory(item.category);
      setOperation(item.operation);
    }
  }, []);

  const changeCategory = () => {
    if (category == "1-Transfer") {
      setCategory("2-Borrowed")
    } else if (category == "2-Borrowed") {
      setCategory("3-Tesouro")
    } else if (category == "3-Tesouro") {
      setCategory("4-Renda Fixa")
    } else if (category == "4-Renda Fixa") {
      setCategory("5-FIIs")
    } else if (category == "5-FIIs") {
      setCategory("6-Rendimentos")
    } else if (category == "6-Rendimentos") {
      setCategory("1-Transfer")
    } else {
      setCategory("1-Transfer")
    }
  }

  const changeOperation = () => {
    if (operation == "1-Add") {
      setOperation("2-Abs")
    } else if (operation == "2-Abs") {
      setOperation("3-Aporte")
    } else if (operation == "3-Aporte") {
      setOperation("4-Resgate")
    } else if (operation == "4-Resgate") {
      setOperation("5-Rendimentos")
    } else if (operation == "5-Rendimentos") {
      setOperation("1-Add")
    } else {
      setOperation("1-Add")
    }
  }

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
        const category = (data[i].category);
        const operation = (data[i].operation);

        const indexData = {
          id,
          product,
          amount,
          value,
          date,
          category,
          operation
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
            date,
            category,
            operation
          }
          allData.push(indexData)
        } else {
          const id = (data[i].id);
          const product = (data[i].product);
          const amount = (data[i].amount);
          const value = (data[i].value);
          const date = (data[i].date);
          const category = (data[i].category);
          const operation = (data[i].operation);

          const indexData = {
            id,
            product,
            amount,
            value,
            date,
            category,
            operation
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
      if (product == "" || amount == "" || value == "" || date == "" || category == "" || operation == "") {
        alert("All fields are required.");
      } else if (product.indexOf("[") != -1 == true || product.indexOf("]") != -1 == true) {
        alert("Product cannot have the characters ([) and (]).");
      } else {
        const newData = {
          id: nextId,
          product,
          amount,
          value,
          date,
          category,
          operation
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
            <View style={styles.inputNumber}>
              <TouchableOpacity activeOpacity={0.3} style={styles.inputNumberIncDec} onPress={() => setAmount(decrease(amount))}>
                <Entypo name="minus" size={20} color="#808080" />
              </TouchableOpacity>
              <TextInputMask style={styles.inputNumberText} keyboardType='numeric' placeholder="Amount" type={'custom'} options={{ mask: '99999' }} value={amount} onChangeText={setAmount} />
              <TouchableOpacity activeOpacity={0.3} style={styles.inputNumberIncDec} onPress={() => setAmount(increase(amount))}>
                <Entypo name="plus" size={20} color="#808080" />
              </TouchableOpacity>
            </View>
            
            <TextInputMask style={styles.input} keyboardType='numeric' placeholder="Value" type={'money'} options={{  precision: 2,  separator: ',',  delimiter: '.',  unit: 'R$',  suffixUnit: ''}} value={value} onChangeText={setValue} />
            <TextInputMask style={styles.input} keyboardType='numeric' placeholder="Date" type={'datetime'} options={{   format: 'DD/MM/YYYY' }} value={date} onChangeText={setDate} />

            <TouchableOpacity activeOpacity={0.3} style={styles.input} onPress={changeCategory}>
              <Text style={styles.textAlignCenter}>Category: {category.substring(2)}</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.3} style={styles.input} onPress={changeOperation}>
              <Text style={styles.textAlignCenter}>Operation: {operation.substring(2)}</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </View>
      <ViewDock />
    </View>
  )
}