const facts = document.querySelector('#facts');
const favFacts = document.querySelector('#fav-facts');

async function getFactFavNum(favNum) {
  const res = await axios.get(`http://numbersapi.com/${favNum}?json`);
  console.log(res.data.text);
}

getFactFavNum(2);

async function getFactNums() {
  const res = await axios.get(`http://numbersapi.com/2,5,10?json`);
  for (let fact of Object.values(res.data)) {
    let li = document.createElement("li");
    li.textContent = fact;
    facts.append(li);
  }
}

getFactNums();

async function get4FactsFavNum(favNum) {
  const facts = await Promise.all([
    axios.get(`http://numbersapi.com/${favNum}?json`), 
    axios.get(`http://numbersapi.com/${favNum}?json`), 
    axios.get(`http://numbersapi.com/${favNum}?json`), 
    axios.get(`http://numbersapi.com/${favNum}?json`)
  ])
  for (let fact of facts) {
    let li = document.createElement("li");
    li.textContent = fact.data.text;
    favFacts.append(li);
  }
}

get4FactsFavNum(2);