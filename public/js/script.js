$("#new_edit_compte").on('submit', function(){
    if($("#compte_password").val() !== $("#verifpass").val()) {
        alert("Les deux mots de passe saisis sont différents");
        alert("Merci de renouveler l'opération");
        return false;
    }
})