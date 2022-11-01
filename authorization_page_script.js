$(document).ready(function (){
    myModal = new bootstrap.Modal($("#exampleModal"));
    $("#authorization-button").click(function(){ Authorization() });
});

function Authorization(){
    //window.history.pushState(null, null, 'http://localhost/login');
    let username, password;
    username = $("#inputLogin").val();
    password = $("#inputPassword1").val();
    if(username === '' || password === ''){
        console.log("empty field");
        $(".modal-body").text("Пустое поле");
        myModal.show();
    }
    else {
        fetch("https://react-midterm.kreosoft.space/api/account/login",
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify({
                            "username": username,
                            "password": password
                        })
                    })
                    .then((response) => {
                        if(response.status === 400){
                            console.log('Login failed');
                            $(".modal-body").text("Неправильный логин или пароль");
                            myModal.show();
                        }
                        else{
                            return response.json();
                        }
                    })
                    .then((json) => {
                        if(json !== undefined) {
                            //console.log(json);
                            token = json.token;
                            localStorage.setItem('token', token);
                            console.log(localStorage.getItem('token'));
                            $(".modal-body").text("Вы успешно вошли");
                            myModal.show();
                            setTimeout(function(){
                                window.location.href = 'main.html';
                            }, 2 * 1000);
                        } else {
                            localStorage.setItem('token', '');
                        }
                    });
    }
}

var myModal;
var token;