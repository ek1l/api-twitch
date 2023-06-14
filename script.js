const clientId = "gp762nuuoqcoxypju8c569th9wz7q5";
const accessToken = "06qqmy8ebymbu3vjqswvd48dbfhsy6";
const userId = "137626307";
let containerNavCanais = document.querySelector(".container-canais");

const getChannelsLive = async () => {
  try {
    const url = `https://api.twitch.tv/helix/streams/followed?user_id=${userId}`;
    const fetchAPI = await fetch(url, {
      method: "GET",
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { data } = await fetchAPI.json();
    renderHTML(data);
  } catch (error) {
    console.log(error, `Algum erro ocorreu durante a operação`);
  }
};

getChannelsLive();

setInterval(getChannelsLive, 5000);

function renderHTML(canais) {
  containerNavCanais.innerHTML = "";
  const canaisLimitados = canais.slice(0, 11);
  canaisLimitados.forEach((canal) => {
    const { game_name, thumbnail_url, user_name, viewer_count } = canal;

    const canalCard = document.createElement("div");
    canalCard.classList.add("card-canal");

    const imgDiv = document.createElement("div");
    imgDiv.classList.add("imgDiv");

    let novaURL = thumbnail_url
      .replace("width", "100")
      .replace("height", "90")
      .replace(/{/g, "")
      .replace(/}/g, "");

    const imgCanal = document.createElement("img");
    imgCanal.src = novaURL;
    imgCanal.alt = "canal thumbnail";

    const divNomeJogo = document.createElement("div");
    divNomeJogo.classList.add("nomeJogo");

    const canalNome = document.createElement("h1");
    canalNome.textContent = user_name;

    const canalJogo = document.createElement("p");
    canalJogo.textContent = game_name;

    const canalViwers = document.createElement("span");
    canalViwers.classList.add("span-viwer");
    canalViwers.textContent = `🔴 ${viewer_count}`;

    imgDiv.appendChild(imgCanal);
    divNomeJogo.appendChild(canalNome);
    divNomeJogo.appendChild(canalJogo);

    canalCard.appendChild(imgDiv);
    canalCard.appendChild(divNomeJogo);
    canalCard.appendChild(canalViwers);

    containerNavCanais.appendChild(canalCard);
  });
}
