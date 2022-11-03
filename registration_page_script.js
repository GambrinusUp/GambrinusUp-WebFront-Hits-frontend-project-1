$(document).ready(function (){
    myModal = new bootstrap.Modal($("#exampleModal"));
    $("#registration-button").click(function(){ Registration() });
});

function Registration(){
    let userName, name, password, passwordCopy, email, birthDate, gender;
    userName = $("#inputLogin").val();
    name = $("#inputName").val();
    password = $("#inputPassword1").val();
    passwordCopy = $("#inputPassword2").val();
    email = $("#inputEmail").val();
    birthDate = $("#inputDate").val();
    gender = $("#inputGender").val();

    if(userName === '' || name === '' ||  password === '' || passwordCopy === '' || email === '' || birthDate === '' || gender === '' ){
        console.log("empty field");
        $(".modal-body").text("Пустое поле");
        myModal.show();
    }
    else {
        if (validateEmail(email)) {
            if (password !== passwordCopy) {
                console.log("error");
                $(".modal-body").text("Пароли не совпадают");
                myModal.show();
            } else {
                fetch("https://react-midterm.kreosoft.space/api/account/register",
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify({
                            "userName": userName,
                            "name": name,
                            "password": password,
                            "email": email,
                            "birthDate": birthDate + "T11:56:47.615Z",
                            "gender": Number(gender)
                        })
                    })
                    .then((response) => {
                        console.log(response.status);  //if response.json().status === '401'  => error
                        if(response.status === 400){
                            console.log("error");
                            $(".modal-body").text("Такой пользователь существует");
                            myModal.show();
                            console.log(response);
                        }
                        else {
                            console.log("success");
                            $(".modal-body").text("Пользователь успешно создан");
                            myModal.show();
                            setTimeout(function(){
                                window.location.href = '/authorization_page.html';
                            }, 2 * 1000);
                        }
                        return response.json();
                    })
                    .then((json) => {
                        token = json.token;
                        console.log(token);
                    });
                console.log(userName, name, password, passwordCopy, email, birthDate, gender);
            }
        } else {
            console.log("error");
            $(".modal-body").text("Не правильный Email");
            myModal.show();
        }
    }
}

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

var myModal;
var token;