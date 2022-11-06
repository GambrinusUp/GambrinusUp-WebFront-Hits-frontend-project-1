$(document).ready(function (){
    history.pushState(null, null, "/" + localStorage.getItem('currentPage'));
    console.log(window.location.href);

    myModal = new bootstrap.Modal($("#exampleModal"));
    CheckUser();
    LoadMovies();
});

function LoadMovies(){
    if(localStorage.getItem('currentPage') === null)
        localStorage.setItem('currentPage', '1');
    console.log(localStorage.getItem('currentPage'));
    fetch("https://react-midterm.kreosoft.space/api/movies/" + localStorage.getItem('currentPage'))
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(json);
            $("#movies-container").empty();
            let template = $('#movies-template');
            for(let movies of json.movies){
                let block = template.clone();
                console.log(movies.id);
                block.attr("id", movies.id);
                let img = $('<img />', {src : movies.poster});
                img.attr("alt", "Responsive image");
                img.attr("class", "img-fluid");
                img.addClass("poster");
                block.find(".poster").append(img);
                block.find(".name").text(movies.name);
                block.find(".year").text(movies.year);
                let genres = GetListOfGenres(movies.genres);
                block.find(".genres").text(movies.country + " ● " + genres);
                let rating = GetRatingOfMovies(movies.reviews);
                block.find(".rating").text("Средняя оценка - " + rating);
                block.removeClass("d-none");
                $("#movies-container").append(block);
            }
            SetPageCount(json.pageInfo.pageCount);
            Navigation(json.pageInfo.pageCount);
            RegisterTransition();
            $("#profile-logout").click(function (){ LogOut() });
        });
}

function Navigation(pageCount) {
    var page;
    $(".pagination li").click(function(){
        if(event.target.text === "«" && localStorage.getItem('currentPage') !== '1') {
            page = Number(localStorage.getItem('currentPage')) - 1;
            localStorage.setItem('currentPage', page.toString());
        }else{
            if(event.target.text === "»" && localStorage.getItem('currentPage') !== pageCount.toString()) {
                page = Number(localStorage.getItem('currentPage')) + 1;
                localStorage.setItem('currentPage', page.toString());
            }
            else {
                if(event.target.text !== "»" && event.target.text !== "«") {
                    localStorage.setItem('currentPage', event.target.text);
                }
            }
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
                console.log(json);
                $("#login").addClass("d-none");
                $("#registration").addClass("d-none");
                $(".profile-nickname").removeClass("d-none");
                $("#profile-logout").removeClass("d-none");
                $("#favorites").removeClass("d-none");
                $("#my-profile").removeClass("d-none");
                $("#profile-nick").text($("#profile-nick").text() + json.nickName);
            }
        });
}

function SetPageCount(count) {
    let pageBlock = $(".pagination");
    for (let i = 0; i < count; i++) {
        if((i+1).toString() === localStorage.getItem('currentPage'))
        {
            $("<li/>", {
                class: "page-item",
            }).append( $("<a/>", {
                class: "page-link active",
                text: i+1,
                href: "/main.html"
            })).appendTo(pageBlock);
        } else {
            $("<li/>", {
                class: "page-item",
            }).append( $("<a/>", {
                class: "page-link",
                text: i+1,
                href: "/main.html"
            })).appendTo(pageBlock);
        }
    }
    $("<li/>", {
        class: "page-item",
    }).append( $("<a/>", {
        class: "page-link",
        text: "»",
        ariaLabel: "Next",
        href: "/main.html"
    })).append( $("<span/>", {
        ariaHidden: "true"
    })).appendTo(pageBlock);
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
                    location.reload();
                }, 1 * 1000);
            }
        });
}

var myModal;