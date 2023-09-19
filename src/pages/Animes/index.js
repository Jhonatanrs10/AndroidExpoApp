import { StyleSheet, Text, View, StatusBar, TouchableOpacity,Modal, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { Cadastro } from '../Cadastro';
import { Editar } from '../Editar';
import { useState } from 'react';
const statusBarHeight = StatusBar.currentHeight;

export function Animes() {

  const [pageCadastro, setPageCadastro] = useState(false);
  const [pageEditar, setPageEditar] = useState(false);

  function abrirPageCadastro(){
    setPageCadastro(true);
  }

  function abrirPageEditar(){
    setPageEditar(true);
  }

  return (
    <View style={styles.container}>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.contentText} >Teste1</Text>
        <Text style={styles.contentText} >Teste2</Text>
        <Text style={styles.contentText} >Teste3</Text>
        <Text style={styles.contentText} >Teste4</Text>
        <Text style={styles.contentText} >Teste5</Text>
        <Text style={styles.contentText} >Teste6</Text>
        <Text style={styles.contentText} >Teste7</Text>
        <Text style={styles.contentText} >Teste8</Text>
        <Text style={styles.contentText} >Teste9</Text>
        <Text style={styles.contentText} >Teste10</Text>
        <Text style={styles.contentText} >Teste11</Text>
        <Text style={styles.contentText} backgroundColor={'red'} onPress={abrirPageCadastro} closeWindow={() => setPageEditar(false)}>CLIQUE</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        <Text style={styles.contentText} >Teste</Text>
        
      </ScrollView>

      <View style={styles.containerDock}>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={abrirPageCadastro}>
          <AntDesign name="pluscircleo" size={30} color="#808080"/>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={abrirPageEditar}>
          <AntDesign name="edit" size={30} color="#808080"/>
        </TouchableOpacity>
      </View>




      <Modal visible={pageCadastro} animationType="fade" transparent={true}>
        <Cadastro closeWindow={() => setPageCadastro(false)}/>
      </Modal>
      <Modal visible={pageEditar} animationType="fade" transparent={true}>
        <Editar value="olaaa" closeWindow={() => setPageEditar(false)}/>
      </Modal>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#C0C0C0'
  },
  content:{
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin:20,
    marginTop:14,
    marginBottom:16,
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
    marginStart: 'auto',
    marginEnd: 'auto'
}
})
