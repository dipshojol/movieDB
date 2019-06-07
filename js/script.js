// alert("hallow world");
window.onload = function(){
    const apiKey = "eb942738a2bb8b5943c88166d66d5f7d";
    const endPointFun = (apiKey, pageNo = 1)=>{
        const pagination = document.querySelector('.pagination');
        pagination.addEventListener('click', (event)=>{
        // console.log(event.target.innerText);
        if(!isNaN(`${event.target.innerText}`)){
            console.log(`its a number: ${event.target.innerText}`);
            const pageNo = `${event.target.innerText}`;
        }else{
            console.log(`its not a number: ${event.target.innerText}`);
        }
    });
    }
    endPointFun();
    const pageNo = 1;
    const xhr = new XMLHttpRequest();
    const endPoint = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pageNo}`;
    xhr.open("GET", endPoint);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            const jsonData = JSON.parse(xhr.responseText);
            let formatHTML = (result) => {
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const dateFormatter = (release_date = result.release_date) => {
                    let month = `${release_date.split('-')[1]}`;
                    return `${months[month < 10 ? month.slice(1):month.slice(0)]}`
                }
                console.log(jsonData);
                return `
                <div class="single-container">
                    <div class="backdrop-path">
                        <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${result.poster_path}" alt="">
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
                            <div class="more-info" data-container-id="${result.id}">
                                <p class="more-info-inner" data-container-id="${result.id}">More info</p>
                            </div>
                        </div>
                    </div>
                    </div>`
                    ;
            }

            
            // const loadFirst = ()=>{
                document.querySelector("#movie-container").innerHTML = jsonData.results.map(formatHTML).join(``);
            // }
            // loadFirst().onload(()=>{

                let moreInfo = document.querySelectorAll(".more-info");
                // console.log(myDiv);

                // for (var i = 0; i < myDiv.length; i++) {
                //     console.log(myDiv[i]);

                //     //Do something
                //     // moreInfo.addEventListener("click", ()=>{

                //     // })
                // }

                moreInfo.forEach(function(event){
                    // console.log(event);
                    event.addEventListener("click", (event)=>{
                        console.log(event.target.dataset.containerId);
                    })
                });

                // myDiv.forEach(element => {
                    
                // });
                // ((result)=>{
                //     console.log(result);
                // })
                // myDiv.addEventListener("click", function(event){
                //     console.log(event);
                // })
            // })

        }
    }

};