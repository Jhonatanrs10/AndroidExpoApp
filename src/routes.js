import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from './pages/Home'
import { Cadastro } from './pages/Cadastro'

const Tab = createBottomTabNavigator();

export function Routes(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Cadastro" component={Cadastro}/>
        </Tab.Navigator>
    )
}