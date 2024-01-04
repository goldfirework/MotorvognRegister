let registrerte = [{}];

function registerVehicle() {
    const bil = {
        pnummer : $("#pnummer").val(),
        navn : $("#navn").val(),
        adresse : $("#adresse").val(),
        kjennetegn : $("#kjennetegn").val(),
        bilmerke : $("#bilmerke").val(),
        biltype : $("#biltype").val()
    }

    $.post("/registerVehicle", bil)

};

function errorHandler() {

};

function hentAlle() {
    $.get("/motorvognsRegister", function (data) {
        data.forEach()
        registrerte = data;
        //console.log(data);
    });

    console.log(registrerte);
};