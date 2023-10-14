import { StyleSheet, Text, View, StatusBar, TouchableOpacity,Modal, ScrollView, Button, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { Cadastro } from '../Cadastro';
import { Editar } from '../Editar';
import { Confirmar } from '../Confirmar';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import actions from '../Actions';

const statusBarHeight = StatusBar.currentHeight;

export function Animes() {
  const [data, setData] = useState("");
  const [confirmar, setConfirmar] = useState(false);
  const [pageCadastro, setPageCadastro] = useState(false);
  const [pageEditar, setPageEditar] = useState(false);

  function abrirPageCadastro(){
    setPageCadastro(true);
  }

  function abrirConfirmar(){
    setConfirmar(true);
  }

  function abrirPageEditar(){
    setPageEditar(true);
  }


  return (
    <View style={styles.container}>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
   
        <Text style={styles.contentText} backgroundColor={'red'} onPress={abrirPageCadastro} closeWindow={() => setPageEditar(false)}></Text>

      </ScrollView>

      <View style={styles.containerDock}>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={abrirPageCadastro}>
          <AntDesign name="plus" size={30} color="#808080"/>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={actions.importData}>
          <AntDesign name="up" size={30} color="#808080"/>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={actions.exportData}>
          <AntDesign name="download" size={30} color="#808080"/>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={abrirConfirmar}>
          <AntDesign name="delete" size={30} color="#808080"/>
        </TouchableOpacity>


      </View>




      <Modal visible={pageCadastro} animationType="fade">
        <Cadastro closeWindow={() => setPageCadastro(false)}/>
      </Modal>
      <Modal visible={pageEditar} animationType="fade" transparent={true}>
        <Editar closeWindow={() => setPageEditar(false)}/>
      </Modal>
      <Modal visible={confirmar} animationType="fade" transparent={true}>
        <Confirmar closeWindow={() => setConfirmar(false)}/>
      </Modal>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'flex-end',
    //backgroundColor: '#C0C0C0'
    backgroundColor: '#ffffff'
  },
  content:{
    flex: 1,
    backgroundColor: '#fff',
   
  },
  containerDock:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    height:70,
    marginBottom: 15,
    marginStart: 15,
    marginEnd: 15,
    borderRadius: 15,
    backgroundColor: '#B0C4DE',
    alignItems: 'center',
},
buttonsDock:{
    padding:5,
    backgroundColor: '#fff',
    borderRadius: 13,
},
contentText:{
    marginTop: 10,
    marginStart: 'auto',
    marginEnd: 'auto'
}
})
