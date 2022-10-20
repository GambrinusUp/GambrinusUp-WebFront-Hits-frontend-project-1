$(document).ready(function (){
    LoadMovies();
});

function LoadMovies(){
    fetch("https://react-midterm.kreosoft.space/api/movies/1")
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            $("#news-container").empty();
            /*let template = $('#card-template');
            for(let movies of json){
                let block = template.clone();
                block.attr("id", "movies-" + movies.id);
                block.find(".movies-title").text(news.title);
                block.find(".movies-content").text(news.content);
                block.find(".movies-likes").text(`Likes - ${news.serviceInfo.likes}`);
                block.find(".movies-likes").attr("data-id", news.id);
                block.find(".movies-tags").text(news.tags);
                block.find(".movies-date").text(news.date);
                block.removeClass("d-none");
                $("#news-container").append(block);
            }*/

            let template = $('#movies-template');
            for(let movies of json.movies){
                let block = template.clone();
                block.attr("id", "movies-" + movies.id);
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

            //RegisterLikeEvents();
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

/*function RegisterLikeEvents(){
    $(".news-likes").click(function(){
        let newsId = $(this).data("id");
        console.log(newsId);
    });
}

$(document).ready(function (){
    testAdd();
});

function testAdd(){
    $("#movies-container").empty();
    let template = $('#card-template');
    for(let i = 0; i < 3; i++){
        let block = template.clone();
        block.find(".news-title").text(i);
        block.find(".news-content").text(i);
        block.find(".news-likes").text(i);
        block.find(".news-tags").text(i);
        block.find(".news-date").text(i);
        block.removeClass("d-none");
        console.log("hueta");
        $("#movies-container").append(block);
    }
}*/