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

    const runTimeFormatter = (t)=>{
        let hours = Math.floor(t/60);
        let mins = t%60;
        // let minutes;
        // if(mins < 10){
        //     minutes = '0'+mins;
        //     console.log(minutes);
        // }else{
        //     minutes = mins;
        // }
        return hours + 'h ' + mins + 'mins';
    }

    // console.log(runTimeFormatter(128));
    const $popup = document.querySelector("#popup");

    const moreInfoPopUp = () => {
        let moreDetails = document.querySelectorAll(".more-details");

        moreDetails.forEach(function(event, i) {

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
                            // document.getElementById("myLI").parentElement.nodeName;
                            document.onclick = (event)=> {
                                console.log(event.target.offsetParent);
                                if (event.target.offsetParent != $popup) {
                                    console.log(event.target);
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

                            // document.querySelector("#close-btn").addEventListener("click", () => {
                            //     document.querySelector("#trailer-wrapper").remove();
                            //     $popup.classList.remove("active-trailer");
                            // })
                            // When the user clicks anywhere outside of the modal, close it
                            window.onclick = function(event) {
                                // alert("window");
                                // console.log(event.target.offsetParent);
                                if (event.target != document.querySelector('iframe')) {
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

    const budgetFormatter = (n)=>{
        // console.log(n);
        let num = Math.abs(Number(n));
        // console.log(num);
        // Nine Zeroes for Billions
        return num >= 1.0e+9
        ? (num / 1.0e+9).toFixed(0) + "B"
        // Six Zeroes for Millions 
        : num >= 1.0e+6

        ? (num / 1.0e+6).toFixed(0) + "M"
        // Three Zeroes for Thousands
        : num >= 1.0e+3

        ? num / (1.0e+3).toFixed(0) + "K"

        : num;
    }
        // console.log((budgetFormatter(12144433)));


    const $movieHTML = (result) => {
        // console.log((result.overview).split(" ").splice(0, 45).join(" "));
        let movieOverview;
        if((result.overview).split(" ").length < 44){
            movieOverview = result.overview;
        }else{
            movieOverview = (result.overview).split(" ").splice(0, 50).join(" ")+ "...";
        }
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
                                Trailer
                            </div>
                            <div class="movie-overview">
                                
                                <p><span>Overview:</span> ${movieOverview}</p>
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
        
        let arrayFormatter = (r)=>{
            // console.log(result.genres);
            return (r.map((r)=>{return r.name;}))
        }   
        console.log();
        return `<div id="popup-container">
        <span id="close-btn">x</span>
            <div class="movie-img">
            <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${result.backdrop_path}" data-container-id="${result.id}" class="more-details" alt="">
            </div>
            <div class="popup-movie-details">
                <div class="movie-details">
                    <div class="title-container">
                        <h2>${result.original_title}</h2>
                        <p class="release-date">${dateFormatter(result.release_date)} ${result.release_date.split('-')[2]}, ${result.release_date.split('-')[0]}</p>
                    </div>
                    <div class="info-table">
                        <div class="review">
                            <img src="./img/star.png" alt="">
                            <span>${result.vote_average}</span>
                            <span>/10</span>
                            <span>(${result.vote_count})</span>
                        </div>
                        <div class="genres">${arrayFormatter(result.genres).join(', ')}</div>
                        <div>Budget</br>$${budgetFormatter(result.budget)}</div>                            
                        <div class="revenue">Revenue</br>$${budgetFormatter(result.revenue)}</div>
                        <div class="runTime">Run Time: ${runTimeFormatter(result.runtime)}</div>
                        <div class="languages">Languages: ${arrayFormatter(result.spoken_languages).join(", ")}</div>
                        <div class="production"><span>PRODUCTION</span></br>${arrayFormatter(result.production_companies).join("</br>")}</div>
                        <div class="imdb"><a href="https://www.imdb.com/title/${result.imdb_id}/" target="_blank">Visit IMDB</a></div>

                        </div>
                    <div class="movie-overview">
                        <h3>OVERVIEW</h3>
                        <p>${result.overview}</p>
                    </div>
                </div>
                </div>
            </div>`;
    }

    const $popupHTMLTrailer = (result) => {
        return `
            <div id="trailer-wrapper">
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