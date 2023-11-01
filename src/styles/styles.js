import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    //APP
    containerApp: {
      flex: 1,
      backgroundColor: '#B0C4DE',
    },
    viewButtonsApp: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap-reverse',
      alignContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
    buttonIconApp: {
      padding: 0,
      margin: 0,
      height: 70,
      width: 70,
    },
    buttonsApp: {
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: "center",
      alignContent: 'center',
      borderRadius: 20,
      margin: 5,
      height: 100,
      width: 100,
      borderColor: 'black',
      borderWidth: 3,
    },
    //INDEX
    containerIndex: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
      },
      window: {
        flex: 1,
        margin: 15,
        borderRadius: 11,
        borderColor: 'black',
        paddingBottom: 0,
        borderWidth: 1,
        backgroundColor: '#fff'
      },
      bar: {
        height: 50,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        backgroundColor: '#B0C4DE',
        flexDirection: 'column',
        justifyContent:'space-between',
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 0,
      },
      textBar: {
        fontWeight: "bold",
        alignSelf: 'center'
      },
      textBar20: {
        fontWeight: "bold",
        fontSize: 20,
      },
      search: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#B0C4DE',
        paddingStart: 5,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        borderTopColor: '#000',
        borderTopWidth: 1,
        height: 50,
      },
      searchButton: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 11,
        backgroundColor: '#fff',
        width: 40,
        height: 40,
        borderWidth: 2,
        borderColor: '#B0C4DE'
      },
      containerDock: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 70,
        marginBottom: 5,
        marginStart: 15,
        marginEnd: 15,
        borderRadius: 15,
        backgroundColor: '#B0C4DE',
        alignItems: 'center',
      },
      buttonsDock: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 13,
        height: 45,
        width: 45,
      },
      containerItemList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 10,
        marginBottom: 5,
        marginStart: 15,
        marginEnd: 15,
        borderRadius: 15,
        backgroundColor: '#B0C4DE',
        alignItems: 'center',
      },
      buttonsItemList: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingStart: 2,
        height: 30,
        width: 45,
      },
      buttonsItemListIntegrated: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: '100%',
        width: 45,
      },
      //ADD
      barThin: {
        height: 30,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        backgroundColor: '#B0C4DE',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 0,
      },
      form: {
        flex: 1
      },
      textAlignCenter: {
        textAlign: 'center'
      },
      input: {
        textAlign: 'center',
        backgroundColor: '#B0C4DE',
        marginTop: 10,
        marginBottom: 10,
        marginStart: '10%',
        marginEnd: '10%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingStart: 10,
        paddingEnd: 10,
        borderRadius: 10,
        height: 45,
        justifyContent: 'space-around'
      },
      inputNumber: {
        justifyContent: 'space-between',
        flexDirection:'row',
        textAlign: 'center',
        backgroundColor: '#B0C4DE',
        marginTop: 10,
        marginBottom: 10,
        marginStart: '10%',
        marginEnd: '10%',
        borderRadius: 10,
        height: 45,
      },
      inputNumberText: {
        flex:1,
        justifyContent: 'center',
        flexDirection:'row',
        textAlign: 'center',
     
      },
      inputNumberIncDec: {
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#fff',
        margin: 8,
        borderRadius: 10,
        padding: 4
      },
      rowCenter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems:'center',
      },
      preencher:{
        flexDirection: "row"
      },
      viewLetreiro:{
        alignContent:'center',
        marginStart: 10,
        marginEnd: 10,
      }
  })