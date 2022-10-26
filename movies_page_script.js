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
            /*$(".form-select").click(function () {
                let a = $(".form-select").val();
                console.log(a);
                //console.log(a.options[a.selectedIndex].text);
            });*/

        });
}