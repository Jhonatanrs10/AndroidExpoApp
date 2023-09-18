import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'

export default function Dock() {
 return (
    <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.3} style={styles.buttons}>
            <AntDesign name="pluscircleo" size={30} color="#808080"/>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
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
    buttons:{
        padding:5,
        backgroundColor: '#fff',
        borderRadius: 13,
    },
})