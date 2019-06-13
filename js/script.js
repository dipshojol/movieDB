// alert("hallow world");
window.onload = function() {

        

    const innitialAPIcall = (pageNo)=>{
        const apiKey = "eb942738a2bb8b5943c88166d66d5f7d";
        // let pageNo = 1;
        const xhr = new XMLHttpRequest();
        const endPoint = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&region=US&page=${pageNo}`;

        xhr.open("GET", endPoint);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                const jsonData = JSON.parse(xhr.responseText);
                document.querySelector("#movie-container").innerHTML = jsonData.results.map(formatHTML).join(``);
                moreInfoFun();
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
                        <div class="movie-overview">
                            <p>${result.overview.slice(1, 350)}</p>
                        </div>
                    </div>
                    <div class="more-details" data-container-id="${result.id}">
                        <p class="more-details-inner" data-container-id="${result.id}">More info</p>
                    </div>
                </div>
            </div>
            </div>`;
    }


    const $popupHTML = (result)=>{
        return `<span id="close-btn">x</span>
        <div class="movie-img">
        <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${result.backdrop_path}" data-container-id="${result.id}" class="more-details" alt="">
        </div>
        <div class="popup-movie-details">
            <div class="movie-info">
            <div class="movie-details">
                <div class="title-container">
                    <h3>${result.original_title}</h3>
                    <p class="release-date">${dateFormatter()} ${result.release_date.split('-')[2]}, ${result.release_date.split('-')[0]}</p>
                </div>
                <div class="movie-overview">
                    <p>${result.overview.slice(1, 350)}</p>
                </div>
            </div>
            <div class="more-details" data-container-id="${result.id}">
                <p class="more-details-inner" data-container-id="${result.id}">More info</p>
            </div>
        </div>
        </div>
        `
    }

    const moreInfoFun = ()=>{
        let moreDetails = document.querySelectorAll(".more-details");
        const closeMe = document.querySelector("#popup-wrapper");
        const popupWrapper = document.querySelector("#popup-wrapper");

        const apiKey = "eb942738a2bb8b5943c88166d66d5f7d";

        moreDetails.forEach(function(event) {
            // console.log(event);
            event.addEventListener("click", (event) => {
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
                            const $popup = document.querySelector("#popup");
    
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


        const $pagination = document.querySelector('.pagination');
        const getPageNo = sessionStorage.getItem("pageNo");

        // when session storage is more then 1
        if(getPageNo > 1){
            console.log("yes");
            innitialAPIcall(getPageNo);
        // user just open when no session storage found
        }else{
            sessionStorage.setItem("pageNo", 1);
            innitialAPIcall(1);
        }

        $pagination.addEventListener('click', (event) => {
            const getPage = sessionStorage.getItem("pageNo");

            // if the click event is a number
            if (!isNaN(`${event.target.innerText}`)) {
                // then set session storage with the clicked page number
                sessionStorage.setItem("pageNo", `${event.target.innerText}`);
                innitialAPIcall(event.target.innerText);

                // if next or previous was clicked
            } else if(event.target.innerText == "Next"){
                sessionStorage.setItem("pageNo", `${parseFloat(sessionStorage.getItem("pageNo"))+1}`);
                innitialAPIcall(`${parseFloat(sessionStorage.getItem("pageNo"))}`);
            }else if(event.target.innerText == "Previous"){
                if(parseFloat(sessionStorage.getItem("pageNo")) > 1){
                    sessionStorage.setItem("pageNo", `${parseFloat(sessionStorage.getItem("pageNo"))-1}`);
                    innitialAPIcall(`${parseFloat(sessionStorage.getItem("pageNo"))}`);

                }
                
            }

        })
};