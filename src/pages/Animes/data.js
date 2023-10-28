import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { ToastAndroid, Share } from 'react-native';
//import { shareAsync } from 'expo-sharing';



const actions = {
  showMsg: function (msg) {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  },
  exportData: async function () {
    const response = await AsyncStorage.getItem("@JhonatanrsAndroidExpoApp:Animes");
    const data = response ? JSON.parse(response) : [];
    var exportDataTxt = '';

    for (var i = 0; i < data.length; i++) {
      var exportData = '';
      exportData += (data[i].id) + '[';
      exportData += (data[i].name) + '[';
      exportData += (data[i].status) + '[';
      exportData += (data[i].release) + '[';
      exportData += (data[i].obs) + '[';
      exportData += (data[i].linkW) + '[';
      exportData += (data[i].season01) + '[';
      exportData += (data[i].season02) + '[';
      exportData += (data[i].season03) + '[';
      exportData += (data[i].season04) + '[';
      exportData += (data[i].season05) + '[';
      exportData += (data[i].season06) + '[';
      exportData += (data[i].season07) + '[';
      exportData += (data[i].season08) + '[';
      exportData += (data[i].season09) + '[';
      exportData += (data[i].season10);
      exportDataTxt += (exportData) + ']\n';
    }

    console.log(exportDataTxt)

      try {
        const result = await Share.share({
          message: ('AnimesData\n\nid,name,status,release,obs,linkW,season01,season02,season03,season04,season05,season06,season07,season08,season09,season10;' + '\n' + exportDataTxt),
        });

        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            console.log('shared with activity type of: ', result.activityType)
          } else {
            console.log('shared')
          }
        } else if (result.action === Share.dismissedAction) {
          console.log('dismissed')
        }
      } catch (error) { 
        console.log(error.message)
      } 
    
    //FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'database.txt', exportDataTxt);

    //ToastAndroid.show('Exportado com Sucesso!!', ToastAndroid.SHORT);

  },
  importData: async function () {
    try {
      const response = await AsyncStorage.getItem("@JhonatanrsAndroidExpoApp:Animes");
      const data = response ? JSON.parse(response) : [];
      var count = 0;
      for (var i = 0; i < data.length; i++) {
        count = data[i].id
      }
      const nextId = count + 1

      //var importDataTxt = 'TATE NO YUUSHA,Watching,Sunday,TOP,https://meuanime.io/epsonline/tate-no-yuusha-no-nariagari-3,24,,,,,,,,,;One Piece,Watching,Saturday,TOP,https://meuanime.io/epsonline/tate-no-yuusha-no-nariagari-3,1076,,,,,,,,,;';
      //var importDataTxt = 'Segunda,Watching,7-Sunday,TOP,,,,,,,,,,,24;Segunda2,Watching,5-Friday,TOP,,,,,,,,,,,24;terça,Watching,2-Tuesday,TOP,,,,,,,,,,,24;';

      var importDataTxt = `One Piece[Watching[Sunday[[[1080[[[[[[[[[]
Charlotte[Completed[-[[[13[[[[[[[[[]
Prison School[Completed[-[[[12[[[[[[[[[]
Shokugeki no Souma[Completed[-[[[24[13[24[12[13[[[[[]
Overlord[Completed[-[[[13[13[13[13[[[[[[]
Owari no Seraph[Completed[-[ [[12[12[[[[[[[[]
Naruto Classico[Completed[-[[[220[[[[[[[[[]
Naruto Shippuden[Completed[-[[[500[[[[[[[[[]
Kuusen Madoushi Kouhosei no Kyoukan[Completed[-[[[12[[[[[[[[[]
God Eater[Completed[-[[[13[[[[[[[[[]
Rokka no Yuusha[Completed[-[ [[12[[[[[[[[[]
High School DxD[Completed[-[[[13[12[12[12[[[[[[]
Shinmai Maou no Testament[Completed[-[Filme: Shinmai Maou no Testament Departures[[12[10[[[[[[[[]
No Game No Life[Completed[-[Filme: Zero[[12[[[[[[[[[]
Tokyo Ghoul[Completed[-[[[12[12[24[[[[[[[]
Kiss x Sis[Completed[-[[[12[[[[[[[[[]
Absolute Duo[Completed[-[[[12[[[[[[[[[]
Another[Completed[-[[[12[[[[[[[[[]
Trinity Seven[Completed[-[[[12[[[[[[[[[]
Highschool of the Dead[Completed[-[[[12[[[[[[[[[]
Hagure Yuusha No Estetica[Completed[-[[[12[[[[[[[[[]
Zero no Tsukaima[Completed[-[[[13[12[12[12[[[[[[]
Yamada-kun to 7-nin no Majo[Completed[-[[[12[[[[[[[[[]
Ao Haru Ride[Completed[-[[[12[[[[[[[[[]
Nisekoi[Completed[-[[[20[13[[[[[[[[]
Deadman Wonderland[Completed[-[[[12[[[[[[[[[]
Shingeki no Kyojin[Completed[-[S4 p1(16),p2(12),p3(1)[[25[12[22[29[[[[[[]
Yu Yu Hakusho[Completed[-[[[112[[[[[[[[[]
Cross Ange[Completed[-[[[25[[[[[[[[[]
Sword Art Online[Completed[-[Filme: Sword Art Online: Ordinal Scale[[25[25[48[[[[[[[]
Sword Art Online Alternative: Gun Gale Online[Completed[-[[[13[[[[[[[[[]
To Aru Majutsu no Index[Completed[-[[[24[24[26[[[[[[[]
Mirai Nikki[Completed[-[OVA: Redial[[26[[[[[[[[[]
Dungeon Ni Deai Wo Motomeru No Wa Machigatteiru No Darou Ka (Danmachi)[Completed[-[[[13[12[12[22[[[[[[]
Death Note[Completed[-[[[37[[[[[[[[[]
Akame Ga Kill![Completed[-[[[24[[[[[[[[[]
Nanatsu No Taizai[Completed[-[[[24[4[24[24[24[[[[[]
Hunter x Hunter (Classico E1~92 + 2011 E76~148)[Completed[-[[[165[[[[[[[[[]
Gakusen Toshi Asterisk[Completed[-[[[12[12[[[[[[[[]
Monster Strike[Completed[-[[[51[[[[[[[[[]
Taimadou Gakuen 35 Shiken Shoutai[Completed[-[[[12[[[[[[[[[]
Noragami[Completed[-[[[12[13[[[[[[[[]
Guilty Crown[Completed[-[[[22[[[[[[[[[]
Initial D (Todos Menos os 2 Extra Stage)[Completed[-[Filmes:Initial D Third Stage, Initial D Battle Stage 1 e 2, Legend 1, 2 e 3[[26[13[1[24[14[4[[[[]
One Punch Man[Completed[-[[[12[12[[[[[[[[]
Mondaiji-tachi Ga Isekai Kara Kuru Sou Desu Yo?[Completed[-[[[10[[[[[[[[[]
Rakudai Kishi No Cavalry[Completed[-[[[12[[[[[[[[[]
Densetsu No Yuusha No Densetsu[Completed[-[[[24[[[[[[[[[]
Ichiban Ushiro No Daimaou[Completed[-[[[12[[[[[[[[[]
Kaze No Stigma[Completed[-[[[24[[[[[[[[[]
Air Gear[Completed[-[[[25[[[[[[[[[]
Elfen Lied[Completed[-[[[13[[[[[[[[[]
K Project[Completed[-[[[13[13[[[[[[[[]
Hellsing[Completed[-[[[13[[[[[[[[[]
Devil May Cry[Completed[-[[[12[[[[[[[[[]
IS: Infinite Stratos[Completed[-[[[12[[[[[[[[[]
Grisaia No Kajitsu[Completed[-[[[13[1[10[[[[[[[]
Mahouka Koukou No Rettousei[Completed[-[[[26[13[[[[[[[[]
Ao No Exorcist[Completed[-[[[25[12[[[[[[[[]
Hataraku Maou-sama[Completed[-[temp1, temp2part1, temp2part2[[13[12[12[[[[[[[]
Chuunibyou Demo Koi Ga Shitai[Completed[-[tem um filme que finaliza a historia mais ainda não vi[[12[12[[[[[[[[]
Code Geass[Completed[-[Filme: Fukkatsu no Lelouch[[25[25[[[[[[[[]
Zettai Karen Children Hyoubu Kyousuke[Completed[-[[[12[[[[[[[[[]
Kiseijuu: Sei No Kakuritsu[Completed[-[[[24[[[[[[[[[]
Soredemo Sekai Wa Utsukushii[Completed[-[[[12[[[[[[[[[]
Btooom[Completed[-[[[12[[[[[[[[[]
Death Parade[Completed[-[[[12[[[[[[[[[]
Prince Of Stride: Alternative[Completed[-[[[12[[[[[[[[[]
Kono Subarashii Sekai Ni Shukufuku Wo![Completed[-[Filme: Kono Subarashii Sekai Ni Shukufuku Wo! Kurenai Densetsu[[10[10[[[[[[[[]
Seiken Tsukai No World Break[Completed[-[[[12[[[[[[[[[]
Boku Dake Ga Inai Machi (ERASED)[Completed[-[[[12[[[[[[[[[]
Divine Gate[Completed[-[[[12[[[[[[[[[]
Mahou Sensou[Completed[-[[[12[[[[[[[[[]
Hai To Gensou No Grimgar[Completed[-[[[12[[[[[[[[[]
Blood-C[Completed[-[Filme: Blood-C: The Last Dark[[12[[[[[[[[[]
Undefeated Bahamut Chronicle[Completed[-[[[12[[[[[[[[[]
Ao No Kanata No Four Rhythm[Completed[-[[[12[[[[[[[[[]
Hundred[Completed[-[[[12[[[[[[[[[]
Big Order[Completed[-[[[10[[[[[[[[[]
Mayoiga[Completed[-[[[12[[[[[[[[[]
Ansatsu Kyoushitsu (Assassination Classroom)[Completed[-[[[22[25[[[[[[[[]
Boku No Hero Academia[Completed[-[3 Filmes Assistidos[[13[25[25[25[25[25[[[[]
ReLIFE[Completed[-[OVAs: 1, 2, 3 e 4[[13[[[[[[[[[]
Netoge No Yome Wa Onnanoko Ja Nai To Omotta?[Completed[-[[[12[[[[[[[[[]
Koutetsujou No Kabaneri[Completed[-[Filme: Kabaneri of the Iron Fortress: The Battle of Unato[[12[[[[[[[[[]
Code: Breaker[Completed[-[[[13[[[[[[[[[]
One Outs[Completed[-[[[25[[[[[[[[[]
Gokukoku No Brynhildr[Completed[-[[[13[[[[[[[[[]
Re: Zero Kara Hajimeru Isekai Seikatsu[Completed[-[[[25[25[[[[[[[[]
Bleach[Completed[-[S3 é part2 da S2[[366[13[13[[[[[[[]
Masou Gakuen Hybrid X Heart (HxH)[Completed[-[[[12[[[[[[[[[]
Servamp[Completed[-[[[12[[[[[[[[[]
Taboo Tattoo[Completed[-[[[12[[[[[[[[[]
Mob Psycho 100[Completed[-[[[12[13[12[[[[[[[]
Hitori No Shita: The Outcast[Completed[-[Obs: Parei de assistir no EP 37[[37[[[[[[[[[]
Fairy Tail[Completed[-[[[328[[[[[[[[[]
Tales Of Zestiria The X[Completed[-[[[12[13[[[[[[[[]
91 Days[Completed[-[[[13[[[[[[[[[]
Blood Lad[Completed[-[[[10[[[[[[[[[]
Nejimaki Seirei Senki: Tenkyou No Alderamin[Completed[-[[[13[[[[[[[[[]
Ano Hana[Completed[-[[[11[[[[[[[[[]
Samurai X[Completed[-[[[95[[[[[[[[[]
Monster Musume No Iru Nichijou[Completed[-[[[12[[[[[[[[[]
Shimoneta To Iu Gainen Ga Sonzai Shinai Taikutsu Na Sekai[Completed[-[[[12[[[[[[[[[]
Kaichou Wa Maid-sama[Completed[-[[[26[[[[[[[[[]
School Days[Completed[-[[[12[[[[[[[[[]
Corpse Party[Completed[-[Episodios iguais OVAs[[1[4[[[[[[[[]
Angel Beats[Completed[-[[[13[[[[[[[[[]
Shuumatsu no Izetta[Completed[-[[[12[[[[[[[[[]
Soul Buster[Completed[-[[[12[[[[[[[[[]
Mahou Shoujo Ikusei Keikaku[Completed[-[[[12[[[[[[[[[]
Vivid Strike![Completed[-[[[13[[[[[[[[[]
Keijo!!!!!!!![Completed[-[[[12[[[[[[[[[]
Drifters[Completed[-[[[12[[[[[[[[[]
Nanbaka[Completed[-[[[13[12[[[[[[[[]
Yosuga No Sora[Completed[-[[[12[[[[[[[[[]
Date A Live[Completed[-[[[12[10[12[12[[[[[[]
Chaos Head[Completed[-[[[12[[[[[[[[[]
Okusama Ga Seito Kaichou![Completed[-[[[12[12[[[[[[[[]
Jitsu Wa Watashi Wa[Completed[-[[[13[[[[[[[[[]
Dakara Boku Wa, H Ga Dekinai[Completed[-[[[12[[[[[[[[[]
Gate: Jieitai Kanochi Nite, Kaku Tatakaeri[Completed[-[[[12[12[[[[[[[[]
Mahou Shoujo Madoka Magika[Completed[-[[[12[[[[[[[[[]
Sakamoto Desu Ga?[Completed[-[[[12[[[[[[[[[]
Zetman[Completed[-[[[13[[[[[[[[[]
Machine-Doll Wa Kizutsukanai[Completed[-[[[13[[[[[[[[[]
Dagashi Kashi[Completed[-[[[12[12[[[[[[[[]
Ookami Shoujo To Kuro Ouji[Completed[-[[[12[[[[[[[[[]
Masamune-kun No Revenge[Completed[-[[[12[12[[[[[[[[]
Hand Shakers[Completed[-[[[12[[[[[[[[[]
Akibas Trip The Animation[Completed[-[[[13[[[[[[[[[]
Shigatsu Wa Kimi No Uso[Completed[-[[[22[[[[[[[[[]
Toradora[Completed[-[[[25[[[[[[[[[]
Sousei No Onmyouji[Completed[-[[[50[[[[[[[[[]
Kyoukai No Kanata[Completed[-[Filme: Kyoukai no Kanata Movie 2: I'll Be Here - Mirai-hen[[12[[[[[[[[[]
Black Rock Shooter[Completed[-[[[8[[[[[[[[[]
11 Eyes[Completed[-[[[12[[[[[[[[[]
Boku Wa Tomodachi Ga Sukunai[Completed[-[[[13[12[[[[[[[[]
Pokémon Origins[Completed[-[[[4[[[[[[[[[]
Witch Craft Works[Completed[-[[[12[[[[[[[[[]
Madan No Ou To Vanadis[Completed[-[[[13[[[[[[[[[]
Isekai No Seikishi Monogatari[Completed[-[[[13[[[[[[[[[]
Koukaku No Regios[Completed[-[[[24[[[[[[[[[]
Now And Then, Here And There[Completed[-[[[13[[[[[[[[[]
Juuou Mujin No Fafnir[Completed[-[[[12[[[[[[[[[]
Shijou Saikyou No Deshi Kenichi[Completed[-[[[50[[[[[[[[[]
Busou Renkin[Completed[-[[[26[[[[[[[[[]
Oda Nobuna No Yabou[Completed[-[[[12[[[[[[[[[]
Itsuka Tenma No Kuro Usagi[Completed[-[[[12[[[[[[[[[]
Eromanga Sensei[Completed[-[[[12[[[[[[[[[]
Rokudenashi Majutsu Koushi To Kinki Kyouten[Completed[-[[[12[[[[[[[[[]
Busou Shoujo Machiavellianism[Completed[-[[[12[[[[[[[[[]
Quan Zhi Gao Shou[Completed[-[Filme: Quan Zhi Gao Shou Movie (The King's Avatar Movie)[[12[3[24[[[[[[[]
Blade Dance Of The Elementalers[Completed[-[[[12[[[[[[[[[]
Hyouka[Completed[-[[[22[[[[[[[[[]
Ookami-san To Shichinin No Nakamatachi[Completed[-[[[12[[[[[[[[[]
Maoyuu Maou Yuusha[Completed[-[[[12[[[[[[[[[]
Asu No Yoichi[Completed[-[[[12[[[[[[[[[]
Ben-To[Completed[-[[[12[[[[[[[[[]
Hoshizora E Kakaru Hashi[Completed[-[[[12[[[[[[[[[]
Sekirei[Completed[-[[[12[14[[[[[[[[]
Arata Kangatari[Completed[-[[[12[[[[[[[[[]
Kuzu No Honkai[Completed[-[[[12[[[[[[[[[]
Kekkai Sensen[Completed[-[[[13[12[[[[[[[[]
Princess Lover![Completed[-[[[12[[[[[[[[[]
Seisen Cerberus: Ryuukoku No Fatalités[Completed[-[[[13[[[[[[[[[]
Punchline[Completed[-[[[12[[[[[[[[[]
Fullmetal Alchemist Brotherhood[Completed[-[[[64[[[[[[[[[]
Black Bullet[Completed[-[[[13[[[[[[[[[]
Togainu No Chi[Completed[-[[[12[[[[[[[[[]
Tokyo Ravens[Completed[-[[[24[[[[[[[[[]
Seiken No Blacksmith[Completed[-[[[12[[[[[[[[[]
Strike The Blood[Completed[-[Obs: Anime de OVAs[[24[8[10[2[[[[[[]
Hajimete No Gal[Completed[-[[[10[[[[[[[[[]
Isekai Wa Smartphone To Tomo Ni[Completed[-[[[12[12[[[[[[[[]
Full Time Magister Quanzhi Fashi[Completed[-[[[12[12[12[12[12[[[[[]
Youkoso Jitsuryoku Shijou Shugi No Kyoushitsu E[Completed[-[[[12[13[[[[[[[[]
Campione[Completed[-[[[13[[[[[[[[[]
Youjo Senki[Completed[-[[[12[[[[[[[[[]
Cube X Cursed X Curious[Completed[-[[[12[[[[[[[[[]
Ore No Kanojo To Osananajimi Ga Shuraba Sugiru[Completed[-[[[13[[[[[[[[[]
Neppuu Kairiku Bushi Road (Filme)[Completed[-[[[1[[[[[[[[[]
Seikon No Qwaser[Completed[-[[[24[12[[[[[[[[]
Kanojo Ga Flag O Oraretara[Completed[-[[[13[[[[[[[[[]
Zankyou No Terror[Completed[-[[[11[[[[[[[[[]
Zetsuen No Tempest[Completed[-[[[24[[[[[[[[[]
Kimi no Na wa (Filme)[Completed[-[[[1[[[[[[[[[]
Koe no Katachi (Filme)[Completed[-[[[1[[[[[[[[[]
Tsuki Ga Kirei[Completed[-[[[12[[[[[[[[[]
Katekyo Hitman Reborn[Completed[-[[[203[[[[[[[[[]
Himouto! Umaru-chan[Completed[-[[[12[12[[[[[[[[]
Boruto: Naruto Next Generations[Completed[-[Dei uma parada ficou chato[[218[[[[[[[[[]
Black Clover[Completed[-[[[170[[[[[[[[[]
Ousama Game The Animation[Completed[-[[[12[[[[[[[[[]
Inuyashiki[Completed[-[[[11[[[[[[[[[]
Seikoku No Dragonar[Completed[-[[[12[[[[[[[[[]
Gamers![Completed[-[[[12[[[[[[[[[]
Outbreak Company[Completed[-[[[12[[[[[[[[[]
Aoi Sekai No Chuushin De[Completed[-[[[3[[[[[[[[[]
Violet Evergarden[Completed[-[Filme: Eien to Jidou Shuki Ningyou, Violet Evergarden:O Filme, OVA: 1[[13[[[[[[[[[]
Toji No Miko[Completed[-[[[25[[[[[[[[[]
Death March Kara Hajimaru Isekai Kyousoukyoku[Completed[-[[[12[[[[[[[[[]
Jikan No Shihaisha[Completed[-[[[13[[[[[[[[[]
Clockwork Planet[Completed[-[[[12[[[[[[[[[]
Darling In The FranXX[Completed[-[[[26[[[[[[[[[]
Kill La Kill[Completed[-[[[24[[[[[[[[[]
Kokoro ga Sakebitagatterun Da (Filme)[Completed[-[[[1[[[[[[[[[]
Wangan Midnight[Completed[-[[[26[[[[[[[[[]
Steins Gate[Completed[-[[[25[[[[[[[[[]
Steins Gate 0[Completed[-[[[23[[[[[[[[[]
Occultic Nine[Completed[-[[[12[[[[[[[[[]
Tasogare Otome X Amnesia[Completed[-[[[12[[[[[[[[[]
B: The Beginning[Completed[-[[[12[1[[[[[[[[]
Grancrest Senki[Completed[-[[[25[[[[[[[[[]
Sword Gai[Completed[-[[[12[12[[[[[[[[]
Golden Time[Completed[-[[[24[[[[[[[[[]
Megalo Box[Completed[-[[[13[13[[[[[[[[]
Tsurezure Children[Completed[-[[[12[[[[[[[[[]
Kakegurui[Completed[-[[[12[12[[[[[[[[]
Mikakunin De Shinkoukei[Completed[-[[[12[[[[[[[[[]
Servant X Service[Completed[-[[[13[[[[[[[[[]
Shuumatsu Nani Shitemasu Ka? Isogashii Desu Ka? Sukutte Moratte Ii Desu Ka?[Completed[-[[[12[[[[[[[[[]
Mayo Chiki[Completed[-[[[13[[[[[[[[[]
Karakai Jouzu No Takagi-san[Completed[-[Filme Final Assistido[[12[12[12[[[[[[[]
Island[Completed[-[[[12[[[[[[[[[]
Hanebado![Completed[-[[[13[[[[[[[[[]
Isekai Maou To Shoukan Shoujo No Dorei Majutsu[Completed[-[[[12[10[[[[[[[[]
Shichisei No Subaru[Completed[-[[[12[[[[[[[[[]
Satsuriku No Tenshi[Completed[-[[[16[[[[[[[[[]
Hyakuren No Haou To Seiyaku No Valkyria[Completed[-[[[12[[[[[[[[[]
Grand Blue[Completed[-[[[12[[[[[[[[[]
Rosario + Vampire[Completed[-[[[13[13[[[[[[[[]
Kokoro Connect[Completed[-[[[17[[[[[[[[[]
Asobi Asobase[Completed[-[[[12[[[[[[[[[]
Banana Fish[Completed[-[[[24[[[[[[[[[]
5 Centimeters Per Second (Filme)[Completed[-[[[1[[[[[[[[[]
Tsugumomo[Completed[-[[[12[12[[[[[[[[]
Koi To Uso[Completed[-[[[12[[[[[[[[[]
Kiznaiver[Completed[-[[[13[[[[[[[[[]
Goblin Slayer[Watching[Friday (Today)[Filme1[[13[3[[[[[[[[]
Tensei Shitara Slime Datta Ken[Completed[-[Filme 1 Assistido[[24[24[[[[[[[[]
Seishun Buta Yarou Wa Bunny Girl Senpai No Yume Wo Minai[Completed[-[Filme: Seishun Buta Yarou Wa Yumemiru Shoujo No Yume Wo Minai[[13[[[[[[[[[]
Kotonoha no Niwa (Filme)[Completed[-[[[1[[[[[[[[[]
Kishuku Gakkou No Juliet[Completed[-[[[12[[[[[[[[[]
Ballroom E Youkoso[Completed[-[[[24[[[[[[[[[]
Gantz[Completed[-[[[26[[[[[[[[[]
Ano Natsu De Matteru[Completed[-[[[12[[[[[[[[[]
Haikyuu!![Completed[-[[[25[25[10[25[[[[[[]
Ajin[Completed[-[[[13[13[[[[[[[[]
Tate No Yuusha No Nariagari[Watching[Friday (Today)[[[25[13[3[[[[[[[]
Yakusoku No Neverland[Completed[-[[[23[[[[[[[[[]
Go-Toubun No Hanayome[Completed[-[Filme Final Assistido[[12[12[[[[[[[[]
Domestic Na Kanojo[Completed[-[[[12[[[[[[[[[]
Kaguya-sama Wa Kokurasetai: Tensai-tachi No Renai Zunousen[Completed[-[filme continuação com beijo First Kiss[[12[12[13[[[[[[[]
Dororo[Completed[-[[[24[[[[[[[[[]
Ryuugajou Nanana No Maizoukin[Completed[-[[[11[[[[[[[[[]
Tsurune[Completed[-[[[13[13[[[[[[[[]
Gin No Saji[Completed[-[[[11[11[[[[[[[[]
UQ Holder!: Mahou Sensei Negima! 2[Completed[-[[[12[[[[[[[[[]
Jormungand[Completed[-[[[12[12[[[[[[[[]
Made in Abyss[Completed[-[[[14[[[[[[[[[]
Yoake Mae Yori Ruriiro Na: Crescent Love[Completed[-[[[12[[[[[[[[[]
Afro Samurai[Completed[-[[[5[[[[[[[[[]
Devilman Crybaby[Completed[-[[[10[[[[[[[[[]
Mukou Hadan (Filme)[Completed[-[[[1[[[[[[[[[]
Yahari Ore No Seishun Love Come Wa Machigatteiru (Oregairu)[Completed[-[[[13[13[12[[[[[[[]
Hanasaku Iroha[Completed[-[[[26[[[[[[[[[]
Isekai Quartet[Completed[-[[[12[12[[[[[[[[]
Kenja no Mago[Completed[-[[[12[[[[[[[[[]
Kimetsu No Yaiba - Demon Slayer[Completed[-[Filme e Temporada - Demon Slayer: Kimetsu no Yaiba the Movie: Mugen Train[[26[11[11[[[[[[[]
Kono Oto Tomare![Completed[-[[[26[[[[[[[[[]
Dragon Crisis[Completed[-[[[12[[[[[[[[[]
Kimi no Suizou wo Tabetai – I Want Eat Your Pancreas (Filme)[Completed[-[[[1[[[[[[[[[]
Bayonetta: Bloody Fate (Filme)[Completed[-[[[1[[[[[[[[[]
Dance In The Vampire Bund[Completed[-[[[12[[[[[[[[[]
3D Kanojo: Real Girl[Completed[-[[[12[12[[[[[[[[]
Gosick[Completed[-[[[13[[[[[[[[[]
Arifureta Shokugyou de Sekai Saikyou[Completed[-[[[13[12[[[[[[[[]
Enen no Shouboutai[Completed[-[[[24[24[[[[[[[[]
Dansai Bunri No Crime Edge[Completed[-[[[13[[[[[[[[[]
Ahiru no Sora[Completed[-[[[49[[[[[[[[[]
Ore Wo Suki Nano Wa Omae Dake Ka Yo[Completed[-[[[12[[[[[[[[[]
Kimi to, Nami ni Noretara (Filme)[Completed[-[[[1[[[[[[[[[]
Kyokou Suiri[Completed[-[Anime bom mais meio lento[[12[12[[[[[[[[]
Soul Eater[Completed[-[[[51[[[[[[[[[]
Bakuman[Completed[-[[[25[25[25[[[[[[[]
Kami no Tou[Completed[-[[[13[[[[[[[[[]
Gleipnir[Completed[-[[[13[[[[[[[[[]
Mnemosyne: Mnemosyne No Musume-tachi[Completed[-[[[6[[[[[[[[[]
Sakurasou no Pet na Kanojo[Completed[-[[[24[[[[[[[[[]
Tenki no Ko (Filme)[Completed[-[[[1[[[[[[[[[]
Maou Gakuin No Futekigousha[Watching[Saturday[pausou no meio talvez eu volte a ver se me deparar com a obra dnv[[13[8[[[[[[[[]
The God Of High School[Completed[-[[[13[[[[[[[[[]
Akudama Drive[Completed[-[[[11[[[[[[[[[]
Jujutsu Kaisen[Watching[Thursday[Filme1[[24[13[[[[[[[[]
Akira (Filme)[Completed[-[[[1[[[[[[[[[]
Kujira No Kora Wa Sajou Ni Utau[Completed[-[[[12[[[[[[[[[]
Mushoku Tensei: Isekai Ittara Honki Dasu[Completed[-[Aguardo da part2 da 2temp[[23[12[[[[[[[[]
Yasuke[Completed[-[[[6[[[[[[[[[]
Mashiro No Oto[Completed[-[[[12[[[[[[[[[]
Tsuki ga Michibiku Isekai Douchuu[Completed[-[[[12[[[[[[[[[]
Deatte 5-byou de Battle[Completed[-[[[12[[[[[[[[[]
Seirei Gensouki[Completed[-[[[12[[[[[[[[[]
Odd Taxi[Completed[-[[[13[[[[[[[[[]
Triage X[Completed[-[[[10[[[[[[[[[]
Re-Main[Completed[-[[[12[[[[[[[[[]
Vanitas no Carte[Completed[-[[[12[12[[[[[[[[]
86[Completed[-[[[11[13[[[[[[[[]
Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei Suru[Completed[-[[[12[[[[[[[[[]
Shin no Nakama ja Nai to Yuusha no Party wo Oidasareta node[Completed[-[[[13[[[[[[[[[]
Kimi to Boku no Saigo no Senjou, Aruiwa Sekai ga Hajimaru Seisen[Completed[-[[[12[[[[[[[[[]
Kaifuku Jutsushi no Yarinaoshi[Completed[-[[[12[[[[[[[[[]
Jaku-Chara Tomozaki-kun[Completed[-[[[12[[[[[[[[[]
Genjitsu Shugi Yuusha no Oukoku Saikenki[Completed[-[[[13[12[[[[[[[[]
Xian Wang de Richang Shenghuo[Completed[-[Continua[[15[2[[[[[[[[]
Muv-Luv Alternative[Completed[-[Bem ruinzin não continuaria vendo[[12[12[[[[[[[[]
Blue Period[Completed[-[[[12[[[[[[[[[]
Sono Bisque Doll wa Koi wo Suru[Completed[-[[[12[[[[[[[[[]
Shikkakumon no Saikyou Kenja[Completed[-[[[12[[[[[[[[[]
Shijou Saikyou no Daimaou, Murabito A ni Tensei suru[Completed[-[[[12[[[[[[[[[]
Yuusha, Yamemasu[Completed[-[[[12[[[[[[[[[]
Mahoutsukai Reimeiki[Completed[-[[[12[[[[[[[[[]
Kawaii dake ja Nai Shikimori-san[Completed[-[[[12[[[[[[[[[]
Gaikotsu Kishi-sama, Tadaima Isekai e Odekakechuu[Completed[-[[[12[[[[[[[[[]
Ao Ashi[Completed[-[[[24[[[[[[[[[]
Spy x Family[Watching[Saturday[[[25[3[[[[[[[[]
Summer Time Rendering[Completed[-[[[25[[[[[[[[[]
Kinsou no Vermeil[Completed[-[[[12[[[[[[[[[]
Isekai Meikyuu de Harem wo[Completed[-[[[12[[[[[[[[[]
Yofukashi no Uta[Completed[-[[[13[[[[[[[[[]
Kuro no Shoukanshi[Completed[-[[[12[[[[[[[[[]
Cyberpunk Edgerunners[Completed[-[[[10[[[[[[[[[]
Chainsaw Man[Completed[-[[[12[[[[[[[[[]
Tensei Shitara Ken Deshita[Completed[-[[[12[[[[[[[[[]
Noumin Kanren no Skill bakka Agetetara Nazeka Tsuyoku Natta[Completed[-[[[12[[[[[[[[[]
Yuusha Party wo Tsuihou sareta Beast Tamer, Saikyoushu no Nekomimi Shoujo to Deau[Completed[-[[[13[[[[[[[[[]
Blue Lock[Completed[-[[[24[[[[[[[[[]
Hachi-nan tte, Sore wa Nai deshou![Completed[-[[[12[[[[[[[[[]
Kami-tachi ni Hirowareta Otoko[Completed[-[Recomendo[[12[12[[[[[[[[]
Kage no Jitsuryokusha ni Naritakute![Watching[Wednesday[[[20[4[[[[[[[[]
Isekai Cheat Magician[Completed[-[S1E13 Especial assistido e contabilizado[[13[[[[[[[[[]
Horimiya[Completed[-[[[13[[[[[[[[[]
Isekai Yakkyoku[Completed[-[[[12[[[[[[[[[]
Koroshi Ai[Completed[-[[[12[[[[[[[[[]
Mamahaha no Tsurego ga Motokano datta[Completed[-[[[12[[[[[[[[[]
Bokutachi no Remake[Completed[-[[[12[[[[[[[[[]
Isekai Nonbiri Nouka[Completed[-[[[12[[[[[[[[[]
Hyouken no Majutsushi ga Sekai wo Suberu[Completed[-[[[12[[[[[[[[[]
Ningen Fushin no Boukensha-tachi ga Sekai wo Sukuu you desu[Completed[-[[[12[[[[[[[[[]
Otonari no Tenshi-sama ni Itsunomanika Dame Ningen ni Sareteita Ken[Completed[-[[[12[[[[[[[[[]
Benriya Saitou-san, Isekai ni Iku[Completed[-[[[12[[[[[[[[[]
Ulysses: Jehanne Darc to Renkin no Kishi[Completed[-[[[12[[[[[[[[[]
Kimi ni Todoke[Completed[-[Chorei no 2 Ep[[25[12[[[[[[[[]
Majo no Tabitabi[Completed[-[[[12[[[[[[[[[]
Isekai de Cheat Skill wo Te ni Shita Ore wa[Completed[-[[[13[[[[[[[[[]
Kanojo Okarishimasu[Completed[-[[[12[12[12[[[[[[[]
Tonikaku Kawaii[Completed[-[1 OVA + S01E13 Especial[[13[12[[[[[[[[]
Saikyou Onmyouji no Isekai Tenseiki[Completed[-[[[13[[[[[[[[[]
Tensei Kizoku no Isekai Boukenroku[Completed[-[[[12[[[[[[[[[]
Kaminaki Sekai no Kamisama Katsudou[Completed[-[[[12[[[[[[[[[]
Mashle: Magic and Muscles[Completed[-[[[12[[[[[[[[[]
Megami no Café Terrace[Completed[-[[[12[[[[[[0[[[]
Jigokuraku[Completed[-[[[13[[[[[[[[[]
Isekai Shoukan wa Nidome desu[Completed[-[[[12[[[[[[[[[]
Otonari ni Ginga[Completed[-[[[12[[[[[[[[[]
Ao no Orchestra[Completed[-[[[24[[[[[[[[[]
Oshi no Ko[Completed[-[[[11[[[[[[[[[]
Nakitai Watashi wa Neko wo Kaburu (Filme)[Completed[-[legalzim[[1[[[[[[[[[]
Ore dake Haireru Kakushi Dungeon[Completed[-[[[12[[[[[[[[[]
Tokyo Revengers[Watching[Tuesday[[[24[13[4[[[[[[[]
Megami Ryou no Ryoubo-kun[Completed[-[[[10[[[[[[[[[]
Natsu e no Tunnel, Sayonara no Deguchi (Filme)[Completed[-[Filme[[1[[[[[[[[[]
Helck[Watching[Tuesday[[[16[[[[[[[[[]
Jitsu wa Ore, Saikyou deshita?[Completed[-[[[12[[[[[[[[[]
Watashi no Shiawase na Kekkon[Completed[-[[[12[[[[[[[[[]
Eiyuu Kyoushitsu[Completed[-[[[12[[[[[[[[[]
Nanatsu no Maken ga Shihai suru[Completed[-[[[15[[[[[[[[[]
Seiren[Completed[-[[[12[[[[[[[[[]
Tatoeba Last Dungeon Mae no Mura no Shounen ga Joban no Machi de Kurasu Youna Monogatari[Completed[-[[[12[[[[[[[[[]
Boushoku no Berserk[Watching[Sunday[[[4[[[[[[[[[]
Seiken Gakuin no Maken Tsukai[Watching[Wednesday[[[5[[[[[[[[[]
Keikenzumi na Kimi to Keiken Zero na Ore ga Otsukiai suru Hanashi.[Watching[Friday (Today)[[[3[[[[[[[[[]`

      var animes = importDataTxt.split(']');

      for (var i = 0; i < animes.length - 1; i++) {

        const pAnimes = animes[i].split('[');
        const id = nextId + i;
        const name = pAnimes[0];
        const status = pAnimes[1];
        const release = pAnimes[2];
        const obs = pAnimes[3];
        const linkW = pAnimes[4];
        const season01 = pAnimes[5];
        const season02 = pAnimes[6];
        const season03 = pAnimes[7];
        const season04 = pAnimes[8];
        const season05 = pAnimes[9];
        const season06 = pAnimes[10];
        const season07 = pAnimes[11];
        const season08 = pAnimes[12];
        const season09 = pAnimes[13];
        const season10 = pAnimes[14];

        const inewData = {
          id,
          name,
          status,
          release,
          obs,
          linkW,
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

        //console.log(inewData)

        const response = await AsyncStorage.getItem("@JhonatanrsAndroidExpoApp:Animes");
        const previousData = response ? JSON.parse(response) : [];
        const idata = [...previousData, inewData];

        await AsyncStorage.setItem("@JhonatanrsAndroidExpoApp:Animes", JSON.stringify(idata));


      }

      // alert("Importado com Sucesso.");
      ToastAndroid.show('Importado com Sucesso.', ToastAndroid.SHORT);

    } catch (error) {

      console.log(error);
      //alert("Não foi possível importar");
      ToastAndroid.show('Não foi possível importar', ToastAndroid.SHORT);

    }

  },
}
export default actions;