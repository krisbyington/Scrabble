const container = document.getElementById("login-buttons-container");
var registerDiv = container.children[0];
const loginDiv = container.children[1];
console.log(container.children[0])
console.log(container.children)
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
tempInput.className = "form-input";
tempInput.name = "login-password";
tempInput.type = "text";
tempDiv.append(tempLabel);
tempDiv.append(tempInput);
loginSlider.append(tempDiv);



const openRegistration = async () => {
    if(registerButtonPressed){
        //this is where the fetch will be send 
        //we if empty then close like below 
        //if what is entered is incorrect 
        //then we clear the fields
        //then break without changing buttonpress 
        registerButtonPressed = false;
        registrationSlider.remove();
       
    }else{
        registerButtonPressed = true;
        registerDiv.prepend(registrationSlider)
        
    }
}

const openLogin = async () => { 
    if(loginButtonPressed){
         //this is where the fetch will be send 
        //we if empty then close like below 
        //if what is entered is incorrect 
        //then we clear the fields
        //then break without changing buttonpress 
        loginButtonPressed = false;
        loginSlider.remove();
        
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

