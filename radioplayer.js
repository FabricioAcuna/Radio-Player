// Steg 1. Gör en fetch till 'https://api.sr.se/api/v2/channels/?format=json'
const channelElement = document.getElementById("channels");

async function getApi() {
  const response = await fetch(
    "https://api.sr.se/api/v2/channels?format=json&size=100"
  );
  const data = await response.json();

  // Steg 2. loopa med tex forEach över data.channels - ta ut data och visa på html-sidan.
  const channels = data.channels;
  channels.forEach((api) => {
    const stationDiv = document.createElement("div");
    stationDiv.classList.add("station");

    const nameAudioContainer = document.createElement("div");
    nameAudioContainer.classList.add("audioContainer");

    // namn av radios
    const channelName = document.createElement("h1");
    channelName.classList.add("stationName");
    channelName.textContent = api.name;

    //bild av radios
    const image = document.createElement("img");
    image.classList.add("stationImg");
    image.src = api.image;
    image.alt = api.name;

    //background för varje station
    const channelColor = document.createElement("div");
    channelColor.classList.add("stationColor");
    stationDiv.style.backgroundColor = "#" + api.color;

    // Steg 3. ta ut liveaudio.url från varje kanal och lägg i en audio tagg.
    // <audio controls>
    //   <source src="" type="audio/mpeg" />
    // </audio>

    const audio = document.createElement("audio");
    audio.classList.add("stationAudio");
    audio.setAttribute("controls", true);

    const source = document.createElement("source");
    source.setAttribute("src", api.liveaudio.url);
    source.setAttribute("type", "audio/mpeg");

    //Append för container station och audio/name
    stationDiv.appendChild(image);
    stationDiv.appendChild(channelColor);
    nameAudioContainer.appendChild(channelName);
    nameAudioContainer.appendChild(audio);
    stationDiv.appendChild(nameAudioContainer);
    audio.appendChild(source);
    channelElement.appendChild(stationDiv);
  });
  console.log(channels);
}
getApi();
