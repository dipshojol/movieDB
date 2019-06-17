"use strict"
// alert("hallow world");
document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "eb942738a2bb8b5943c88166d66d5f7d";
    const xhr = new XMLHttpRequest();


    const getAllMovieData = (endPoint) => {
        xhr.open("GET", endPoint);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                const jsonData = JSON.parse(xhr.responseText);

                document.querySelector("#movie-container").innerHTML = jsonData.results.map($movieHTML).join(``);
                movieTrailer();
                // if(){
                moreInfoPopUp();
                // }
            }
        }

    }



    const dateFormatter = (d) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let monthFormatter = `${d.split('-')[1]}`;
        return `${months[monthFormatter < 10 ? monthFormatter.slice(1):monthFormatter.slice(0)]}`;
    }


    const $popup = document.querySelector("#popup");

    const moreInfoPopUp = () => {
        let moreDetails = document.querySelectorAll(".more-details");

        moreDetails.forEach(function(event) {

            event.addEventListener("click", (event) => {
                // console.log(event);
                if (!isNaN(event.target.dataset.containerId)) {
                    // console.log("clicked");
                    const endPointMoreInfo = `https://api.themoviedb.org/3/movie/${event.target.dataset.containerId}?api_key=${apiKey}&language=en-US`;

                    xhr.open("GET", endPointMoreInfo);
                    xhr.send();
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState == 4) {
                            const jsonDataMoreInfo = JSON.parse(xhr.responseText);

                            console.log(jsonDataMoreInfo);
                            $popup.classList.toggle("active");
                            $popup.innerHTML = $popupHTML(jsonDataMoreInfo);

                            document.querySelector("#close-btn").addEventListener("click", () => {
                                document.querySelector("#popup > div").remove();
                                $popup.classList.remove("active");
                            })

                            window.onclick = function(event) {
                                console.log(event);
                                if (event.target != $popup) {
                                    console.log("hi");
                                    // $popup.style.display = "none";
                                    document.querySelector("#popup > div").remove();
                                    $popup.classList.remove("active");
                                }
                            }

                        }
                    };
                }
            })
        });
    }


    const movieTrailer = () => {
        let trailerContainer = document.querySelectorAll(".movie-trailer");
        // console.log(trailerContainer);

        trailerContainer.forEach(function(event) {
            // console.log(event);
            event.addEventListener("click", (event) => {
                if (!isNaN(event.target.dataset.containerId)) {
                    const endPointMovieTrailer = `https://api.themoviedb.org/3/movie/${event.target.dataset.containerId}/videos?api_key=${apiKey}&language=en-US`;

                    xhr.open("GET", endPointMovieTrailer);
                    xhr.send();
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState == 4) {
                            const jsonDataMovieTrailer = JSON.parse(xhr.responseText);

                            console.log(jsonDataMovieTrailer.results[0].key);
                            $popup.classList.toggle("active-trailer");
                            $popup.innerHTML = $popupHTMLTrailer(jsonDataMovieTrailer);

                            document.querySelector("#close-btn").addEventListener("click", () => {
                                document.querySelector("#trailer-wrapper").remove();
                                $popup.classList.remove("active-trailer");
                            })
                            // When the user clicks anywhere outside of the modal, close it
                            window.onclick = function(event) {
                                // alert("window");
                                // console.log(event);
                                if (event.target !== $popup) {
                                    // $popup.style.display = "none";
                                    document.querySelector("#trailer-wrapper").remove();
                                    $popup.classList.remove("active-trailer");
                                }
                            }
                        }
                    };
                }
            })
        });
    }


    const pagination = document.querySelector('.pagination');
    const getPageNo = sessionStorage.getItem("pageNo");
    const endPointHomePage = (pageNo) => {
        return `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&region=US&page=${pageNo}`;
    }

    // when session storage is more then 1
    if (getPageNo > 1) {
        getAllMovieData(endPointHomePage(getPageNo));
        // user just open when no session storage found
    } else {
        sessionStorage.setItem("pageNo", 1);
        getAllMovieData(endPointHomePage(1));
    }

    pagination.addEventListener('click', (event) => {
        const getPage = sessionStorage.getItem("pageNo");

        // if the click event is a number
        if (!isNaN(`${event.target.innerText}`)) {
            // then set session storage with the clicked page number
            sessionStorage.setItem("pageNo", `${event.target.innerText}`);
            getAllMovieData(endPointHomePage(event.target.innerText));
            // if next or previous was clicked
        } else if (event.target.innerText == "Next") {
            sessionStorage.setItem("pageNo", `${parseFloat(sessionStorage.getItem("pageNo"))+1}`);
            getAllMovieData(endPointHomePage(`${parseFloat(sessionStorage.getItem("pageNo"))}`));
        } else if (event.target.innerText == "Previous") {
            if (parseFloat(sessionStorage.getItem("pageNo")) > 1) {
                sessionStorage.setItem("pageNo", `${parseFloat(sessionStorage.getItem("pageNo"))-1}`);
                getAllMovieData(endPointHomePage(`${parseFloat(sessionStorage.getItem("pageNo"))}`));
            }
        }

    })


    const $movieHTML = (result) => {
        // console.log(result);
        // dateFormatter(result);
        return `
            <div class="single-container">
                <div class="backdrop-path">
                <div class="movie-img">
                    <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${result.poster_path}" data-container-id="${result.id}" class="more-details" alt="">
                    </div>
                    <div class="movie-info">
                        <div class="movie-details">
                            <div class="title-container">
                                <h2>${result.original_title}</h2>
                                <p class="release-date">${dateFormatter(result.release_date)} ${result.release_date.split('-')[2]}, ${result.release_date.split('-')[0]}</p>
                            </div>
                            <div class="movie-trailer" data-container-id="${result.id}">
                                Movie Trailer
                            </div>
                            <div class="movie-overview">
                                
                                <p><span>Overview:</span> ${result.overview}</p>
                            </div>
                        </div>
                        <div class="more-details" data-container-id="${result.id}">
                            <p class="more-details-inner" data-container-id="${result.id}">More info</p>
                        </div>
                    </div>
                </div>
                </div>`;
    }

    const $popupHTML = (result) => {
        return `<div id="popup-container">
        <span id="close-btn">x</span>
            <div class="movie-img">
            <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${result.backdrop_path}" data-container-id="${result.id}" class="more-details" alt="">
            </div>
            <div class="popup-movie-details">
                <div class="movie-details">
                    <div class="title-container">
                        <h2>${result.original_title}</h2>
                        <p class="release-date">(${dateFormatter(result.release_date)} ${result.release_date.split('-')[2]}, ${result.release_date.split('-')[0]})</p>
                        <p>$$ ${result.budget}</p>    
                    </div>
                    <div class="movie-overview">
                        <p>${result.overview}</p>
                    </div>
                </div>
                </div>
    
            </div>`;
    }

    const $popupHTMLTrailer = (result) => {
        return `
            <div id="trailer-wrapper">
            <span id="close-btn">x</span>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${result.results[0].key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>`;
    }
});

// window.addEventListener("onload", function(){


// let myTemplateLiteral = {
//     apiKey: `eb942738a2bb8b5943c88166d66d5f7d`,
//     endPointAllMovie: `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&region=US&page=${pageNo}`,
//     endPointSingleMovie: `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&region=US&page=${pageNo}`,
//     endPointTrailer: `https://api.themoviedb.org/3/movie/${event.target.dataset.containerId}/videos?api_key=${apiKey}&language=en-US`
// }


// })