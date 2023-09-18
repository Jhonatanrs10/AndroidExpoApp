import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Dock from '../../components/Dock';

const statusBarHeight = StatusBar.currentHeight;

export function Home() {
  return (
    <View style={styles.container}>
        <View style={styles.content}>
            <Text>Era uma vez um menino</Text>
        </View>
      <Dock/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#fff'
  },
  content:{
    flex: 1,
    backgroundColor: '#fff',
    marginTop: statusBarHeight+10,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 7,
    padding: 5
  }
})
