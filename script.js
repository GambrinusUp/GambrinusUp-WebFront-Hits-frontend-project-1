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
                var img = $('<img />', {src : movies.poster + '.png'});
                img.attr("alt", "Responsive image");
                img.attr("class", "img-fluid");
                //img.className = 'img-thumbnail';
                block.find(".poster").append(img);
                block.find(".details").text(movies.name);
                block.removeClass("d-none");
                $("#movies-container").append(block);
            }

            //RegisterLikeEvents();
        });
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