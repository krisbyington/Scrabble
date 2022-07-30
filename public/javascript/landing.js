const container = document.getElementById("login-buttons-container")
console.log(container.children)
const loginSlider = container.children[1];
const registrationSlider = container.children[4];
const loginButton = container.children[2];
const registerButton = container.children[5]
console.log(loginButton)
console.log(registerButton)
console.log(loginSlider)
console.log(registrationSlider)
 //need to build the HTML internals based on the partial and just add it
  //need to build the HTML internals based on the partial and just add it

var loginButtonPressed = false;
var registerButtonPressed = false;

const openRegistration = () => {
    if(registerButtonPressed){
        registerButtonPressed = false;
        //sending login and close logic 
    }else{
        registerButtonPressed = true;
        //need to build the HTML internals based on the partial and just add it
}

const openLogin = () => { 
    console.log("openLogin\n")
    if(loginButtonPressed){
        console.log("openLogin 1 \n")
        loginButtonPressed = false;
        loginSlider.remove();
        //sending login and close logic 
    }else{
        loginButtonPressed = true;
        container.append(loginSlider)
        //open the login panel

    }
}

registerButton.addEventListener("click",openRegistration);

loginButton.addEventListener("click", openLogin);

