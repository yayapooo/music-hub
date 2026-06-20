const input = document.getElementById("searchInput");

input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        searchMusic();
    }
});

async function searchMusic(){

    const keyword = input.value;

    if(keyword === ""){
        alert("Masukkan kata pencarian!");
        return;
    }

    document.getElementById("loading").style.display = "block";

    const url =
    `https://itunes.apple.com/search?term=${keyword}&entity=song&limit=20`;

    const response = await fetch(url);

    const data = await response.json();

    document.getElementById("loading").style.display = "none";

    let output = "";

    data.results.forEach(song => {

        const year =
        new Date(song.releaseDate).getFullYear();

        output += `
        <div class="card">

            <img src="${song.artworkUrl100.replace(
                "100x100",
                "500x500"
            )}">

            <h3>${song.trackName}</h3>

            <p>🎤 ${song.artistName}</p>

            <p>💿 ${song.collectionName}</p>

            <p>📅 ${year}</p>

            <p>🎵 ${song.primaryGenreName}</p>

            <audio controls>
                <source src="${song.previewUrl}">
            </audio>

        </div>
        `;
    });

    if(data.results.length === 0){
        output = "<h2>Tidak ditemukan.</h2>";
    }

    document.getElementById("musicList").innerHTML = output;
}