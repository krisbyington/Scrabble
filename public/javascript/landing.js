const container = document.getElementById("login-buttons-container");
const registerDiv = container.children[0];
const loginDiv = container.children[1];
const registerButton = container.children[0].children[0];
const loginButton = container.children[1].children[0];
var timerId = 0;


var loginButtonPressed = false;
var registerButtonPressed = false;

var registrationSlider = document.createElement("div");
registrationSlider.className = "slider-container";
registrationSlider.id = "registration-slider";
let tempDiv = document.createElement("div");
tempDiv.classList.add("auth-container");
registrationSlider.append(tempDiv);
//add username input field 
tempDiv = document.createElement("div");
tempDiv.className = "input-field";
let tempLabel = document.createElement("label");
tempLabel.className = "input-name";
tempLabel.innerText = "Username";
let tempInput = document.createElement("input");
tempInput.className = "form-input";
tempInput.id = "registration-username";
tempInput.name = "register-username";
tempInput.type = "text";
tempDiv.append(tempLabel);
tempDiv.append(tempInput);
registrationSlider.append(tempDiv);
//add password input field\
tempDiv = document.createElement("div");
tempDiv.className = "input-field";
tempLabel = document.createElement("label");
tempLabel.className = "input-name";
tempLabel.innerText = "Password";
tempInput = document.createElement("input");
tempInput.className = "form-input";
tempInput.id = "registration-password";
tempInput.name = "register-password";
tempInput.type = "password";
tempDiv.append(tempLabel);
tempDiv.append(tempInput);
registrationSlider.append(tempDiv);
//add confirm password input
tempDiv = document.createElement("div");
tempDiv.className = "input-field";
tempLabel = document.createElement("label");
tempLabel.className = "input-name";
tempLabel.innerText = "Confirm Password";
tempInput = document.createElement("input");
tempInput.id = "registration-confirm-password";
tempInput.className = "form-input";
tempInput.name = "register-confirm-password";
tempInput.type = "password";
tempDiv.append(tempLabel);
tempDiv.append(tempInput);
registrationSlider.append(tempDiv);

var loginSlider = document.createElement("div");
loginSlider.className = "slider-container";
loginSlider.id = "login-slider";
tempDiv = document.createElement("div");
tempDiv.classList.add("auth-container");
loginSlider.append(tempDiv);

//add username input field 
tempDiv = document.createElement("div");
tempDiv.className = "input-field";
tempLabel = document.createElement("label");
tempLabel.className = "input-name";
tempLabel.innerText = "Username";
tempInput = document.createElement("input");
tempInput.className = "form-input";
tempInput.id = "login-username";
tempInput.name = "login-username";
tempInput.type = "text";
tempDiv.append(tempLabel);
tempDiv.append(tempInput);
loginSlider.append(tempDiv);
//add password input field\
tempDiv = document.createElement("div");
tempDiv.className = "input-field";
tempLabel = document.createElement("label");
tempLabel.className = "input-name";
tempLabel.innerText = "Password";
tempInput = document.createElement("input");
tempInput.id = "login-password";
tempInput.className = "form-input";
tempInput.name = "login-password";
tempInput.type = "password";
tempDiv.append(tempLabel);
tempDiv.append(tempInput);
loginSlider.append(tempDiv);

var loadingBar = document.createElement("div");
loadingBar.id = "loadingBar";
loadingBar.dataset.section = 1;
var section1 = document.createElement("div");
section1.id = "section-1";
section1.className = "loadSection";
loadingBar.append(section1);
var section2 = document.createElement("div");
section2.id = "section-2";
section2.className = "loadSection";
loadingBar.append(section2);
var section3 = document.createElement("div");
section3.id = "section-3";
section3.className = "loadSection";
loadingBar.append(section3);


const openRegistration = async () => {
    if(registerButtonPressed){
        username = document.getElementById("registration-username");
        password = document.getElementById("registration-password");
        confirmPassword = document.getElementById("registration-confirm-password");
        username.classList.remove("form-empty");
        password.classList.remove("form-empty");
        confirmPassword.classList.remove("form-empty");
        if( (!username.value) && (password.value || confirmPassword.value)){
            username.classList.add("form-empty");
        }
        if( (!password.value) && (username.value || confirmPassword.value)){
            password.classList.add("form-empty");
        } 
        if( (!confirmPassword.value) && (username.value || password.value)){
            confirmPassword.classList.add("form-empty");
        }
        if( !(username.value || password.value || confirmPassword.value) ){
            registerButtonPressed = false;
            registrationSlider.remove();
        }
        if(username.value && password.value && confirmPassword.value){
            if(password.value == confirmPassword.value){
                registerDiv.append(loadingBar);
                startLoadingBar();
                let registerResult = await fetch("/users/register", {
                    body: JSON.stringify([username.value, password.value, confirmPassword.value]),
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                }).then( (response) => {
                    return response.text();
                });
                if(registerResult == "success"){
                    let loginResult = await fetch("/users/login", {
                        body: JSON.stringify([username.value, password.value]),
                        method: "post",
                        headers: { "Content-Type": "application/json" },
                    }).then( (response) => {
                        return response.text();
                    });
                    if(loginResult == "success"){
                        window.location.href = `${window.location}browseLobby`
                    }                    
                    
                }
                loadingBar.remove();
                stopLoadingBar();
                if(registerResult == "user-exists"){
                    username.classList.add("form-empty");
                    alert("Username Taken");
                    location.reload();
                }
            }

        }
    }else{
        registerButtonPressed = true;
        registerDiv.prepend(registrationSlider);
    }
}

const openLogin = async () => { 
    if(loginButtonPressed){
        username = document.getElementById("login-username");
        password = document.getElementById("login-password");
        console.log(username);
        console.log(username.value);
        username.classList.remove("form-empty");
        password.classList.remove("form-empty");
        if( !username.value && password.value){
            username.classList.add("form-empty");
        }
        if( !password.value && username.value){
            password.classList.add("form-empty");
        } 
        if( !username.value && !password.value){
            loginButtonPressed = false;
            loginSlider.remove();
        }
        if( username.value && password.value){
            loginDiv.append(loadingBar);
            startLoadingBar();
            let loginResult = await fetch("/users/login", {
                body: JSON.stringify([username.value, password.value]),
                method: "post",
                headers: { "Content-Type": "application/json" },
            }).then( (response) => {
                return response.text();
            });
            loadingBar.remove;
            stopLoadingBar();
            if(loginResult == "success"){
                window.location.href = `${window.location}browseLobby`
            }else{
                alert("incorrect credentials");
                location.reload();
            }
        }
        
    }else{
        loginButtonPressed = true;
        loginDiv.prepend(loginSlider)
    }
}

const animateBar = () => {
    console.log("animate")
    current = loadingBar.dataset.section;
    if(current == 1 ){
        section3.classList.remove("on");
        section1.classList.add("on");
        current++;
    }else if(current == 2 ){
        console.log("animate2")
        section1.classList.remove("on");
        section2.classList.add("on");
        current++;
    }else if(current == 3 ){
        console.log("animate3")
        section2.classList.remove("on");
        section3.classList.add("on");
        current = 1;
    }
    loadingBar.dataset.section = current;
}

const startLoadingBar = () => {
    console.log("start bar ");
    timerId = setInterval(animateBar, 600);
}

const stopLoadingBar = () => {
    console.log("stop bar ");
    clearInterval(timerId);
    timerId = 0;
}

registerButton.addEventListener("click",openRegistration);

loginButton.addEventListener("click", openLogin);

