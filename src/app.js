import "./metalCarte.js";

const cartes = document.querySelectorAll("metal-card");
const actualiser = document.getElementById("Actualiser");
const erreur = document.getElementById("erreur");
const messageAttente = document.getElementById("message d'attente");
const temps = document.getElementById("temps");
const choixDevise = document.getElementById("choixdevise");
const poids = document.getElementById("poids");
const metauxCalcul = document.getElementById("metauxCalcul");
const Calculer = document.getElementById("Calculer");
const montantBijoux = document.getElementById("montantBijoux");
const messageestimation = document.getElementById("messageestimation");
const status = document.getElementById("status");
const statusAPP = document.getElementById("statusAPP");
const statuserreur = document.getElementById("statuserreur");
const historiqueMetal = document.getElementById("historiqueMetal");
const periode = document.getElementById("periode");
const graphiqueHistorique = document.getElementById("graphiqueHistorique");


// choix de devises 

choixDevise.addEventListener("change", function() {
    chargerprix();
});


// APPORTER DATA OR DE L'API

async function chargerhistoriqueOr(){
    const response = await fetch(`https://xaus.com/api/v1/chart?symbol=xau&range=1mo&interval=1d`);
    if (!response.ok) {
        throw new Error("Erreur HTTP : " + response.status);
    }
    const historique = await response.json();
    if (!historique.points || historique.points.length < 2) {
    throw new Error("Données historiques insuffisantes");
    }
    const prixPrecedentOr = historique.points[0].c;
    const prixActuelleOr = historique.points[historique.points.length - 1].c;
    const variationOr = ( prixActuelleOr - prixPrecedentOr ) / 31.1035;
    const percentageOr = ((prixActuelleOr - prixPrecedentOr) / prixPrecedentOr) * 100;
    return {
        variationOr,
        percentageOr,
        points: historique.points
    }
}

// APPORTER DATA ARGENT DE L'API

async function chargerhistoriqueArgent(){
    const responseArgent = await fetch(`https://xaus.com/api/v1/chart?symbol=silver&range=1mo&interval=1d`);
    if (!responseArgent.ok) {
        throw new Error("Erreur HTTP : " + responseArgent.status);
    }
    const historiqueArgent = await responseArgent.json();
    if (!historiqueArgent.points || historiqueArgent.points.length < 2) {
    throw new Error("Données historiques insuffisantes");
    }
    const prixPrecedentArgent = historiqueArgent.points[0].c;
    const prixActuelleArgent = historiqueArgent.points[historiqueArgent.points.length - 1].c;
    const variationArgent = ( prixActuelleArgent - prixPrecedentArgent ) / 31.1035;
    const percentageArgent = ((prixActuelleArgent - prixPrecedentArgent) / prixPrecedentArgent) * 100;
    return {
        variationArgent,
        percentageArgent,
        points: historiqueArgent.points
    }
}


// charger les infos 

async function chargerprix(){
    statusAPP.textContent = "chargement de données";
    statuserreur.textContent = "";
    try {
        const reponse = await fetch("https://xaus.com/api/v1/spot?unit=gram");

        if (!reponse.ok){
            throw new Error("Erreur lors de la récupération des prix!!")
        }
        const data = await reponse.json();

        cartes.forEach(async carte => {
            const metal = carte.getAttribute("metal");
            const nomMetal = carte.shadowRoot.getElementById("nomMetal");
            let montant = carte.shadowRoot.getElementById("montant");
            let deviseMetal = carte.shadowRoot.getElementById("deviseMetal");
            const uniteMetal = carte.shadowRoot.getElementById("uniteMetal"); 
            const image = carte.shadowRoot.getElementById("image");
            const variation = carte.shadowRoot.getElementById("variation");
            const percentage = carte.shadowRoot.getElementById("percentage");
            const time = carte.shadowRoot.getElementById("time")
            temps.textContent = data.price_as_of;
            if (metal === "xau"){
                time.textContent = data.price_as_of;
                nomMetal.textContent = "Or";
                if(choixDevise.value === "USD"){
                    const deviseA = await fetch (`https://xaus.com/api/v1/spot?currency=USD&unit=gram`);
                    const DeviseA = await deviseA.json();
                    montant.textContent = DeviseA.xau.price.toFixed(4);
                    deviseMetal.textContent = choixDevise.value;
                }
                else if (choixDevise.value === "EUR"){
                    const deviseE = await fetch(`https://xaus.com/api/v1/spot?currency=EUR&unit=gram`);
                    const DeviseE = await deviseE.json();
                    montant.textContent = DeviseE.xau.price.toFixed(4);
                    deviseMetal.textContent = choixDevise.value;
                }    
                else if (choixDevise.value === "MAD"){
                    const deviseM = await fetch (`https://xaus.com/api/v1/spot?currency=MAD&unit=gram`);
                    const DeviseM = await deviseM.json();
                    montant.textContent = DeviseM.xau.price.toFixed(4);
                    deviseMetal.textContent = choixDevise.value;
                }
                uniteMetal.textContent = data.xau.unit;
                image.src = "./assets/images/gold.jpg";
                chargerhistoriqueOr().then(resultat => {
                variation.textContent = resultat.variationOr.toFixed(4);
                percentage.textContent = resultat.percentageOr.toFixed(2) + "%";
                console.log(resultat.variationOr);
                console.log(resultat.percentageOr);
                if (resultat.variationOr > 0){
                    variation.classList.add("text-green-500");
                    variation.textContent = "↑ " + variation.textContent;
                }
                else if (resultat.variationOr < 0){
                    variation.classList.add("text-red-600");
                    variation.textContent = "↓ " + variation.textContent;
                }
                else if (resultat.variationOr == 0){
                    variation.classList.add("text-gray-500");
                }
                });
                erreur.classList.add("hidden");
            }
            else if(metal === "xag"){
                time.textContent = data.price_as_of;
                nomMetal.textContent = "Argent";
                if(choixDevise.value === "USD"){
                    const deviseA = await fetch (`https://xaus.com/api/v1/spot?currency=USD&unit=gram`);
                    const DeviseA = await deviseA.json();
                    montant.textContent = (DeviseA.silver_usd_oz / 31.1035).toFixed(4);
                    deviseMetal.textContent = choixDevise.value;
                }
                else if (choixDevise.value === "EUR"){
                    const deviseE = await fetch(`https://xaus.com/api/v1/spot?currency=EUR&unit=gram`);
                    const DeviseE = await deviseE.json();
                    montant.textContent = ((DeviseE.silver_usd_oz / 31.1035) / DeviseE.fx_rates.EUR).toFixed(4);
                    deviseMetal.textContent = choixDevise.value;
                }    
                else if (choixDevise.value === "MAD"){
                    const deviseM = await fetch (`https://xaus.com/api/v1/spot?currency=MAD&unit=gram`);
                    const DeviseM = await deviseM.json();
                    montant.textContent = ((DeviseM.silver_usd_oz / 31.1035) * DeviseM.fx_rate).toFixed(4);
                    deviseMetal.textContent = choixDevise.value;
                }
                uniteMetal.textContent = "gram";
                image.src = "./assets/images/silver%20.webp";
                chargerhistoriqueArgent().then(resultat => {
                variation.textContent = resultat.variationArgent.toFixed(4);
                percentage.textContent = resultat.percentageArgent.toFixed(2) + "%";
                if (resultat.variationArgent > 0){
                    variation.classList.add("text-green-600");
                    variation.textContent = "↑ " + variation.textContent;
                }
                else if (resultat.variationArgent < 0){
                    variation.classList.add("text-red-600");
                    variation.textContent = "↓ " + variation.textContent;
                }
                else if (resultat.variationArgent == 0){
                    variation.classList.add("text-gray-500");
                }
                });
                erreur.classList.add("hidden");
            }
        });

        statusAPP.textContent = "Application disponible";
        statuserreur.textContent = "Chargé avec succés";
    } catch (error) {
        statusAPP.textContent = "Impossible de charger";
        statuserreur.textContent = "Échec de chargement";
        erreur.textContent = "Impossible de récupérer les prix. Veuillez réessayer!!";
        erreur.classList.remove("hidden");
    }
}
chargerprix();


// BUTTON ACTUALISER 

let dernierActualisation = Date.now();
chargerprix();
actualiser.addEventListener("click", function(){
    if(Date.now() - dernierActualisation < 60000){
        messageAttente.classList.remove("hidden");
        messageAttente.textContent = "veuillez patientez au moins 60 sec avant d'actualiser la page!";
        return;
    }
    dernierActualisation = Date.now();
    chargerprix();
    messageAttente.classList.add("hidden");
});


// calculer estimation 

function calculerEstimation(prix, poids){
    return prix * poids;
}

let prixEstimateurMAD;
async function chargerPrixEstimateur() {
    const reponse = await fetch("https://xaus.com/api/v1/spot?currency=MAD&unit=gram");
    prixEstimateurMAD = await reponse.json();
}

// chargerPrixEstimateur;
chargerPrixEstimateur().then(function(){
});
Calculer.addEventListener("click", async function(){
    await chargerPrixEstimateur();
    let resultat;
    console.log("Métal sélectionné :", metauxCalcul.value);
    if(poids.value == ""){
        messageestimation.textContent = "Veuillez entrez un poids valide!!";
        messageestimation.classList.remove("hidden");
        messageestimation.classList.add("text-red-500", "font-semibold");
        montantBijoux.textContent = "------" 
        return;
    }
    else if (poids.value < 0){
        messageestimation.textContent = "Veuillez entrez un poids valide!!";
        messageestimation.classList.remove("hidden");
        messageestimation.classList.add("text-red-500", "font-semibold");
        montantBijoux.textContent = "------" 
        return;
    }
    else if (metauxCalcul.value === "Or"){
    resultat = calculerEstimation(prixEstimateurMAD.xau.price, Number(poids.value));
    }
    else if (metauxCalcul.value === "Argent"){
    resultat = calculerEstimation(((prixEstimateurMAD.silver_usd_oz / 31.1035) * prixEstimateurMAD.fx_rate),Number(poids.value));
    }
    montantBijoux.textContent = resultat;
    messageestimation.classList.add("hidden");

})


// STATUS EN/HORS LIGHNE 

function verifierconnexion(){
    if (navigator.onLine){
        status.textContent = "En ligne";
        status.classList.remove("text-red-600");
        status.classList.add("text-green-600", "font-semibold")
    }
    else {
        statusAPP.textContent = "Application indisponible";
        statuserreur.textContent = "veuillez vérifier votre connexion!!";
        status.textContent = "Hors ligne";
        status.classList.add("text-red-600", "font-semibold")
    }
}
window.addEventListener("online", verifierconnexion);
window.addEventListener("offline", verifierconnexion);
verifierconnexion();


// ERREUR DETECTES 

async function chartgraphique(points){
    graphiqueHistorique.innerHTML = "";
    graphiqueHistorique.classList.add("overflow-x-auto");
    graphiqueHistorique.style.width = "100%";
graphiqueHistorique.style.maxWidth = "100%";
    if (!points || points.length === 0){
        graphiqueHistorique.textContent = "Données indisponible!!";
        return;
    }
    const prices = points.map(point => point.c);
    const prixMaximum = Math.max(...prices);
    const prixMinimum = Math.min(...prices);
    const hauteurs = prices.map(p => prixMaximum === prixMinimum ? 50 : ((p - prixMinimum) / (prixMaximum - prixMinimum)) * 100);
    const container = document.createElement("div");
        container.className = "flex items-end gap-2 h-64 w-max";
        container.style.minWidth = "100%";
        container.style.columnGap = "20px";
        container.style.width = "max-content";
        graphiqueHistorique.appendChild(container);
        points.forEach((point, index) =>{
        const barre = document.createElement("div");
        barre.style.height = `${Math.max(hauteurs[index] * 2, 5)}px`;
        barre.style.width = "24px";
        barre.style.backgroundColor = "red";
        barre.style.border = "2px solid black"; 
        const date = new Date(point.t * 1000);
        const jour = document.createElement("span");
        jour.className = "text-[10px] leading-4 mt-1";
        jour.textContent = date.toLocaleDateString("fr-FR", {day: "2-digit",month: "2-digit"});
        const colonne = document.createElement("div");
        colonne.style.minHeight = "0";
        colonne.className = "flex flex-col items-center justify-end h-full shrink-0";
        colonne.style.width = "40px";
        colonne.appendChild(barre);
        colonne.appendChild(jour);
        container.appendChild(colonne);
        console.log("Container:", container.getBoundingClientRect());
        console.log("Barre:", barre.getBoundingClientRect());
    })
}


async function afficherchart(){
    const metal = historiqueMetal.value;
    const nombreJours = periode.value === "semaine" ? 7 : 30;
    const dateFin = new Date();
    const dateDebut = new Date(dateFin);
    dateDebut.setDate(dateDebut.getDate() - nombreJours);
    let resultat;
    if (metal === "Or"){
        resultat = await chargerhistoriqueOr();
    }
    else if (metal === "Argent"){
        resultat = await chargerhistoriqueArgent();
    }
    if (!resultat || !resultat.points) {
    chartgraphique([]);
    return;
    }
    const pointsFiltres = resultat.points.filter(point => {
    const datePoint = new Date(point.t * 1000);
    return datePoint >= dateDebut && datePoint <= dateFin;
    });
    chartgraphique(pointsFiltres);
}
historiqueMetal.addEventListener("change", afficherchart);
periode.addEventListener("change", afficherchart);
afficherchart();

















