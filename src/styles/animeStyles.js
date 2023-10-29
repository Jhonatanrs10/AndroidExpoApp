import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    //APP
    containerApp: {
      flex: 1,
      backgroundColor: '#B0C4DE',
      padding: '15%',
      flexDirection: 'row',
    },
    viewButtonsApp: {
      flex: 1,
      flexDirection: 'column-reverse',
      justifyContent: 'space-around',
      alignItems: "center",
      alignContent: 'center',
    },
    buttonIconApp: {
      padding: 0,
      margin: 0,
      height: 40,
      width: 40,
    },
    buttonsApp: {
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: "center",
      alignContent: 'center',
      borderRadius: 13,
      height: 60,
      width: 60,
      borderColor: 'black',
      borderWidth: 1,
    },
    //INDEX
    containerAnimes: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
      },
      windowAnimes: {
        flex: 1,
        margin: 15,
        borderRadius: 11,
        borderColor: 'black',
        paddingBottom: 0,
        borderWidth: 1,
        backgroundColor: '#fff'
      },
      barAnimes: {
        height: 50,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        backgroundColor: '#B0C4DE',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 0,
      },
      textBarAnimes: {
        fontWeight: "bold"
      },
      searchAnimes: {
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
      searchButtonAnimes: {
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
      containerDockAnimes: {
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
      buttonsDockAnimes: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 13,
        height: 45,
        width: 45,
      },
      containerItemListAnimes: {
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
      buttonsItemListAnimes: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingStart: 2,
        height: 30,
        width: 45,
      },
      //ADD
      barAnimesThin: {
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
      formAnimes: {
        flex: 1
      },
      textAlignCenter: {
        textAlign: 'center'
      },
      inputAnimes: {
        textAlign: 'center',
        backgroundColor: '#B0C4DE',
        marginTop: 5,
        marginBottom: 10,
        marginStart: '10%',
        marginEnd: '10%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingStart: 10,
        paddingEnd: 10,
        borderRadius: 10,
        height: 45,
        justifyContent: 'center'
      }
  })