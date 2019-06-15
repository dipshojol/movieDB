// alert("hallow world");
window.onload = function() {
    // let myTemplateLiteral = {
    //     apiKey: `eb942738a2bb8b5943c88166d66d5f7d`,
    //     endPointAllMovie: `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&region=US&page=${pageNo}`,
    //     endPointSingleMovie: `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&region=US&page=${pageNo}`,
    //     endPointTrailer: `https://api.themoviedb.org/3/movie/${event.target.dataset.containerId}/videos?api_key=${apiKey}&language=en-US`
    // }

    const apiKey = "eb942738a2bb8b5943c88166d66d5f7d";

        

    const getAllMovieData = (endPoint)=>{
        const xhr = new XMLHttpRequest();
        // const endPoint = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&region=US&page=${pageNo}`;

        xhr.open("GET", endPoint);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                const jsonData = JSON.parse(xhr.responseText);
                document.querySelector("#movie-container").innerHTML = jsonData.results.map(formatHTML).join(``);
                movieTrailer();
                // if(){
                    moreInfoFun();
                // }
            }
        }
    
    }
    

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const dateFormatter = () => {
        let month = `${release_date.split('-')[1]}`;
        return `${months[month < 10 ? month.slice(1):month.slice(0)]}`
    }
    
    let formatHTML = (result) => {
        dateFormatter(release_date = result.release_date);
        return `
        <div class="single-container">
            <div class="backdrop-path">
            <div class="movie-img">
                <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${result.poster_path}" data-container-id="${result.id}" class="more-details" alt="">
                </div>
                <div class="movie-info">
                    <div class="movie-details">
                        <div class="title-container">
                            <h3>${result.original_title}</h3>
                            <p class="release-date">${dateFormatter()} ${result.release_date.split('-')[2]}, ${result.release_date.split('-')[0]}</p>
                        </div>
                        <div class="movie-trailer" data-container-id="${result.id}">
                            Movie Trailer
                        </div>
                        <div class="movie-overview">
                            
                            <p>Overview: ${result.overview.slice(1, 350)}</p>
                        </div>
                    </div>
                    <div class="more-details" data-container-id="${result.id}">
                        <p class="more-details-inner" data-container-id="${result.id}">More info</p>
                    </div>
                </div>
            </div>
            </div>
            
            `;
    }

    const $popupHTML = (result)=>{
        return `<span id="close-btn">x</span>
        <div class="movie-img">
        <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${result.backdrop_path}" data-container-id="${result.id}" class="more-details" alt="">
        </div>
        <div class="popup-movie-details">
            <div class="movie-details">
                <div class="title-container">
                    <h2>${result.original_title}</h2>
                    <p class="release-date">(${dateFormatter()} ${result.release_date.split('-')[2]}, ${result.release_date.split('-')[0]})</p>
                    <p>$$ ${result.budget}</p>    
                </div>

                
                
                <div class="movie-overview">
                    <p>${result.overview}</p>
                </div>
            </div>

        </div>
        `
    }

    const $popupHTMLTrailer = (result)=>{
        return `
        <div id="trailer-wrapper">
        <span id="close-btn">x</span>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${result.results[0].key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>`
    }
    const $popup = document.querySelector("#popup");

    const moreInfoFun = ()=>{
        let moreDetails = document.querySelectorAll(".more-details");

        // const apiKey = "eb942738a2bb8b5943c88166d66d5f7d";

        moreDetails.forEach(function(event) {
            // console.log(event);
            event.addEventListener("click", (event) => {
                // const $youtube = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

                // console.log(event);
                if (!isNaN(event.target.dataset.containerId)) {
                // console.log("clicked");

                    const endPointMoreInfo = `https://api.themoviedb.org/3/movie/${event.target.dataset.containerId}?api_key=${apiKey}&language=en-US`;
                    // https://api.themoviedb.org/3/movie/373571?api_key=eb942738a2bb8b5943c88166d66d5f7d&language=en-US
                    const xhrMoreInfo = new XMLHttpRequest;
    
                    xhrMoreInfo.open("GET", endPointMoreInfo);
                    xhrMoreInfo.send();
                    xhrMoreInfo.onreadystatechange = () => {
                        if (xhrMoreInfo.readyState == 4) {
                            const jsonDataMoreInfo = JSON.parse(xhrMoreInfo.responseText);
    
                            console.log(jsonDataMoreInfo);
                            $popup.classList.add("active");
                            $popup.innerHTML = $popupHTML(jsonDataMoreInfo);

                            document.querySelector("#close-btn").addEventListener("click", ()=>{
                                $popup.classList.remove("active");

                            })

                        }
                    };
                }
            })
        });
    }


    const movieTrailer = ()=>{
        let trailerContainer = document.querySelectorAll(".movie-trailer");
        // console.log(trailerContainer);

        trailerContainer.forEach(function(event) {
            // console.log(event);
            event.addEventListener("click", (event) => {
                console.log(event);
                
                if (!isNaN(event.target.dataset.containerId)) {
                // console.log("clicked");

                    const endPointMovieTrailer = `https://api.themoviedb.org/3/movie/${event.target.dataset.containerId}/videos?api_key=${apiKey}&language=en-US`;
                    // https://api.themoviedb.org/3/movie/373571?api_key=eb942738a2bb8b5943c88166d66d5f7d&language=en-US
                    // console.log(endPointMoreInfo);

                    const xhrMovieTrailer = new XMLHttpRequest;
    
                    xhrMovieTrailer.open("GET", endPointMovieTrailer);
                    xhrMovieTrailer.send();
                    xhrMovieTrailer.onreadystatechange = () => {
                        if (xhrMovieTrailer.readyState == 4) {
                            const jsonDataMovieTrailer = JSON.parse(xhrMovieTrailer.responseText);

                            const $trailerContainer = document.querySelector(".movie-trailer");

    
                            console.log(jsonDataMovieTrailer.results[0].key);
                            $popup.classList.add("active-trailer");
                            $popup.innerHTML = $popupHTMLTrailer(jsonDataMovieTrailer);

                            document.querySelector("#close-btn").addEventListener("click", ()=>{
                                $popup.classList.remove("active-trailer");

                            

                            })

                        }
                    };
                }
            })
        });
    }



        const $pagination = document.querySelector('.pagination');
        const getPageNo = sessionStorage.getItem("pageNo");
        const endPointHomePage = (pageNo)=>{
            return `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&region=US&page=${pageNo}`;
        }

        // when session storage is more then 1
        if(getPageNo > 1){
            console.log("yes");
            getAllMovieData(endPointHomePage(getPageNo));
        // user just open when no session storage found
        }else{
            sessionStorage.setItem("pageNo", 1);
            getAllMovieData(endPointHomePage(1));
        }

        $pagination.addEventListener('click', (event) => {
            const getPage = sessionStorage.getItem("pageNo");

            // if the click event is a number
            if (!isNaN(`${event.target.innerText}`)) {
                // then set session storage with the clicked page number
                sessionStorage.setItem("pageNo", `${event.target.innerText}`);
                getAllMovieData(endPointHomePage(event.target.innerText));

                // if next or previous was clicked
            } else if(event.target.innerText == "Next"){
                sessionStorage.setItem("pageNo", `${parseFloat(sessionStorage.getItem("pageNo"))+1}`);
                getAllMovieData(endPointHomePage(`${parseFloat(sessionStorage.getItem("pageNo"))}`));
            }else if(event.target.innerText == "Previous"){
                if(parseFloat(sessionStorage.getItem("pageNo")) > 1){
                    sessionStorage.setItem("pageNo", `${parseFloat(sessionStorage.getItem("pageNo"))-1}`);
                    getAllMovieData(endPointHomePage(`${parseFloat(sessionStorage.getItem("pageNo"))}`));
                }
            }

        })
};