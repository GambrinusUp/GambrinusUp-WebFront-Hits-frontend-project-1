$(document).ready(function (){
    LoadMovieDetails();
});

function LoadMovieDetails(){
    fetch("https://react-midterm.kreosoft.space/api/movies/details/" + localStorage.getItem('currentMovie'))
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(json);
            let img = $('<img />', {src : json.poster + '.png'});
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





            /*$(".form-select").click(function () {
                let a = $(".form-select").val();
                console.log(a);
                //console.log(a.options[a.selectedIndex].text);
            });*/

        });
}

function SetReviews(json){
    /*for(let i = 0; i < json.length; i++){
        console.log(json[i]);
        if(!json[i].isAnonymous)
            $(".avatar-nickname").text(json[i].author.nickName);
    }*/

    $(".reviews-container").empty();
    let template = $('#review-block');
    for(let review of json){
        let block = template.clone();
        block.attr("id", review.id);

        if(!review.isAnonymous) {
            if(review.author.avatar !== "") {
                let img = $('<img />', {src : review.author.avatar});
                img.attr("alt", "Responsive image");
                img.attr("class", "rounded-circle review-avatar");
                block.find(".avatar-nickname").append(img);
            }
            else
                console.log("no avatar");
            block.find(".avatar-nickname").append(review.author.nickName);

        }
        else {
            console.log("anonymous avatar");
            block.find(".avatar-nickname").append("Анонимный пользователь");
        }
        block.find(".score").text(review.rating);
        block.find(".date").text("Дата отзыва:" + review.createDateTime); //распарсить дату
        block.find(".reviewText").text(review.reviewText);

        if(review.rating > 5){
            block.addClass("border-success");
            block.find(".score").addClass("bg-success"); //card-body text-success
            block.find(".card-body").addClass("text-success");
        }
        else {
            block.addClass("border-danger");
            block.find(".score").addClass("bg-danger");
            block.find(".card-body").addClass("text-danger");
        }
        block.removeClass("d-none");
        $(".reviews-container").append(block);
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