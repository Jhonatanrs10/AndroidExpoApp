import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Animes } from '../pages/Animes'
import { Editar } from '../pages/Editar'

const Tab = createBottomTabNavigator();

export function Routes(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Animes" component={Animes}/>
            <Tab.Screen name="Carteira" component={Editar}/>
            <Tab.Screen name="Mercado" component={Editar}/>
        </Tab.Navigator>
    )
}