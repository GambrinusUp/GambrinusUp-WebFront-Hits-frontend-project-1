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
    let button = profile.find("#edit-button");
    button.click( function () { Edit(profile) });
}

function Edit(profile){
    let name, email, date, gender, link, nickName;
    name = profile.find("#inputName").val();
    email = profile.find("#inputEmail").val();
    date =  profile.find("#inputDate").val();
    gender = profile.find("#inputGender").val();
    link = profile.find("#inputAvatarLink").val();
    nickName = profile.find("#nickname").text();
    console.log(name, email, date, gender, link, nickName);
    console.log(profile.attr('id'));
    if(name === '' || email === '' || date === '' || gender === '' ){
        console.log("empty field");
        $(".modal-body").text("Пустое поле");
        myModal.show();
    }
    else {
        if (validateEmail(email)) {
            /*fetch("https://react-midterm.kreosoft.space/api/account/profile",
                {
                    headers: {
                        'Content-Type': 'application/json'
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    method: "PUT",
                    body: JSON.stringify({
                        "id": profile.attr('id'),
                        "nickName": nickName,
                        "email": email,
                        "avatarLink": link,
                        "name": name,
                        "birthDate": date,
                        "gender": gender
                    })
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
                        $(".modal-body").text("Успешно");
                        myModal.show();
                        setTimeout(function(){
                            window.location.href = 'authorization_page.html';
                        }, 5 * 1000);
                    }
                    return response.json();
                })
                .then((json) => {
                    token = json.token;
                    GetFavorites(json.token);
                });*/
        }
        else {
            console.log("error");
            $(".modal-body").text("Не правильный Email");
            myModal.show();
        }
    }
}

var myModal;

function parsingJsonDate(date){
    return date.match(/\d{4}-\d{2}-\d{2}/);
}

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};