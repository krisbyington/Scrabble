const container = document.getElementById("login-buttons-container");
var registerDiv = container.children[0];
const loginDiv = container.children[1];
const registerButton = container.children[0].children[0];
const loginButton = container.children[1].children[0];


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
            let loginResult = await fetch("/users/login", {
                body: JSON.stringify([username.value, password.value]),
                method: "post",
                headers: { "Content-Type": "application/json" },
            }).then( (response) => {
                return response.text();
            });
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

const addRegistrationSlider = () => {
    let registrationSlider = document.createElement("div");
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
    tempInput.name = "register-password";
    tempInput.type = "text";
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
    tempInput.className = "form-input";
    tempInput.name = "register-confirm-password";
    tempInput.type = "text";
    tempDiv.append(tempLabel);
    tempDiv.append(tempInput);
    registrationSlider.append(tempDiv);
    
    registerDiv.prepend(registrationSlider);
    
}
registerButton.addEventListener("click",openRegistration);

loginButton.addEventListener("click", openLogin);

