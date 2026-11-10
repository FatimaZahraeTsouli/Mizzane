const or = document.getElementById("or");
const argent = document.getElementById("argent");
const poids = document.getElementById("poids");
const Calculer = document.getElementById("Calculer");
const montant = document.getElementById("montant");
const time = document.querySelectorAll(".time");
const statut = document.getElementById("Statut");

async function chargerprix(){
    const reponse = await fetch("https://xaus.com/api/v1/spot");
    const data = await reponse.json();
    or.textContent = data.xau.price;
    argent.textContent = data.silver_usd_oz;
    time.forEach(element=>{
        element.textContent = data.price_as_of;
    })
}
chargerprix();
