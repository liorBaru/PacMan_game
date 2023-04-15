var usernames = [
    "p"
];

var passwords = [
    "p"
];

var current_user;
var loggedIn = false;

function showLoginErea(){
    $(".startClass").hide();
    $(".preGameClass1").hide();
    $(".preGameClass2").hide();
    $(".registerClass").hide();
    $(".loginClass").show();
    $(".aboutClass").hide();
    $(".gameClass").hide();
    $(".keyControlClass").hide();
}

function showRegisterErea(){
    $(".startClass").hide();
    $(".preGameClass1").hide();
    $(".preGameClass2").hide()
    $(".gameClass").hide();
    $(".loginClass").hide();
    $(".registerClass").show();
    $(".aboutClass").hide();
    $(".keyControlClass").hide();
}

function startRegisterinCheck(){
    if( validetInfo() == 1 ){
        showLoginErea()
    }
    else{
        clearInputs()
        showRegisterErea()
    }

    function validetInfo(){

        var sName = $("#registerUserName").val();
        var sPass = $("#registerPassword").val();
        var sFirst = $("#registerFirstName").val();
        var sLast = $("#registerLastName").val();
        var sEmail = $("#registerEmail").val();
        var birthday = $("#registerBirthDat").val();
        var flag = 0;

        if ($.trim(sEmail).length === 0 || $.trim(sName).length === 0 || $.trim(sFirst).length === 0
            || $.trim(sLast).length === 0 || $.trim(sPass).length === 0 || $.trim(birthday).length === 0) {
            flag=0;
        } else if (!validatePassword(sPass)) {
            alert('Your password must contains at least 6 characters long,\n and at least one digit and one letter ');
            flag=0;
        } else if (userExist(sName)) {
            alert('This Username already registered');
            flag=0;
        } else if (!validateEmail(sEmail)) {
            alert('Email Address is invalid');
        }
        else if (!validateName(sFirst) || !validateName(sLast)) {
            alert('First and on name must contain only characters');
        } else{
            flag = 1;
        }

        if (flag == 1){
            addUser(sName, sPass);
        }

        return flag;

    }
}

function validatePassword(sPass) {
    return /[A-Za-z]/.test(sPass)
        && /\d/.test(sPass)
        && sPass.length >= 6
}

function userExist(sName) {
    for (let i = 0; i < usernames.length; i++) {
        if (usernames[i].localeCompare(sName) === 0) {
            return true;
        }
    }
    return false;
}

function addUser(user, pass) {
    const user1 = $("#registerUserName").val();
    const user2 = $("#registerPassword").val();
    usernames.push(user1);
    passwords.push(user2);
}

function validateEmail(sEmail) {
    var filter = /^[\w-.+]+@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,4}$/;
    if (filter.test(sEmail)) {
        return true;
    } else {
        return false;
    }
}

function validateName(name) {
    var filter = /^[a-zA-Z]+$/;
    if (filter.test(name)) {
        return true;
    } else {
        return false;
    }
}

function showRegisterErea(){
    $(".startClass").hide();
    $(".preGameClass1").hide();
    $(".preGameClass2").hide()
    $(".gameClass").hide();
    $(".loginClass").hide();
    $(".registerClass").show();
    $(".aboutClass").hide();
    $(".keyControlClass").hide();
}

function clearInputs() {

    document.getElementById("registerUserName").value = "";
    document.getElementById("registerUserName").placeholder = "pacman123";

    let placeholderDefault = document.getElementById("password").placeholder;
    document.getElementById("registerPassword").value = "";
    document.getElementById("registerPassword").placeholder = placeholderDefault;

    document.getElementById("registerFirstName").value = "";
    document.getElementById("registerFirstName").placeholder = "Pacman";

    document.getElementById("registerLastName").value = "";
    document.getElementById("registerLastName").placeholder = "Ghost";

    document.getElementById("registerEmail").value = "";
    document.getElementById("registerEmail").placeholder = "pacman@eat.com";

    document.getElementById("registerBirthDat").value = "";
    document.getElementById("registerBirthDat").placeholder = "dd/mm/yyyy";
}



function startLoginCheck(){
    if( validetInfo() == 1){
        showPreGameErea()
    }
    else{
        showLoginErea()
    }

    function showPreGameErea(){
        $(".startClass").hide();
        $(".preGameClass1").show();
        $(".preGameClass2").hide();
        $(".registerClass").hide();
        $(".loginClass").hide();
        $(".aboutClass").hide();
        $(".gameClass").hide();
        $(".keyControlClass").hide();
    }
    function showLoginErea(){
        $(".startClass").hide();
        $(".preGameClass1").hide();
        $(".preGameClass2").hide()
        $(".registerClass").hide();
        $(".loginClass").show();
        $(".aboutClass").hide();
        $(".gameClass").hide();
        $(".keyControlClass").hide();
    }

    function validetInfo(){

        var user = document.getElementById("loginUserName").value;
        var pass = document.getElementById("loginPassword").value;
        current_user = user;
        var found = 0;
        for (let i = 0; i < usernames.length; i++) {
            if (usernames[i].localeCompare(user) === 0) {
                if (passwords[i].localeCompare(pass) === 0) {
                    found = 1;
                }
            }
        }

        if (found == 0) {
            alert('Invalid username or password');
        }
        return found;
    }
}



