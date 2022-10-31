$(document).ready(function (){
    myModal = new bootstrap.Modal($("#exampleModal"));
    LoadProfile();
    //$("#edit-button").click(function(){ Edit() });
});

function LoadProfile(){
    console.log(localStorage.getItem('token'));
    fetch("https://react-midterm.kreosoft.space/api/account/profile",
        {
            headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
        })
        .then((response) => {
            console.log(response.status);  //if response.json().status === '401'  => error
            if(response.status === 401){
                console.log("error");
                $(".modal-body").text("Вы не авторизованы");
                myModal.show();
                setTimeout(function(){
                    window.location.href = 'authorization_page.html';
                }, 5 * 1000);
            }
            return response.json();
        })
        .then((json) => {
            GetProfile(json);
        });
}

function GetProfile(json) {
    console.log(json);
    let profile = $("#profile-template");
    profile.attr("id", json.id);
    profile.find("#nickname").text(json.nickName);
    localStorage.setItem('nickName', json.nickName);
    $("#profile-nick").text($("#profile-nick").text() + localStorage.getItem('nickName'));
    profile.find("#inputEmail").val(json.email);
    if(json.avatarLink === '') {
        let img = $('<img />', {src : 'profile_avatar.png'});
        img.attr("alt", "Responsive image");
        img.attr("class", "img-fluid");
        profile.find("#profile-img").append(img);
    }
    else {
        profile.find("#inputAvatarLink").val(json.avatarLink);
        let img = $('<img />', {src : json.avatarLink});
        img.attr("alt", "Responsive image");
        img.attr("class", "img-fluid");
        profile.find("#profile-img").append(img);
    }
    profile.find("#inputName").val(json.name);
    profile.find("#inputDate").val(parsingJsonDate(json.birthDate));
    profile.find("#inputGender").val(json.gender);
    Edit();
}

function Edit(){
    let profile = $("#profile-template");
    let name, email, date, gender;
}

var myModal;

function parsingJsonDate(date){
    return date.match(/\d{4}-\d{2}-\d{2}/);
}