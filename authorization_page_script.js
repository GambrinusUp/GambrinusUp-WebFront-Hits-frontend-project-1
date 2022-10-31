$(document).ready(function (){
    myModal = new bootstrap.Modal($("#exampleModal"));
    $("#authorization-button").click(function(){ Authorization() });
});

function Authorization(){
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
                        //console.log(response);
                        return response.json();
                    })
                    .then((json) => {
                        token = json.token;
                        localStorage.setItem('token', token);
                        console.log(localStorage.getItem('token'));
                    });
    }
}

var myModal;
var token;