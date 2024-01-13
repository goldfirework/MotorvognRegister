let registrerte;

// Funskjonen som registrerer en ny bil..
function registerVehicle() {

    // Konstruerer bilen utifra dataen brukeren har gitt.
    const bil = {
        pnummer : $("#pnummer").val(),
        navn : $("#navn").val(),
        adresse : $("#adresse").val(),
        kjennetegn : $("#kjennetegn").val(),
        bilmerke : $("#bilmerke").val(),
        biltype : $("#biltype").val()
    }

    // Sender bilen til validering :)
    if (!validateForm(bil)) {
        return;
    }

    // Sender bilen til Java for å bli lagret.
    $.post("/registerVehicle", bil);

};

// Kller på onReady() Når nettsiden har lastet.
$(document).ready(function () {
    onReady();
})

// Funksjonen jeg kjører når nettsiden er ferdig lasta for brukeren. Det er en funksjon fordi jeg da kan kalle på den senere dersom jeg vil gjøre det igjen.
function onReady() {
    console.log("ready!")
    showRegister("");
}

// Funksjonen som brukes for å validere om en bil er godkjent.
function validateForm(bil) {
    if (!validatePersonNr(bil.pnummer)) {
        alert("Feil i innskreved personnummer! Husk at den må være 11 siffer.")
        return false;
    }

    return true;
}

// Brukes for å slette en bil.
function slett(plate1) {
    // Legger til platen i data-feltet
    const data = {
        plate : plate1
    };

    // Sender inn til sletting.
    $.post("/slett", data).then(() => {
        // Oppdaterer registeret.
        showRegister($("#search-input").val());
    });
}

// Henter registeret og viser det
function showRegister(search) {

    // Henter bilene fra Java.
    $.get("/motorvognsRegister", function (data) {
        // Lagrer de registrerte lokalt.
        registrerte = data;
    }).then(() => {
        // Legger til headerne til table.
        let html = "<tr>\n" +
            "        <th>Personnummer</th>\n" +
            "        <th>Navn</th>\n" +
            "        <th>Adresse</th>\n" +
            "        <th>Kjennetegn</th>\n" +
            "        <th>Bilmerke</th>\n" +
            "        <th>Biltype</th>\n" +
            "        <th><button class=\"button-1\" onclick='slett(\"*\")'>Slett alle</button></th>\n" +
            "    </tr>";

        // Gjentar for alle de registrerte bilene, kunne og burde brukt en for løkke, men :)
        let i = 0;
        while(i < registrerte.length) {
            let html2 = "";

            // Lager html-en som trengs for alle bilene.
            html2 += "<tr>";
            html2 += "<td>" + registrerte[i].pnummer + "</td>";
            html2 += "<td>" + registrerte[i].navn + "</td>";
            html2 += "<td>" + registrerte[i].adresse + "</td>";
            html2 += "<td>" + registrerte[i].kjennetegn + "</td>";
            html2 += "<td>" + registrerte[i].bilmerke + "</td>";
            html2 += "<td>" + registrerte[i].biltype + "</td>";
            html2 += "<td><button class=\"button-1\" onclick='slett(\"" + registrerte[i].kjennetegn +"\")'>Slett</button></td>"
            html2 += "</tr>";

            //Gjentar for alle ordene i søkefeltet.
            let o = 0;
            while (search.toString().split(" ").length > o) {
                // Hvis bilen ikke inneholder ordene i søkefeltet fjernes den fra resultatet.
                if (!html2.toLowerCase().replaceAll("<td>", "").replaceAll("</td>", "").replaceAll("<tr>", "").replaceAll("</tr>", "")
                    .includes(search.toString().split(" ")[o].toLowerCase())) {
                    html2 = "";
                }
                o++;
            }

            // legger til resultatene fra søket til variabelen som settes ut
            html += html2;

            i++
        }

        // Oppdaterer registeret med den oppdaterte html-en.
        $("#registeret").html(html);
    });
};

// Liste over diverse bilmodeller, stjålet fra Nicolai.
const carModels = {
    toyota: ['Camry', 'Corolla', 'Rav4', 'Highlander', 'Prius', 'Sienna', 'Tacoma', 'Tundra', '4Runner', 'Land Cruiser', 'Supra', 'Yaris', 'Avalon', 'Venza', 'C-HR', 'Sequoia', 'Mirai', 'GR86', 'Century', 'BZ4X'],
    volkswagen: ['Golf', 'Passat', 'Tiguan', 'Atlas', 'Jetta', 'Arteon', 'ID.4', 'Touareg', 'Atlas Cross Sport', 'Taos', 'Beetle', 'CC', 'T-Roc', 'Up!', 'Polo', 'Scirocco', 'Golf R', 'Golf GTI', 'Tiguan Allspace', 'ID.3'],
    ford: ['F-150', 'Focus', 'Escape', 'Explorer', 'Mustang', 'Edge', 'Ranger', 'Fusion', 'Expedition', 'Bronco', 'Mach-E', 'Transit', 'EcoSport', 'Flex', 'Taurus', 'F-250 Super Duty', 'F-350 Super Duty', 'F-450 Super Duty', 'Fiesta', 'GT'],
    chevrolet: ['Silverado', 'Equinox', 'Malibu', 'Camaro', 'Tahoe', 'Traverse', 'Colorado', 'Blazer', 'Suburban', 'Trailblazer', 'Spark', 'Impala', 'Cruze', 'Sonic', 'Trax', 'Express', 'Volt', 'Bolt EV', 'Corvette', 'Camaro ZL1'],
    nissan: ['Rogue', 'Altima', 'Sentra', 'Murano', 'Pathfinder', 'Titan', 'Maxima', 'Armada', 'Versa', 'Kicks', '370Z', 'Leaf', 'Juke', 'NV200', 'Rogue Sport', 'GT-R', 'Frontier', 'Quest', 'Xterra', '240SX'],
    honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey', 'Fit', 'HR-V', 'Ridgeline', 'Insight', 'Passport', 'S2000', 'Element', 'CR-Z', 'Clarity', 'NSX', 'Prelude', 'Integra', 'Legend', 'CRX', 'Accord Crosstour', 'City'],
    mercedes_benz: ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'A-Class', 'CLA', 'GLA', 'G-Class', 'GLS', 'SLC', 'SL', 'GLB', 'M-Class', 'SLK', 'R-Class', 'B-Class', 'X-Class', 'EQC', 'GLK-Class'],
    bmw: ['3 Series', '5 Series', '7 Series', 'X3', 'X5', 'X1', '4 Series', 'X7', '2 Series', '8 Series', 'Z4', 'i3', 'X6', 'X4', 'M2', 'M3', 'M4', 'M5', 'M6', 'X2', 'X4 M'],
    audi: ['A4', 'A6', 'Q5', 'Q7', 'Q3', 'A3', 'A8', 'Q8', 'e-tron', 'RS6 Avant', 'TT', 'R8', 'S4', 'S5', 'S6', 'S8', 'Q2', 'Q4 e-tron', 'Q6', 'RS3', 'RS7'],
    hyundai: ['Elantra', 'Tucson', 'Santa Fe', 'Kona', 'Palisade', 'Sonata', 'Venue', 'Ioniq', 'Veloster', 'Genesis', 'Nexo', 'Accent', 'Azera', 'Equus', 'G80', 'G90', 'G70', 'Kona Electric', 'Santa Cruz', 'Pony'],
    tesla: ['Model 3', 'Model S', 'Model X', 'Model Y', 'Cybertruck', 'Roadster', 'Model X Plaid', 'Model S Plaid', 'Model 2', 'Model 4', 'Model 5', 'Model 6', 'Model 7', 'Model 8', 'Model 9', 'Model 10', 'Model C', 'Model R', 'Model U'],
    volvo: ['XC90', 'XC60', 'S60', 'S90', 'V60', 'V90', 'XC40', 'C40', 'Polestar 2', 'V60 Cross Country', 'S40', 'V40', 'XC50', 'C30', 'V50', 'S70', 'XC70', 'S80', 'V70', 'S90 Recharge', 'XC90 Recharge'],
    kia: ['Seltos', 'Sportage', 'Telluride', 'Sorento', 'Forte', 'Soul', 'Niro', 'Cadenza', 'Stinger', 'Rio', 'Optima', 'K900', 'K5', 'Seltos X-Line', 'Stonic', 'Ceed', 'Soul EV', 'e-Niro', 'Carnival', 'EV6'],
    subaru: ['Outback', 'Forester', 'Crosstrek', 'Ascent', 'Impreza', 'Legacy', 'BRZ', 'WRX', 'XV Crosstrek', 'Baja', 'Tribeca', 'SVX', 'Justy', 'XT', 'R1', 'R2', 'Traviq', 'Exiga', 'Sambar', 'Domingo'],
    mazda: ['CX-5', 'Mazda3', 'CX-9', 'Mazda6', 'MX-5 Miata', 'CX-30', 'RX-7', 'RX-8', 'Mazdaspeed3', 'MPV', 'RX-3', 'RX-4', 'RX-5', 'RX-9', 'Millenia', 'Navajo', '626', 'Tribute', 'MX-6', 'Protegé'],
    lexus: ['RX', 'NX', 'ES', 'UX', 'GX', 'IS', 'LS', 'LC', 'LX', 'RC', 'CT', 'LFA', 'HS', 'SC', 'GS', 'LM', 'LF', 'LF-A', 'RX L', 'UX 300e', 'RC F', 'ES Hybrid'],
    jeep: ['Grand Cherokee', 'Cherokee', 'Wrangler', 'Compass', 'Renegade', 'Gladiator', 'Wagoneer', 'Grand Wagoneer', 'CJ-5', 'CJ-7', 'CJ-8 Scrambler', 'Commander', 'Patriot', 'Liberty', 'Willys', 'FC', 'Jeepster', 'Comanche', 'Hurricane', 'J8'],
    ram: ['1500', '2500', '3500', 'ProMaster', 'ProMaster City', 'Rebel TRX', 'Ramcharger', 'Dakota', 'Power Wagon', '700', '750', '1200', 'Van', 'Wagon', 'Ram Van', 'Ram Wagon', 'Ram 100', 'Ram 150', 'Ram 250', 'Ram 350'],
    porsche: ['911', 'Cayenne', 'Panamera', 'Macan', 'Taycan', 'Boxster', 'Cayman', '718 Spyder', '911 GT3', '944', '928', '968', '914', '912', '550 Spyder', '356', '959', '918 Spyder', 'Carrera GT', 'Cayenne Coupe', 'Panamera Sport Turismo'],
    acura: ['MDX', 'RDX', 'TLX', 'ILX', 'NSX', 'RLX', 'Integra', 'Legend', 'Vigor', 'TSX', 'ZDX', 'CSX', 'SLX', 'EL', 'CL', 'Vigorous', 'Precision', 'CDX', 'RL', 'RLX Sport Hybrid'],
    infiniti: ['QX60', 'QX50', 'Q50', 'QX80', 'QX30', 'Q60', 'QX70', 'FX35', 'FX45', 'EX35', 'JX35', 'QX56', 'QX4', 'M30', 'M45', 'G20', 'G35', 'G37', 'I30', 'I35', 'J30'],
    land_rover: ['Range Rover', 'Discovery', 'Defender', 'Range Rover Sport', 'Range Rover Velar', 'Evoque', 'Freelander', 'LR2', 'LR3', 'LR4', 'Discovery Sport', 'Series I', 'Series II', 'Series III', 'County', 'Santana', 'Forward Control', 'One Ten', 'Ninety', 'Llama'],
    jaguar: ['F-PACE', 'E-PACE', 'I-PACE', 'XF', 'XJ', 'XE', 'S-Type', 'X-Type', 'XJS', 'XK', 'XKR', 'XFR', 'XFR-S', 'XJ220', 'XJR', 'XE SV Project 8', 'F-Type', 'C-X17', 'C-X75', 'C-X16'],
    fiat: ['500', '500X', '500L', '124 Spider', 'Doblo', 'Panda', 'Uno', 'Tipo', 'Bravo', 'Croma', 'Seicento', 'Multipla', 'Stilo', 'Idea', 'Qubo', 'Linea', 'Palio', 'Albea', 'Sedici', '500e'],
    mitsubishi: ['Outlander', 'Eclipse Cross', 'Outlander Sport', 'Mirage', 'Lancer', 'Montero', 'Galant', '3000GT', 'Diamante', 'Raider', 'Endeavor', 'Magna', 'Sigma', 'Challenger', 'FTO', 'RVR', 'L300', 'Triton', 'GTO', 'Starion'],
    buick: ['Encore', 'Enclave', 'Envision', 'Regal', 'Cascada', 'Verano', 'Lacrosse', 'Lucerne', 'Skyhawk', 'Electra', 'Century', 'Reatta', 'Roadmaster', 'Riviera', 'Apollo', 'Wildcat', 'Terraza', 'Avenir', 'GL6', 'GL8'],
    gmc: ['Sierra 1500', 'Yukon', 'Acadia', 'Terrain', 'Canyon', 'Denali', 'Jimmy', 'Sonoma', 'Syclone', 'Safari', 'TopKick', 'Typhoon', 'Caballero', 'Sprint', 'Brigadier', 'Rally', 'Envoy', 'W4500 Forward', 'W5500 Forward', 'W3500 Forward'],
    chrysler: ['Pacifica', 'Voyager', '300', 'Aspen', 'Concorde', 'Sebring', 'Town & Country', 'LHS', 'Cirrus', 'PT Cruiser', 'Crossfire', 'Viper', 'Imperial', 'New Yorker', 'LeBaron', 'Fifth Avenue', 'Saratoga', 'Windsor', 'TC by Maserati', 'Valiant'],
    dodge: ['Durango', 'Charger', 'Challenger', 'Journey', 'Viper', 'Grand Caravan', 'Dart', 'Avenger', 'Caliber', 'Nitro', 'Magnum', 'Intrepid', 'Stratus', 'Ram Van', 'Ram Wagon', 'Ram 100', 'Ram 150', 'Ram 250', 'Ram 350', 'Ram 50'],
    cadillac: ['XT5', 'Escalade', 'XT4', 'CT5', 'CT4', 'ATS', 'XT6', 'CT6', 'XTS', 'Seville', 'Eldorado', 'DeVille', 'Catera', 'BLS', 'STS', 'XLR', 'Fleetwood', 'Allante', 'Sixty Special', 'Calais', 'Series 62'],
    lincoln: ['Navigator', 'Aviator', 'Corsair', 'Nautilus', 'Continental', 'MKZ', 'MKX', 'MKC', 'MKT', 'Town Car', 'LS', 'Zephyr', 'Blackwood', 'Mark LT', 'MKX', 'Capri', 'Versailles', 'Premiere'],
    mini: ['Cooper', 'Countryman', 'Clubman', 'Paceman', 'Convertible', 'Coupe', 'Roadster', 'Clubvan', 'John Cooper Works', 'Traveller', 'Rocketman', 'Superleggera', 'Inspired by Goodwood', 'Beachcomber', 'Crossover', 'Minor', 'Clubman Estate', 'Mini Electric', 'Clubman All4'],
    alfa_romeo: ['Giulia', 'Stelvio', '4C', 'Giulietta', 'Mito', 'Brera', 'Spider', '156', '159', '147', '166', 'GT', 'GTV', 'SZ', 'RZ', '8C Competizione', 'Crosswagon Q4', '159 Sportwagon', 'GTA', '33 Stradale', '1900'],
    ferrari: ['F8 Tributo', '812 Superfast', 'Roma', 'SF90 Stradale', 'Portofino', '458 Italia', '488 GTB', 'LaFerrari', 'California', 'GTC4Lusso', 'FF', 'F12 Berlinetta', '599 GTB Fiorano', '430 Scuderia', '360 Modena', 'Enzo Ferrari', 'Testarossa', '328 GTB', 'Dino 246 GT', '250 GTO'],
    lamborghini: ['Urus', 'Huracán', 'Aventador', 'Sián FKP 37', 'Essenza SCV12', 'Gallardo', 'Murciélago', 'Diablo', 'Countach', 'Miura', 'Islero', 'Jarama', 'Espada', '400 GT', 'Reventón', 'Veneno', 'Centenario', 'Sesto Elemento', 'Huracán Performante', 'Aventador SVJ'],
    maserati: ['Levante', 'Ghibli', 'Quattroporte', 'GranTurismo', 'MC20', 'Spyder', 'Coupe', 'GranSport', '3200 GT', 'Quattroporte Evo', 'Biturbo', 'Shamal', 'Kyalami', 'Bora', 'Indy', 'Ghibli SS', 'Merak', 'Khamsin', 'Mistral', '3500 GT'],
    bentley: ['Bentayga', 'Continental GT', 'Flying Spur', 'Mulsanne', 'Bacalar', 'Arnage', 'Azure', 'Brooklands', 'Turbo R', 'Continental R', 'Continental T', 'Eight', 'Mulsanne Turbo', 'S1 Continental', 'S2 Continental', 'S3 Continental', 'Mark VI', 'Mark VII', 'Mark VIII', 'Mark IX'],
    rolls_royce: ['Phantom', 'Cullinan', 'Ghost', 'Wraith', 'Dawn', 'Silver Ghost', 'Silver Wraith', 'Silver Dawn', 'Silver Cloud', 'Silver Shadow', 'Silver Spirit', 'Silver Spur', 'Camargue', 'Corniche', 'Phantom V', 'Phantom VI', 'Phantom Drophead Coupé', 'Phantom Coupé', 'Ghost Extended', 'Wraith Black Badge'],
    aston_martin: ['DB11', 'DBS Superleggera', 'Vantage', 'Rapide', 'Valhalla', 'DB9', 'Vanquish', 'Virage', 'DB7', 'DB4', 'DB5', 'DB6', 'Valkyrie', 'One-77', 'DB10', 'Vulcan', 'Cygnet', 'Lagonda', 'Bulldog', 'DBS V12'],
    mclaren: ['720S', '570S', 'GT', 'Speedtail', 'Artura', 'P1', '675LT', '650S', '12C', 'MP4-12C', '570GT', '540C', 'MSO HS', 'Sabre', 'Elva', 'F1', 'Mercedes-Benz SLR McLaren', 'McLaren GT', '570S Spider', '600LT', '620R'],
    bugatti: ['Chiron', 'Divo', 'Centodieci', 'La Voiture Noire', 'Veyron', 'EB110', 'Type 57', 'Type 41 Royale', 'Type 55', 'Type 59', 'Type 35', 'Type 57SC Atlantic', 'Type 251', 'Type 73C', 'Type 101', 'Type 252', 'Type 68', 'Type 251', 'Type 50T', 'Type 46'],
    lotus: ['Evora', 'Elise', 'Exige', 'Elan', 'Esprit', 'Eletre', 'Europa', 'Cortina', 'Seven', 'Elite', 'Eclat', 'Excel', 'Esprit V8', 'Carlton', '340R', '3-Eleven', 'Eleven', 'Evija', 'Type 130', 'Omega'],
    genesis: ['G80', 'G90', 'GV80', 'GV70', 'G70', 'G80 Sport', 'Essentia', 'Mint', 'GV60', 'XConcept', 'New York Concept', 'Essentia Concept', 'GV70 Shooting Brake', 'GV80 Shooting Brake', 'GV90', 'Mint Concept', 'GV70 Recharge', 'GV80 Recharge', 'GV90 Recharge'],
    rivian: ['R1T', 'R1S', 'R2S', 'R2T', 'R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10', 'R11', 'R12', 'R13', 'R14', 'R15', 'R16', 'R17'],
    lucid: ['Air', 'Air Touring', 'Air Grand Touring', 'Air Dream Edition', 'Gravity', 'Project Gravity', 'Casa Grande', 'Velo', 'Essence', 'Sedan', 'Concerto', 'Gravity Performance', 'Aira', 'Atmos', 'Alta', 'Dream', 'Pure', 'Sculpture', 'Kinetic', 'Cerulean'],
    polestar: ['Polestar 2', 'Polestar 1', 'Polestar 3', 'Precept', 'Polestar O2', 'Polestar 4', 'Polestar 5', 'Polestar 6', 'Polestar 7', 'Polestar 8', 'Polestar 9', 'Polestar 10', 'Polestar 11', 'Polestar 12', 'Polestar 13', 'Polestar 14', 'Polestar 15', 'Polestar 16', 'Polestar 17', 'Polestar 18'],
    koenigsegg: ['Jesko', 'Gemera', 'Regera', 'Ragnarok', 'Jesko Absolut', 'Regera Ghost', 'CCX', 'One:1', 'Agera', 'Agera RS', 'Jesko Absolut RS', 'Ragnarok RS', 'Gemera RS', 'Raja', 'Naraya', 'Koenigsegg Jesko Cherry Red Edition', 'Koenigsegg Jesko Red Cherry Edition', 'CC8S', 'CXX', 'Jesko Red Jade Edition'],
    pagani: ['Huayra', 'Huayra Roadster', 'Huayra BC', 'Huayra Roadster BC', 'Zonda', 'Cinque', 'Tricolore', 'Revolution', 'Roadster F', 'Monza', 'Uno', 'La Monza Lisa', 'HH', 'Zonda 760', 'Zonda HP Barchetta', 'Huayra L’Ultimo', 'Zonda Absolute', 'Zonda HP Roadster', 'Zonda Fantasma', 'Zonda Viola'],
    fisker: ['Ocean', 'Emotion', 'Karma Revero GT', 'Karma GS-6', 'Karma SC1 Vision Concept', 'Karma SC2 Vision Concept', 'Karma Revero Aliso', 'Karma Revero GTS', 'Fisker Atlantic', 'Fisker Karma Sunset', 'Fisker Surf', 'Fisker eMotion', 'Fisker Orbit', 'Fisker PEAR', 'Fisker Alaska', 'Fisker Snow', 'Fisker Bandit', 'Fisker Flexee', 'Fisker Jet', 'Fisker Orbit', 'Fisker Orbit Plus'],
    byton: ['M-Byte', 'K-Byte', 'Concept', 'D-Byte', 'C-Byte', 'Byton E-Byte', 'Byton E-Byte Pro', 'Byton E-Byte Plus', 'Byton M-Byte Pro', 'Byton M-Byte Plus', 'Byton K-Byte Pro', 'Byton K-Byte Plus', 'Byton C-Byte Pro', 'Byton C-Byte Plus', 'Byton D-Byte Pro', 'Byton D-Byte Plus', 'Byton E-Byte Base', 'Byton M-Byte Base', 'Byton K-Byte Base', 'Byton C-Byte Base'],
};

// Legger til fake biler, max 15000.
function addFakes(amount) {

    // Henter filen med falske navn.
    fetch("fake-names.csv")
        .then((res) => res.text())
        .then((text) => {
            let i = 1;

            // Gjenta for antall falske personer ønsker. Kunne og burde brukt en for løkke, men..
            while (i <= amount) {
                // Tar ut en enkelt person fra filen.
                const personen = text.split("\n")[i];
                // Finner en tilfeldig bil fra listen.
                const bilMerke = Object.keys(carModels)[Math.floor(Math.random()*50)];
                // Konstruerer bilen
                const bil = {
                    pnummer : generatePnummer(),
                    navn : personen.split(",")[4] +" " + personen.split(",")[6],
                    adresse : personen.split(",")[7].replace('"',"").replace('"', ",") + " " + personen.split(",")[8].replaceAll('"', ""),
                    kjennetegn : generateRandomCarPlate(),
                    bilmerke : bilMerke.toUpperCase(),
                    biltype : carModels[bilMerke.toLowerCase().replace(/\s/g, '_').replace("-", "_")][Math.floor(Math.random() * carModels[bilMerke.toLowerCase().replace(/\s/g, '_').replace("-", "_")].length)]
                };

                // Sender bilen til registrering i Java.
                $.post("/registerVehicle", bil).then(() => {
                    showRegister($("#search-input").val());
                });
                i++;
            }
        });
}

// Genererer et falsk personnummer, stjålet fra Nicolai
function generatePnummer() {
    let randomPersonNr;
    // Lager personnummer og sjekker om det er legitimt.
    do {
        randomPersonNr = generateRandomPersonNr();
    } while (!validatePersonNr(randomPersonNr));
    return randomPersonNr;
}

// Også stjålet fra Nicolai, og er det som faktisk lager personnummeret.
function generateRandomPersonNr() {
    const randomYear = String(Math.floor(Math.random() * 100)).padStart(2, '0');
    const randomMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0'); // Random month (01-12)
    const randomDay = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0'); // Random day (01-28)
    const randomNumbers = String(Math.floor(Math.random() * 90000) + 10000); // Ensure 5 digits
    return `${randomDay}${randomMonth}${randomYear}${randomNumbers}`;
}

// Brukes for å validere om ett personnummer er legitimt, stjålet fra Nicolai
function validatePersonNr(personNr) {
    // Sjekk at personnummeret er 11 tegn
    if (personNr.length !== 11) {
        return false;
    }

    // Hent ut individnummeret (de siste fem sifrene)
    const individualNumber = personNr.substring(6, 11);

    // Sjekk om individnummeret er gyldig (mellom 00001 og 99999)
    const individualNumberInt = parseInt(individualNumber, 10);
    if (isNaN(individualNumberInt) || individualNumberInt < 1 || individualNumberInt > 99999) {
        return false;
    }

    // Sjekk om datoformatet er gyldig
    const day = parseInt(personNr.substring(0, 2), 10);
    const month = parseInt(personNr.substring(2, 4), 10);
    let year = parseInt(personNr.substring(4, 6), 10);

    // Legg til 1900 hvis årstallet er mindre enn 30 (for eksempel 20 blir til 2020)
    year += year < 30 ? 2000 : (year < 100 ? 1900 : (year >= 100 && year < 130 ? 1800 : 0));

    // Sjekk om fødselsdatoen er gyldig
    if (
        isNaN(day) || isNaN(month) || isNaN(year) ||
        day < 1 || day > 31 ||
        month < 1 || month > 12 ||
        (year < 0 || (year >= 30 && year <= 99))
    ) {
        return false;
    }

    // Sjekk kontrollsifrene
    const k1 = parseInt(personNr.charAt(9), 10);
    const k2 = parseInt(personNr.charAt(10), 10);

    const weights = [3, 7, 6, 1, 8, 9, 4, 5, 2];

    const checksum = weights.reduce((sum, weight, index) => {
        return sum + weight * parseInt(personNr.charAt(index), 10);
    }, 0);

    const remainder = checksum % 11;
    const expectedCheckDigit = remainder === 0 ? 0 : 11 - remainder;

    return k1 === expectedCheckDigit && k2 === (k1 === 10 ? 0 : k2 === 10 ? 0 : k2);
}

// Genererer falske plate nummer, også stjålet fra Nicolai
function generateRandomCarPlate() {
    const numbers = '0123456789';

    // Velger tilfeldig by og bokstavkode fra listen
    const randomCityEntry = byerOgBokstavkoder[Math.floor(Math.random() * byerOgBokstavkoder.length)];
    const randomLetterCode = randomCityEntry.bokstavkoder[Math.floor(Math.random() * randomCityEntry.bokstavkoder.length)];

    // Setter opp to identiske bokstaver basert på valgt by og bokstavkode
    const randomLetters = randomLetterCode.repeat(1);

    // Genererer tilfeldige tall
    const randomNumbers = Array.from({length: 5}, () => numbers[Math.floor(Math.random() * numbers.length)]).join('');

    // Setter sammen og returnerer bilskiltet
    return `${randomLetters}${randomNumbers}`;
}

// Liste over hvilke bokstaver som tilhører de forskjellige byene. Stjålet fra Nicolai
const byerOgBokstavkoder = [
    {by: "Halden", bokstavkoder: ["aa", "ab", "ac"]},
    {by: "Hafslund", bokstavkoder: ["ad", "ae", "af", "ah", "ar", "as", "at", "au", "av", "aw", "dw", "fl", "es"]},
    {by: "Fredrikstad", bokstavkoder: ["ar", "as", "at", "au", "av", "aw", "dw", "fl", "es"]},
    {by: "Mysen", bokstavkoder: ["aj", "ak", "al", "an", "ap", "bw"]},
    {by: "Moss", bokstavkoder: ["ax", "ay", "az", "ba", "fn"]},
    {by: "Follo", bokstavkoder: ["bc", "bd", "be", "bf", "bh", "bj", "bk"]},
    {by: "Asker og Bærum", bokstavkoder: ["bl", "bn", "bp", "br", "bs", "bt", "bu", "bv", "bx", "by", "bz", "ca", "cb"]},
    {by: "Lillestrøm", bokstavkoder: ["cc", "ce", "cf", "ch", "cj", "ck", "cl", "cn", "cp", "cr", "cs", "ct", "cu"]},
    {by: "Jessheim", bokstavkoder: ["cv", "cx", "cy", "cz"]},
    {by: "Hønefoss", bokstavkoder: ["ju", "jv", "jx", "jy", "jz", "ka"]},
    {by: "Gol", bokstavkoder: ["kb", "kc", "kd"]},
    {by: "Drammen", bokstavkoder: ["ke", "kf", "kh", "kj", "kk", "kl", "kn", "kp", "kr", "ks"]},
    {by: "Kongsberg", bokstavkoder: ["kt", "ku", "kv", "kx", "ky"]},
    {by: "Oslo", bokstavkoder: ["da", "db", "dc", "dd", "de", "df", "dh", "dj", "dk", "dl", "dn", "dp", "dr", "ds", "dt", "du", "dv", "dx", "dy", "dz", "ea", "ef", "eh", "ej", "en", "ep", "er", "es", "et", "eu"]},
    {by: "Hamar", bokstavkoder: ["fs", "ft", "fu", "fv", "fx", "fy", "fz", "et"]},
    {by: "Elverum", bokstavkoder: ["hb", "hc", "hd", "he", "ha"]},
    {by: "Tynset", bokstavkoder: ["hf", "hh"]},
    {by: "Kongsvinger", bokstavkoder: ["hj", "hk", "hl", "hn", "hp", "hr"]},
    {by: "Lillehammer", bokstavkoder: ["hs", "ht", "hu", "hv", "hx", "fb"]},
    {by: "Otta", bokstavkoder: ["hz", "ja", "jb"]},
    {by: "Gjøvik", bokstavkoder: ["jc", "jd", "je", "jf", "jh", "jj", "jk", "jl", "jn", "jp", "kw"]},
    {by: "Fagernes", bokstavkoder: ["jr", "js", "jt"]},
    {by: "Horten", bokstavkoder: ["kz", "la", "lb", "lc", "ld"]},
    {by: "Tønsberg", bokstavkoder: ["lh", "lj", "lk", "ll", "ln", "lp", "lr", "ld"]},
    {by: "Larvik", bokstavkoder: ["ls", "lt", "lu", "lv", "lx"]},
    {by: "Sandefjord", bokstavkoder: ["ly", "na", "nb", "nc"]},
    {by: "Skien", bokstavkoder: ["nd", "ne", "nf", "nh", "nj", "nk", "nl", "nn", "np", "nr", "nt", "nu"]},
    {by: "Porsgrunn", bokstavkoder: ["nn", "nu"]},
    {by: "Notodden", bokstavkoder: ["nv", "nx", "ny", "nz"]},
    {by: "Rjukan", bokstavkoder: ["pa", "pb"]},
    {by: "Arendal", bokstavkoder: ["pc", "pd", "pe", "pf", "ph", "pj", "pk"]},
    {by: "Setesdal", bokstavkoder: ["pl", "lf"]},
    {by: "Kristiansand", bokstavkoder: ["pn", "pp", "pr", "ps", "pt", "pu", "pv", "pw"]},
    {by: "Mandal", bokstavkoder: ["px", "py", "pz", "rc", "rd"]},
    {by: "Flekkefjord", bokstavkoder: ["ra", "rb"]},
    {by: "Stavanger", bokstavkoder: ["re", "rf", "rh", "rj", "rk", "rl", "rn", "rp", "rr", "rs", "rt", "ru", "rv", "rx", "ry", "rw"]},
    {by: "Egersund", bokstavkoder: ["rz", "sa", "sb"]},
    {by: "Haugesund", bokstavkoder: ["sc", "sd", "se", "sf", "sh", "sj", "sk", "sl"]},
    {by: "Bergen", bokstavkoder: ["sn", "sp", "sr", "ss", "st", "su", "sv", "sx", "sy", "sz", "ta", "tb", "tc", "td", "te", "hw"]},
    {by: "Voss", bokstavkoder: ["tf", "th", "tj", "tk"]},
    {by: "Stord", bokstavkoder: ["tl", "tn", "tp", "tr"]},
    {by: "Odda", bokstavkoder: ["ts", "tt", "tu"]},
    {by: "Førde", bokstavkoder: ["tv", "tx", "ty", "tz"]},
    {by: "Nordfjordeid", bokstavkoder: ["ua", "ub"]},
    {by: "Sogndal", bokstavkoder: ["uc", "ud"]},
    {by: "Ålesund", bokstavkoder: ["ue", "uf", "uh", "uj", "uk", "ul", "ug"]},
    {by: "Ørsta", bokstavkoder: ["un", "up", "bb"]},
    {by: "Molde", bokstavkoder: ["ur", "us", "ut", "uu", "uv"]},
    {by: "Kristiansund", bokstavkoder: ["ux", "uy", "uz", "va"]},
    {by: "Sunndalsøra", bokstavkoder: ["vb", "vc"]}
];
