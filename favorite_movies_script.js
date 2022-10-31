$(document).ready(function (){
    LoadFavoriteMovies();
});

//тестовая функция:
function LoadFavoriteMovies(){ //catch ошибку авторизации для пользователя
    let token;
    fetch("https://react-midterm.kreosoft.space/api/account/login",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                "username": "string",
                "password": "string"
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            token = json.token;
            GetFavorites(json.token);
        });
}

function GetFavorites(token){
    console.log(token);
    fetch("https://react-midterm.kreosoft.space/api/favorites",
        {
            headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
        })
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            //console.log(json);

            $("#favorite-movies-container").empty();
            let template = $('#favorite-movies-template');
            //console.log(json.movies[0]);
            for(let movies of json.movies){

                console.log(movies);

                let block = template.clone();
                block.attr("id", movies.id);
                //let img = $('<img />', {src : movies.poster + '.png'});
                let img = $('<img />', {src : "test.jpg"});
                img.attr("alt", "Responsive image");
                img.attr("class", "img-fluid");
                img.addClass("poster");
                block.find(".poster").append(img);
                block.find(".name").text(movies.name);
                block.find(".year").text(movies.year);
                let genres = GetListOfGenres(movies.genres);
                block.find(".fav-genres").text(movies.country + " ● " + genres);
                let rating = GetRatingOfMovies(movies.reviews);
                block.find(".fav-score").text("Средняя оценка - " + rating);
                block.removeClass("d-none");
                $("#favorite-movies-container").append(block);
            }
        });
}

function GetListOfGenres(json){
    let genres = '';
    for(let i = 0; i < json.length; i++){
        genres += json[i].name;
        if(i !== json.length - 1)
            genres += ", ";
    }
    return genres;
}

function GetRatingOfMovies(json){
    var numberOfRating = 0;
    if(json.length !== 0) {
        for (let i = 0; i < json.length; i++) {
            numberOfRating += json[i].rating;
        }
        numberOfRating = numberOfRating / json.length;
    }
    return numberOfRating;
}