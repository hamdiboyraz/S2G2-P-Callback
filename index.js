const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const worldCup2014 = fifaData.filter(
  (item) => item.Year === 2014 && item.Stage === "Final"
);

console.log("Home Team Name: ", worldCup2014[0]["Home Team Name"]);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
console.log("Away Team Name: ", worldCup2014[0]["Away Team Name"]);

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
console.log("Home Team Goals: ", worldCup2014[0]["Home Team Goals"]);

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
console.log("Away Team Goals: ", worldCup2014[0]["Away Team Goals"]);

//(e) 2014 Dünya kupası finali kazananı*/
const winner2014 =
  worldCup2014[0]["Home Team Goals"] > worldCup2014[0]["Away Team Goals"]
    ? worldCup2014[0]["Home Team Name"]
    : worldCup2014[0]["Away Team Name"];

console.log("Winner: ", winner2014);
/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(data) {
  const finals = data.filter((item) => item.Stage === "Final");
  return finals;
}

// console.log(Finaller(fifaData));

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(data, cbFinals) {
  const finals = cbFinals(data);
  const finalYears = finals.map((item) => item.Year);
  return finalYears;
}

// console.log(Yillar(fifaData, Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(data, cbFinals) {
  const finals = cbFinals(data);
  const winners = finals.map((item) => {
    if (item["Home Team Goals"] > item["Away Team Goals"]) {
      return item["Home Team Name"];
    } else if (item["Home Team Goals"] < item["Away Team Goals"]) {
      return item["Away Team Name"];
    } else {
      return item["Win conditions"].split(" ")[0];
    }
  });
  return winners;
}

// console.log(Kazananlar(fifaData, Finaller));

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(data, cbFinals, cbYears, cbWinners) {
  const finalYears = cbYears(data, cbFinals);
  const winners = cbWinners(data, cbFinals);

  const winnersByYear = finalYears.map((item, index) => {
    return `${item} yılında, ${winners[index]} dünya kupasını kazandı!`;
  });

  return winnersByYear;
}

// console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(cbFinals) {
  const totalGoals = cbFinals.reduce((acc, item) => {
    return acc + item["Home Team Goals"] + item["Away Team Goals"];
  }, 0);

  const averageGoals = (totalGoals / cbFinals.length).toFixed(2);

  return averageGoals;
}

// console.log(OrtalamaGolSayisi(Finaller(fifaData)));
/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(data, teamInitials) {
  const finals = data.filter((item) => item.Stage === "Final");
  const winners = finals.map((item) => {
    if (item["Home Team Goals"] > item["Away Team Goals"]) {
      return item["Home Team Initials"];
    } else if (item["Home Team Goals"] < item["Away Team Goals"]) {
      return item["Away Team Initials"];
    } else {
      return item["Win conditions"].split(" ")[0] === item["Home Team Name"]
        ? item["Home Team Initials"]
        : item["Away Team Initials"];
    }
  });

  const totalWinByTeam = winners.reduce((acc, item) => {
    if (item === teamInitials.toUpperCase()) {
      acc++;
    }
    return acc;
  }, 0);

  return totalWinByTeam;
}

// console.log(UlkelerinKazanmaSayilari(fifaData, "ITA"));
// console.log(UlkelerinKazanmaSayilari(fifaData, "GER"));
// console.log(UlkelerinKazanmaSayilari(fifaData, "BRA"));
// console.log(UlkelerinKazanmaSayilari(fifaData, "FRG"));

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(data) {
  const finals = data.filter((item) => item.Stage === "Final");
  const goals = finals.map((item) => {
    return item["Home Team Goals"] > item["Away Team Goals"]
      ? item["Home Team Goals"]
      : item["Away Team Goals"];
  });
  const maxGoals = Math.max(...goals);
  const maxGoalsIndex = goals.indexOf(maxGoals);
  const maxGoalsTeam = finals[maxGoalsIndex]["Home Team Name"];
  return maxGoalsTeam;
}

// console.log(EnCokGolAtan(fifaData));

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(data) {
  const finals = data.filter((item) => item.Stage === "Final");
  const goals = finals.map((item) => {
    return item["Home Team Goals"] > item["Away Team Goals"]
      ? item["Home Team Goals"]
      : item["Away Team Goals"];
  });
  const maxGoals = Math.max(...goals);
  const maxGoalsIndex = goals.indexOf(maxGoals);
  const maxGoalsTeamsOpponent = finals[maxGoalsIndex]["Away Team Name"];
  return maxGoalsTeamsOpponent;
}

// console.log(EnKotuDefans(fifaData));

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};
