import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';


const actions = {
    mostrarData: async function(){
        const response = await AsyncStorage.getItem("@JhonatanrsAndroidExpoApp:Animes");
        const data = response ? JSON.parse(response) : [];
        for (var i=0; i < data.length; i++) {
          console.log(data[i].name); 
          //mostra todos os nomes no console
        }
      },
    exportData: async function(){
        const response = await AsyncStorage.getItem("@JhonatanrsAndroidExpoApp:Animes");
        const data = response ? JSON.parse(response) : [];
        var exportDataTxt = '';
        for (var i=0; i < data.length; i++) {
          var exportData = '';
          exportData += (data[i].id)+',';
          exportData += (data[i].name)+',';
          exportData += (data[i].status)+',';
          exportData += (data[i].release)+',';
          exportData += (data[i].season01)+',';
          exportData += (data[i].season02)+',';
          exportData += (data[i].season03)+',';
          exportData += (data[i].season04)+',';
          exportData += (data[i].season05)+',';
          exportData += (data[i].season06)+',';
          exportData += (data[i].season07)+',';
          exportData += (data[i].season08)+',';
          exportData += (data[i].season09)+',';
          exportData += (data[i].season10);
          exportDataTxt += (exportData)+';\n';
        }
      
        console.log(exportDataTxt)
        //console.log(data.length)
        alert("Exportado no console com Sucesso.");
      
      },
      importData: async function(){
        
        const response = await AsyncStorage.getItem("@JhonatanrsAndroidExpoApp:Animes");
        const data = response ? JSON.parse(response) : [];
        const nextId = data.length + 1

        var importDataTxt = 'One Piece,Currently Watching,Sunday,1076;Charlotte,Completed,-,13;Prison School,Completed,-,12;Shokugeki no Souma,Completed,-,86;Overlord,Completed,-,52;Owari no Seraph,Completed,-,24;Naruto Classico,Completed,-,220;';
        var animes = importDataTxt.split(';');
    
        try{
          
          for (var i=0; i < animes.length - 1 ; i++) {
          
            const pAnimes = animes[i].split(',');
            const id = nextId+i;
            //id automatico mudar 1 2 3 4 para 0 1 2 3 futuramente 
            const name = pAnimes[0];
            const status = pAnimes[1];
            const release = pAnimes[2];
            const season01 = pAnimes[3];
            const season02 = pAnimes[4];
            const season03 = pAnimes[5];
            const season04 = pAnimes[6];
            const season05 = pAnimes[7];
            const season06 = pAnimes[8];
            const season07 = pAnimes[9];
            const season08 = pAnimes[10];
            const season09 = pAnimes[11];
            const season10 = pAnimes[12];
    
            const inewData = {
              id,
              name,
              status,
              release,
              season01,
              season02,
              season03,
              season04,
              season05,
              season06,
              season07,
              season08,
              season09,
              season10
            }
            
    
            const response = await AsyncStorage.getItem("@JhonatanrsAndroidExpoApp:Animes");
            const previousData = response ? JSON.parse(response) : [];
            const idata = [...previousData, inewData];
      
            await AsyncStorage.setItem("@JhonatanrsAndroidExpoApp:Animes",JSON.stringify(idata));
      
         
        }
    
      alert("Importado com Sucesso.");
      
      }catch(error){
    
        console.log(error);
        alert("Não foi possível importar");
    
      }
      
    },
}
export default actions;