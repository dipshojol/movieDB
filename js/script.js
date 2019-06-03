// alert("hallow world");
(function() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=eb942738a2bb8b5943c88166d66d5f7d&language=en-US&page=1")
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            const jsonData = JSON.parse(xhr.responseText);

            console.log(jsonData.results);

            jsonData.results.forEach(result => {
                console.log(`movie title: ${result.original_title}`);
                document.querySelector("#movie-container").innerHTML += `<div class="single-container">
                <div class="backdrop-path">
                    <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${result.backdrop_path}" alt="">
                    <div class="movie-info">
                        <div class="movie-details">
                            <p>${result.original_title}</p>
                            <p class="release-date">${result.release_date}</p>
                            <p class="movie-overview">${result.overview}</p>
                        </div>
                        <div class="more-info">
                            More info
                        
                        </div>
                    </div>

                
                </div>`;
            })
        }
    }
}());

















