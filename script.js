$(document).ready(function (){
    LoadMovies();
});

function LoadMovies(){
    fetch("https://react-midterm.kreosoft.space/api/movies/1")
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(json);
            $("#movies-container").empty();
            let template = $('#movies-template');
            for(let movies of json.movies){
                let block = template.clone();
                //block.attr("id", "movies-" + movies.id);
                console.log(movies.id);
                block.attr("id", movies.id);
                let img = $('<img />', {src : movies.poster + '.png'});
                img.attr("alt", "Responsive image");
                img.attr("class", "img-fluid");
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
            //console.log($(".active")[1].text);        КАК СДЕЛАТЬ НОРМАЛЬНО?
            RegisterTransition();
            /*$(".pagination").click(function (event) {
               console.log(event.target);
            });*/
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

function RegisterTransition(){
    $('.card').click(function(event){
        localStorage.setItem('currentMovie', event.target.closest('.card').id);
        console.log(localStorage.getItem('currentMovie'));
    });
}