import "./metalCarte.js";

const cartes = document.querySelectorAll("metal-card");
const actualiser = document.getElementById("Actualiser");
const erreur = document.getElementById("erreur");
const messageAttente = document.getElementById("message d'attente");
const temps = document.getElementById("temps");

// CHARGER DATA DE L'API

async function chargerhistorique(symbol){
    const response = await fetch(`https://xaus.com/api/v1/chart?symbol=${symbol}&range=1d&interval=5m`);
    const historique = await response.json();
    const prixPrecedent = historique.points[0].c;
    const prixActuelle = historique.points[historique.points.length - 1].c;
    const variation = (prixActuelle - prixPrecedent) / 31.1035;
    const percentage = variation / prixPrecedent * 100;
    return {
        variation, percentage
    }
}
console.log(chargerhistorique("silver"));



async function chargerprix(){
    try {
        const reponse = await fetch("https://xaus.com/api/v1/spot?unit=gram");

        if (!reponse.ok){
            throw new Error("Erreur lors de la récupération des prix!!")
        }
        const data = await reponse.json();
        console.log(data.xau);
        console.log(data); 
        console.log(Object.keys(data));

        cartes.forEach(carte => {
            const metal = carte.getAttribute("metal");
            console.log(metal);
            const nomMetal = carte.shadowRoot.getElementById("nomMetal");
            const montant = carte.shadowRoot.getElementById("montant");
            const deviseMetal = carte.shadowRoot.getElementById("deviseMetal");
            const uniteMetal = carte.shadowRoot.getElementById("uniteMetal"); 
            const image = carte.shadowRoot.getElementById("image");
            const variation = carte.shadowRoot.getElementById("variation");
            const percentage = carte.shadowRoot.getElementById("percentage");
            const time = carte.shadowRoot.getElementById("time")
            temps.textContent = data.price_as_of;
            if (metal === "xau"){
                time.textContent = data.price_as_of;
                nomMetal.textContent = "Or";
                montant.textContent = data.xau.price;
                deviseMetal.textContent = data.xau.currency;
                uniteMetal.textContent = data.xau.unit;
                image.src = "./assets/images/gold.jpg";
                chargerhistorique("xau").then(resultat => {
                variation.textContent = resultat.variation.toFixed(4);
                percentage.textContent = resultat.percentage.toFixed(2) + "%";
                if (resultat.variation > 0){
                    variation.classList.add("bg-green-600");
                    variation.textContent = "↑ " + variation.textContent;
                }
                else if (resultat.variation < 0){
                    variation.classList.add("text-red-600");
                    variation.textContent = "↓ " + variation.textContent;
                }
                else if (resultat.variation == 0){
                    variation.classList.add("text-gray-500");
                }
                });
                // percentage.textContent = 
                erreur.classList.add("hidden");
            }
            else if(metal === "xag"){
                time.textContent = data.price_as_of;
                nomMetal.textContent = "Argent";
                montant.textContent = (data.silver_usd_oz / 31.1035).toFixed(4);
                deviseMetal.textContent = "USD";
                uniteMetal.textContent = "gram";
                image.src = "./assets/images/silver%20.webp";
                chargerhistorique("silver").then(resultat => {
                variation.textContent = resultat.variation.toFixed(4);
                percentage.textContent = resultat.percentage.toFixed(2) + "%";
                if (resultat.variation > 0){
                    variation.classList.add("bg-green-600");
                    variation.textContent = "↑ " + variation.textContent;
                }
                else if (resultat.variation < 0){
                    variation.classList.add("text-red-600");
                    variation.textContent = "↓ " + variation.textContent;
                }
                else if (resultat.variation == 0){
                    variation.classList.add("text-gray-500");
                }
                });
                erreur.classList.add("hidden");
            }
        })
    } catch (error) {
        console.error(error);
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
});




// Créer la structure HTML d'une carte.














// Parcourir le tableau JSON et générer les cartes dynamiquement.
// Calculer la variation en valeur et en pourcentage.
// Afficher la bonne flèche et la bonne couleur selon le résultat.

