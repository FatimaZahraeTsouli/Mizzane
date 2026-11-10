const or = document.getElementById("or");
const argent = document.getElementById("argent");
const poids = document.getElementById("poids");
const Calculer = document.getElementById("Calculer");
const montant = document.getElementById("montant");
const time = document.querySelectorAll(".time");
const statut = document.getElementById("Statut");
const unitéOr = document.getElementById("uniteOr");
const deviseOr = document.getElementById("deviseOr");
const unitéArgent = document.getElementById("uniteArgent");
const deviseArgent = document.getElementById("deviseArgent");
const actualiser = document.getElementById("Actualiser");
const erreur = document.getElementById("erreur");
const messageAttente = document.getElementById("message d'attente");

// CHARGER DATA DE L'API

async function chargerprix(){
    try {
        const reponse = await fetch("https://xaus.com/api/v1/spot");

        if (!reponse.ok){
            throw new Error("Erreur lors de la récupération des prix!!")
        }
        const data = await reponse.json();
        or.textContent = data.xau.price;
        argent.textContent = data.silver_usd_oz;
        time.forEach(element=>{
            element.textContent = data.price_as_of;
        })
        deviseOr.textContent = data.xau.currency;
        unitéOr.textContent = data.xau.unit;
        deviseArgent.textContent = "USD";
        unitéArgent.textContent = "oz";
        erreur.classList.add("hidden");
    
        console.log(data);   
    } catch (error) {
        erreur.textContent = "Impossible de récupérer les prix. Veuillez réessayer!!";
        erreur.classList.remove("hidden");

        
    }
}
chargerprix();


// BUTTON ACTUALISER 

let dernierActuaisation = Date.now();
chargerprix();
actualiser.addEventListener("click", function(){
    if(Date.now() - dernierActuaisation < 60000){
        messageAttente.classList.remove("hidden");
        messageAttente.textContent = "veillez patientez au moins 60 sec avant d'actualiser la page!";
        return;
    }
    dernierActuaisation = Date.now();
    messageAttente.classList.add("hidden");
    chargerprix();
})
