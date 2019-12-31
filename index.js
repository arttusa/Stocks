const express = require('express')
const app = express()
const cors = require('cors')
const fetch = require("node-fetch")
const bodyParser = require('body-parser')
const jsonfile = require('jsonfile')
const schedule = require('node-schedule')


// Tarvittavat tiedostot
let database = './db.json';
let db = require('./db.json');

// Lista pörssikursseista, jotka löytyvät tietokannasta
let stockList = db;

                    
// Seuraavat tarvitaan, jotta POST toimii
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('build'))

app.use(cors())
// Backend works with 'npm run watch'



/** Metodi, jossa etsitään viimeisen kolmen kuukauden päivät ja palautetaan ne taulukossa, jossa taulukon yksilö on muotoa
 *      
 */      
const findDaysOfLastThreeMonths = () => {
  
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
  var yyyy = today.getFullYear();
  dd = String(Number(dd) + 1)
  today = yyyy + '-' + mm + '-' + dd;

  //get dates of last month
  var now = new Date(yyyy, mm -1 , dd);

  var daysOfLastMonth = [];
  for (var d = new Date(yyyy, mm - 4, dd); d <= now; d.setDate(d.getDate() + 1)) {
      daysOfLastMonth.push(new Date(d).toISOString().slice(0,10));
  }
  return daysOfLastMonth;

}





/** Metodi, jossa url -parametria käyttämällä haetaan Alpha Vantage API:sta kyseisellä sivulla olevat tiedot. 
 *  Linkissä esimerkkisivu tiedoista https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo
 *  Metodi palauttaa tiedot json muodossa
 * 
 */
const getData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
    //console.log(json);
  } catch (error) {
    console.log(error);
  }
                             
} 

/** Metodi, jolla voidaan pysäyttää funktio odottamaan.
 *  Parametri ms on aika, joka halutaan odottaa millisekunteina annettuna.
 *  
 */
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** Metodissa haetaan kaikkien listan osakkeiden avauslukemat viimeiseltä kolmelta kuukaudelta ja asetetaan ne loppujen lopuksi db.json
 *  tiedostoon.
 *   
 *  
 */
const getAllData = async (list) => {
  let refreshedStocklist = []
  // Sleep in loop
  for (let i = 0; i < list.length; i++) {
    // Nukutaan minuutti, koska API-kutsuja on vain 5 per minuutti
    if (i % 5 === 0 && i !== 0) {
      await sleep(60000);                 
    }
    let stock = list[i]['symbol'];
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&interval=5min&apikey=${process.env.API_KEY}`;
    let dataFromUrl = await getData(url);
    let lastMonth = [];
    for (var x of findDaysOfLastThreeMonths()) {
      try {
        let stockOpenValue = dataFromUrl['Time Series (Daily)'][x]['1. open'];
        stockOpenValue = (Number(stockOpenValue)).toFixed(2)
        let singleObject = {
          date: x,
          value: stockOpenValue
        }
        lastMonth.push(singleObject);
      } catch (error) {
      //tässä ongelmaksi muodostuu vain viikonlopun päivät, joten voidaan sivuuttaa error
      continue;
      }                                      
    }
    const stockToAdd = {
      id: list[i].id,
      name: list[i].name,
      symbol: list[i].symbol,
      values: JSON.stringify(lastMonth)
    }
    refreshedStocklist.push(stockToAdd);
    console.log(refreshedStocklist);
    await sleep(1000);
  }
  // Lopuksi päivitetään db.json -tiedosto tuoreella datalla
  jsonfile.writeFile(database, refreshedStocklist)
  .then(res => {
    console.log('Write completed')
  })
  .catch(error => console.error(error))

}

/** Haetaan uudet osaketiedot API:sta, kun Helsingin pörssi on avannut eli klo 08.05 GMT -aikaa eli 10.05 suomen aikaa ja klo 17.05 jotta saadaan muutamalle jenkkiosakkeelle päivitetyt tiedot
 * 
 */ 
schedule.scheduleJob('5 8 * * *', () => {
  getAllData(stockList)
})
schedule.scheduleJob('5 15 * * *', () => {
  getAllData(stockList)
})



/** Luodaan jokaiselle stockList taulukon yksilölle oma API -sivu perustuen yksilön ID -yksikköön
 *  
 */ 
app.get('/api/:id', (req, res) => {
  /*
  const stock = stockList.find(s => s.id === parseInt(req.params.id));
  res.json(allData[req.params.id-1]);
  */
 res.json(stockList[req.params.id - 1])
     
})

/** Luodaan API -sivu, missä on listattuna stockList taulukon yksilöt
 * 
 */
app.get('/api', (req, res) => {
  jsonfile.readFile(database)
  .then(obj => res.json(obj))
  .catch(error => console.error(error))
})
                        

/** Käsitellään osakekurssin lisääminen stockList taulukkoon
 *  Tällä hetkellä piilotettuna, koska sitä ei käytetä.
 */ 

/*
app.post('/api', (req, res) => {
  const stock = {
    id: stockList.length + 1,
    name: req.body.name,
    symbol: req.body.symbol,
    values: []
  };        
  // Tarkistetaan duplikaatit ennen lisäämistä
  if (stockList.find(item => item.symbol === stock.symbol) !== undefined) {
    res.status(404).json({ error: "DUPLICATE" })
    return;
  }
  jsonfile.readFile(database)
    .then(obj => {
      obj.push(stock);                                                     
      jsonfile.writeFileSync(database, obj, { spaces: 2 })
    })
    .catch(error => console.error(error))
    res.send(stock);
})
*/

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
