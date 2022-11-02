$(document).ready(function (){          //УДАЛИТЬ ВЫВОД СООБЩЕНИЯ ПРИ НЕАВТОРИЗАЦИИ
    myModal = new bootstrap.Modal($("#exampleModal"));
    CheckUser();
    /*LoadMovieDetails();
    CheckForFavoriteMovie();
    //EditReview();*/
});

function EditReview(){
    let block = $("#" + userReviewId);
    $(".edit").click(function (event) {
        console.log("Event");
        console.log(block.find(".reviewText").text());
        block.find(".reviewText").empty();
        block.find(".reviewText").append($("#edit-template"));
        block.find("#edit-template").removeClass("d-none");
        block.find(".edit").addClass("d-none");
        block.find(".save").removeClass("d-none");
        console.log(Number(userRating));
        block.find("#rating2").val(Number(userRating));
        block.find("#exampleFormControlTextarea2").val(userText);
    });
    $(".save").click(function (event) {
        console.log("Save");
        let newRating, newText, newIsAnonymous;
        newText = block.find("#exampleFormControlTextarea2").val();
        newRating = block.find("#rating2").val();
        if(block.find("#exampleFormControlTextarea2").is(":checked")) {
            newIsAnonymous = true;
        } else {
            newIsAnonymous = false;
        }
        console.log(newText, newRating, newIsAnonymous);
        block.find(".reviewText").empty();
        fetch("https://react-midterm.kreosoft.space/api/movie/" + movieId + "/review/" + userReviewId + "/edit",
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                method: "PUT",
                body: JSON.stringify({
                    "reviewText": newText,
                    "rating": newRating,
                    "isAnonymous": newIsAnonymous
                })
            })
            .then((response) => {
                if(response.status === 401){
                    console.log("error");
                    $(".modal-body").text("Вы не авторизованы");
                    myModal.show();
                }
                else {
                    console.log("success");
                    $(".modal-body").text("Отзыв успешно отредактирован");
                    myModal.show();
                    location.reload();
                }
                return response.json();
            });
    });
}

function DeleteReview(){
    $(".delete").click(function (event) {
        fetch("https://react-midterm.kreosoft.space/api/movie/" + movieId + "/review/" + userReviewId + "/delete",
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                method: "DELETE"
            })
            .then((response) => {
                if(response.status === 401){
                    console.log("error");
                    $(".modal-body").text("Вы не авторизованы");
                    myModal.show();
                }
                else {
                    console.log("success");
                    $(".modal-body").text("Отзыв успешно удален");
                    myModal.show();
                    location.reload();
                }
                return response.json();
            });
        console.log("delete");
    });
}

function AddReview(){
    $("#send").click(function (event) {
        if($("#exampleFormControlTextarea1").val() === '')
        {
            console.log("error");
            $(".modal-body").text("Пустое поле отзыва");
            myModal.show();
        }
        else{
            let text, rating, isAnonymous;
            text = $("#exampleFormControlTextarea1").val();
            rating = $("#rating").val();
            if($("#flexCheckDefault").is(":checked")) {
                isAnonymous = true;
            } else {
                isAnonymous = false;
            }
            fetch("https://react-midterm.kreosoft.space/api/movie/" + movieId + "/review/add",
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    method: "POST",
                    body: JSON.stringify({
                        "reviewText": text,
                        "rating": rating,
                        "isAnonymous": isAnonymous
                    })
                })
                .then((response) => {       /*ДОБАВИТЬ ВРЕМЯ ДЛЯ ОБНОВЛЕНИЯ*/
                    if(response.status === 401){
                        console.log("error");
                        $(".modal-body").text("Вы не авторизованы");
                        myModal.show();
                    }
                    else {
                        console.log("success");
                        $(".modal-body").text("Отзыв успешно добавлен");
                        myModal.show();
                        setTimeout(function(){
                            location.reload();
                        }, 1 * 1000);
                        //location.reload();
                    }
                    return response.json();
                });
        }
    })
}

function LoadMovieDetails(){
    fetch("https://react-midterm.kreosoft.space/api/movies/details/" + localStorage.getItem('currentMovie'))
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(json);
            movieId = json.id;
            let img = $('<img />', {src : json.poster});
            img.attr("alt", "Responsive image");
            img.attr("class", "img-fluid");
            $(".poster").append(img);
            $(".movie-name").text(json.name);
            $(".description").text(json.description);
            $(".years").text(json.year);
            $(".time").text(json.time + " мин");
            $(".tagline").text("«" + json.tagline + "»");
            $(".director").text(json.director);
            $(".budget").text("$" + json.budget); //https://www.cyberforum.ru/javascript-beginners/thread2930952.html
            $(".fees").text("$" + json.fees);
            $(".ageLimit").text(json.ageLimit + "+");
            $(".country").text(json.country);
            let genres = GetListOfGenres(json.genres);
            $(".genre").text(genres);
            SetReviews(json.reviews);
            CheckForFavoriteMovie();
            SetAddFavorite();
            AddReview();
            EditReview();
            DeleteReview();
            $("#profile-logout").click(function (){ LogOut() });
        });
}

function SetAddFavorite() {
    $("#add-fav").click(function (event){
        fetch("https://react-midterm.kreosoft.space/api/favorites/" + movieId + "/add",
            {
                method: "POST",
                headers:
                    {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
            })
            .then((response) => {
                console.log(response.status);
                if(response.status === 400){
                    console.log("error");
                    $(".modal-body").text("Фильм уже добавлен");
                    myModal.show();
                }
                else {
                    if(response.status === 401){
                        console.log("error");
                        $(".modal-body").text("Вы не авторизованы");
                        myModal.show();
                    }
                    else {
                        console.log("success");
                        $("#add-fav").addClass("d-none");
                        $(".modal-body").text("Фильм успешно добавлен");
                        myModal.show();
                    }
                }
            });
    })
}

function SetReviews(json){
    console.log(json);
    $(".reviews-container").empty();
    let template = $('#review-block');
    for(let review of json){
        if(review.author !== null) {
            let block = template.clone();
            block.attr("id", review.id);
            if (!review.isAnonymous) {
                if (review.author.avatar !== "" && review.author.avatar !== null) {
                    let img = $('<img />', {src: review.author.avatar});
                    img.attr("alt", "Responsive image");
                    img.attr("class", "rounded-circle review-avatar");
                    block.find(".avatar-nickname").append(img);
                } else{
                    let img = $('<img />', {src: 'profile_avatar.png'});
                    img.attr("alt", "Responsive image");
                    img.attr("class", "rounded-circle review-avatar");
                    block.find(".avatar-nickname").append(img);
                    console.log("no avatar");
                }
                block.find(".avatar-nickname").append(review.author.nickName);
            } else {
                console.log("anonymous avatar");
                let img = $('<img />', {src: 'profile_avatar.png'});
                img.attr("alt", "Responsive image");
                img.attr("class", "rounded-circle review-avatar");
                block.find(".avatar-nickname").append(img);
                block.find(".avatar-nickname").append("Анонимный пользователь");
            }
            block.find(".score").text(review.rating);
            block.find(".date").text("Дата отзыва:" + parsingJsonDate(review.createDateTime)); //распарсить дату
            block.find(".reviewText").text(review.reviewText);
            if (review.rating > 5) {
                block.addClass("border-success");
                block.find(".score").addClass("bg-success"); //card-body text-success
                block.find(".card-body").addClass("text-success");
            } else {
                block.addClass("border-danger");
                block.find(".score").addClass("bg-danger");
                block.find(".card-body").addClass("text-danger");
            }
            console.log(userId);
            if (review.author.userId === userId) {
                userReviewId = review.id;
                userRating = review.rating;
                userText = review.reviewText;
                block.find(".card-footer").removeClass("d-none");
                $("#set-review").addClass("d-none");
            }
            block.removeClass("d-none");
            $(".reviews-container").append(block);
        }
    }
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
                console.log("unauthorized");
                //$(".modal-body").text("Вы не авторизованы");
                //myModal.show();
            }
            else {
                return response.json();
            }
        })
        .then((json) => {
            if(json !== undefined){
                userId = json.id;
                console.log(json);
                $("#login").addClass("d-none");
                $("#registration").addClass("d-none");
                $(".profile-nickname").removeClass("d-none");
                $("#profile-logout").removeClass("d-none");
                $("#favorites").removeClass("d-none");
                $("#my-profile").removeClass("d-none");
                $("#add-fav").removeClass("d-none");
                $("#profile-nick").text($("#profile-nick").text() + json.nickName);
                $("#set-review").removeClass("d-none");
            }
            LoadMovieDetails();
        });
}

function CheckForFavoriteMovie(){
    fetch("https://react-midterm.kreosoft.space/api/favorites",
        {
            headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
        })
        .then((response) => {
            if(response.status !== 401)
                return response.json();
        })
        .then((json) => {
            if(json !== undefined) {
                console.log(json);
                if (json.length !== 0) {
                    for (let i = 0; i < json.movies.length; i++) {
                        if (json.movies[i].id === movieId) {
                            $("#add-fav").addClass("d-none");
                            break;
                        }
                    }
                }
            }
        });
}

function LogOut() {
    fetch("https://react-midterm.kreosoft.space/api/account/logout",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            method: "POST"
        })
        .then((response) => {
            console.log(response.status);  //if response.json().status === '401'  => error
            if(response.status === 400 || response.status === 401){
                console.log("error");
                $(".modal-body").text("Ошибка");
                myModal.show();
                console.log(response);
            }
            else {
                return response.json();
            }
        })
        .then((json) => {
            if(json !== undefined) {
                token = json.token;
                localStorage.setItem('token', '');
                $(".modal-body").text("Вы успешно вышли из профиля");
                myModal.show();
                setTimeout(function(){
                    window.location.href = 'movies_page.html';
                }, 1 * 1000);
            }
        });
}

function parsingJsonDate(date){
    return date.match(/\d{4}-\d{2}-\d{2}/);
}

var myModal;
var userId;
var movieId;
var userReviewId;
var userRating;
var userText;
var isAnonymous;