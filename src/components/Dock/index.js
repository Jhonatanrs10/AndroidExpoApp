import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { useState } from 'react';
export default function Dock() {
 return (
    <View style={styles.containerDock}>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttonsDock} onPress={abrirPageCadastro}>
            <AntDesign name="pluscircleo" size={30} color="#808080"/>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
})