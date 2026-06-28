const input = document.getElementById("searchInput");

input.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        searchMusic();
    }

});

window.onload = function(){
    loadRecommendation();
};

document.addEventListener("click", function(e){

    if(e.target.classList.contains("artist-card")){

        input.value = e.target.innerText;

        searchMusic();
    }

});

async function loadRecommendation(){

    const artists = [
        "Taylor Swift",
        "Ed Sheeran",
        "Coldplay",
        "Bruno Mars",
        "Adele",
        "Ariana Grande"
    ];

    let output = "";

    for(let artist of artists){

        const response = await fetch(
            `https://itunes.apple.com/search?term=${artist}&entity=song&limit=1`
        );

        const data = await response.json();

        const song = data.results[0];

        output += `
        <div class="card">

            <img src="${song.artworkUrl100.replace(
                "100x100",
                "500x500"
            )}">

            <h3>${song.trackName}</h3>

            <p>🎤 ${song.artistName}</p>

            <p>💿 ${song.collectionName}</p>

            <p>🎵 ${song.primaryGenreName}</p>

            <audio controls>
                <source src="${song.previewUrl}">
            </audio>

        </div>
        `;
    }

    document.getElementById(
        "recommendList"
    ).innerHTML = output;
}

async function searchMusic(){

    const keyword = input.value.trim();

    if(keyword === ""){
        return;
    }

    document.getElementById(
        "loading"
    ).style.display = "block";

    document.getElementById(
        "homeSection"
    ).style.display = "none";

    const response = await fetch(
        `https://itunes.apple.com/search?term=${keyword}&entity=song&limit=20`
    );

    const data = await response.json();

    document.getElementById(
        "loading"
    ).style.display = "none";

    document.getElementById(
        "resultTitle"
    ).style.display = "block";

    let output = "";

    data.results.forEach(song => {

        const year =
        new Date(song.releaseDate)
        .getFullYear();

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

        output = `
        <h2>Song not found.</h2>
        `;
    }

    document.getElementById(
        "musicList"
    ).innerHTML = output;
}

function goHome(){

    document.getElementById(
        "homeSection"
    ).style.display = "block";

    document.getElementById(
        "musicList"
    ).innerHTML = "";

    document.getElementById(
        "resultTitle"
    ).style.display = "none";

    input.value = "";
}