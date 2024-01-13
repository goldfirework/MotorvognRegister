# Enkelt motorvognregister
En enkel administrasjons nettside for registrering og visning av motorvogner. <br>
Laget for enklere lagring av registrerte motorvogner, prøver å gjøre det mer effektivt enn tradisjonelle pen på papir måter.
<br>

## Hvordan
### Generelt
Nettsiden er laget med enkel HTML, CSS og JavaScript, men tar også ibruk Java for lagring av motorvognene.
<br>
Motorvognene lagres i en Hashmap for enklere filtrering via søk og enkeltslettinger.
### Regler
#### Personnummer
Jeg tok i bruk regler for innskriving av personnummer, du kan lese mer om de diverse reglene for personnummer på <a href="https://no.wikipedia.org/wiki/F%C3%B8dselsnummer">Wikipedia</a> eller på <a href="https://www.skatteetaten.no/person/folkeregister/identitetsnummer/fodselsnummer/">Skatteetaten</a>
#### Kjennetegnet
I tillegg passer jeg på at skiltet som innskrives er 7 lang, selv om jeg er klar over at visse bilskilt i Norge er kortere enn det, i det tilfelle kan du fylle ut sifrene forran med 0.
### Falske registreringer
Jeg lagde en funksjon for automatisk registrering av falske brukere, men valgte å ikke legge til en knapp fordi den ikke var så stabil som jeg ønsket.
<br>
Den er stabil nok til å brukes, men du må gjøre det via konsollen, for å bruke den åpner du konsollen og skriver inn addFakes([tall]) hvor du erstatter [tall] med ett tall.
Funksjonen begynner å bli ustabil rundt 1000, og går tom for navn etter 15000. Du kan kjøre kommandoen flere ganger for å få flere enn det, men da får du samme navn flere ganger.
Ved store menger kan det ta tid før den oppdaterer.
<br>
Kommandoen passer også på at personnummerne er legitime.

## Todo
Planen var engentlig og kopiere Nicolai sin api for søk av adresse, men jeg brukte ikke nok tid til å få tid til dette.
<br>
I tillegg hadde jeg tenkt til å koble opp Vegvesenet sin api for autofill ved innskriving av regnr, men dette valgte jeg å ikke gjøre fordi det da bare blir en utvidelse av deres register.
<br>
Jeg ønsker også legge til at den finner hvor i landet den er registrert til basert på første bokstavene på skiltet, men dette hadde jeg heller ikke tid til.

## Credits
Noe av koden er <i>inspirert</i> av <a href="google.com">Nicolai</a>, jeg har lagt til en kommentar i koden hvor det står hva jeg har kopiert.

# Brukertesting
Alle brukerene fikk nettsiden med 100 falske registreringer. I tillegg til en tilfeldig plassert registrering med navnet Eirik og Bilmerke Volvo
### Oppgaver til brukeren
1. Gå til nettsiden, hva ser du?
2. Klarer du registrere en falsk bruker?
3. Finn så brukeren du registrerte i registeret. Hvor på listen havnet du?
4. Hvordan finner du Volvoen til Eirik?
5. Dersom du feilregistrerer en bruker, hvordan retter du feilen? Test på brukeren du registrerte tidligere.
### Tilbakemeldingsspørsmål
1. Hva syntes du om nettsiden?
2. Hvordan var det å bruke nettsiden?
3. Var nettsiden rask nok?
4. Er det noen innstillinger du ønsker deg?
5. Hva kan forberedes?
## Svar
### Bruker 1
Bruker 1 er en dame i 40-årene. Hun har lite kunnskap om teknologi, og har ikke brukt mye digitale registreringsløsninger utenom rolle som bruker.
#### Oppgaver til brukeren
1. Jeg ser mange steder og skrive inn tekst, skroller jeg litt ned ser jeg diverse navn og dataer.
2. Ja, fikk først tilbakemelding om at personnummeret jeg skrev inn ikke var legitimt, når jeg skrev mitt eget funket det.
3. Den havnet nederst på listen.
4. Jeg bruker søkefeltet. Listen oppdateres med en gang.
5. Dette fikk jeg ikke til. Turte ikke slette brukeren.
#### Tilbakemeldingsspørsmål
1. Den var fin, oversiktlig.
2. Den var lett å bruke, kunne vært flere sider isteden for en lang liste.
3. Den var rask ja.
4. Ikke egentlig, kunne filtrert etter kjønn kanskje?
5. Det kan være flere sider. Legge til redigeringsknapp?
### Bruker 2
Bruker 2 er en mann i 50-årene med moderat teknologikunnskap og erfaring med digitale registreringsløsninger.

#### Oppgaver til brukeren
1. Ser en enkel og ryddig nettside. Oversiktlig med registreringsfelt og en liste med navn og data ved sidenav.
2. Ja, registrerte en falsk bruker uten problemer.
3. Fant brukeren jeg registrerte omtrent nederst på listen.
4. Brukte søkefeltet for å finne Volvoen til Eirik. Opplevde ingen problemer med dette. 
5. Feilregistrerte med vilje og rettet opp ved å slette den aktuelle brukeren og legge den til med riktig informasjon.

#### Tilbakemeldingsspørsmål
1. Nettsiden var grei, enkel å navigere.
2. Brukervennligheten var god, ingen store utfordringer.
3. Ja, nettsiden var rask nok.
4. Kanskje legge til et filter for aldersgrupper i tillegg til kjønn.
5. Muligens en kort guide eller hjelpeseksjon for å slette eller redigere registreringer. Fant ingen redigeringsknapp.

### Bruker 3
Bruker 3 er en gutt på 17 år med god teknologikunnskap og erfaring med ulike digitale plattformer.

#### Oppgaver til brukeren
1. Nettsiden ser moderne og enkel ut. Registreringsfeltet er tydelig, og listen med navn og data er synlig nedenfor.
2. Registrerte en falsk bruker uten problemer, kjente igjen vanlige registreringsfelt.
3. Fant brukeren jeg registrerte på bunnen av lista.
4. Brukte søkefeltet raskt for å finne Volvoen til Eirik. Var intuitivt.
5. Kunne ikke redigere, måtte slette for å legge til igjen. Kunne også legge til duplikate registreringer.

#### Tilbakemeldingsspørsmål
1. Nettsiden var moderne og tiltalende.
2. Brukervennligheten var høy, enkel å forstå.
3. Rask nok for min del, ingen problemer.
4. Ingen spesifikke innstillinger ønsket.
5. Nettsiden virker solid, kanskje en veiledning for nye brukere.
