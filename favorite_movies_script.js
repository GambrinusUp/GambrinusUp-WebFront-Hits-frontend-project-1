$(document).ready(function (){
    myModal = new bootstrap.Modal($("#exampleModal"));
    CheckUser();
    //LoadFavoriteMovies();
});

function CheckUser(){
    fetch("https://react-midterm.kreosoft.space/api/account/profile",
        {
            headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
        })
        .then((response) => {
            console.log(response.status);
            if(response.status === 401){
                console.log("error");
                $(".modal-body").text("Вы не авторизованы");
                myModal.show();
                setTimeout(function(){
                    window.location.href = 'authorization_page.html';
                }, 5 * 1000);
            }
            else {
                return response.json();
            }
        })
        .then((json) => {
            if(json !== undefined){
                console.log(json);
                $("#login").addClass("d-none");
                $("#registration").addClass("d-none");
                $(".profile-nickname").removeClass("d-none");
                $("#profile-logout").removeClass("d-none");
                $("#favorites").removeClass("d-none");
                $("#my-profile").removeClass("d-none");
                $("#profile-nick").text($("#profile-nick").text() + json.nickName);
                GetFavorites();
            }
        });
}

function GetFavorites(){
    console.log();
    fetch("https://react-midterm.kreosoft.space/api/favorites",
        {
            headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
        })
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            $("#favorite-movies-container").empty();
            let template = $('#favorite-movies-template');
            for(let movies of json.movies){
                console.log(movies);
                let block = template.clone();
                block.attr("id", movies.id);
                let img = $('<img />', {src : movies.poster});
                //let img = $('<img />', {src : "test.jpg"});
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
            RegisterTransition();
            DeleteFavorite();
        });
}

function DeleteFavorite(){
    $(".delete-fav").click(function (event) {
        console.log(event.target.closest('.card').id);
        fetch("https://react-midterm.kreosoft.space/api/favorites/" + event.target.closest('.card').id + "/delete",
            {
                method: "DELETE",
                headers:
                    {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
            })
            .then((response) => {
                if(response.status === 401){
                    console.log("error");
                    $(".modal-body").text("Вы не авторизованы");
                    myModal.show();
                    setTimeout(function(){
                        window.location.href = 'authorization_page.html';
                    }, 5 * 1000);
                }
                else {
                    console.log("success");
                    $(".modal-body").text("Фильм успешно удален из избранных");
                    myModal.show();
                    location.reload();
                }
            });
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
    numberOfRating = numberOfRating.toFixed(1);
    return numberOfRating;
}

function RegisterTransition(){
    $('.card').click(function(event){
        localStorage.setItem('currentMovie', event.target.closest('.card').id);
        console.log(localStorage.getItem('currentMovie'));
    });
    $(".name").click(function (event){
        window.location.href = "movies_page.html";
    })
}

var myModal;