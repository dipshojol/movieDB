// alert("hallow world");
(function() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=eb942738a2bb8b5943c88166d66d5f7d&language=en-US&page=1")
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            const jsonData = JSON.parse(xhr.responseText);

            jsonData.results.forEach(result => {
                console.log(result.original_title);
            });
        }
    }

    // const mainDiv = document.getElementById('main-div');

    const $mainDiv = `
    <h2>Now Showing</h2>
    <div>

    </div>
        
    `;

    // document.querySelector("#main-page").innerHTML = $mainDiv;
}());

















