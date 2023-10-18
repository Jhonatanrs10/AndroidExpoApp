import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes";
import { Animes } from "./src/pages/Animes";

export default function App() {
  return (
   <NavigationContainer>
      <Routes/>
    </NavigationContainer>
    //<Animes/> 
  );
}