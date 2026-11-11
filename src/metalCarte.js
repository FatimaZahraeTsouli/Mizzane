
class metalCarte extends HTMLElement {
    constructor() {
        super ();

        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./assets/tailwind.css">
        <section class="flex gap-6 mx-10">
            <article class="w-150 h-100 border border-black rounded-2xl">
                <div class="flex bg-blue-950 gap-4 border rounded-t-2xl h-20 justify-evenly ">
                    <h1 class="text-white text-2xl font-serif py-5 px-5">Prix du jour</h1>
                    <p class="text-white font-mono py-7" id="time"> time </p>
                </div>

                <div class="flex justify-center ">
                    <div class="grid grid-cols-1 gap-2">
                    <h1 class="text-5xl font-serif mt-15 text-center" id="nomMetal"></h1>
                    <img class=" rounded-full w-40 h-40 " id="image" src="" alt="metal">
                    </div>
                    <div class="grid">
                    <div class="flex justify-center mx-5">
                        <p id="montant" class="font-bold text-4xl mt-10"></p>&emsp;
                        <p class="text-xl font-semibold mt-12">
                            <span id="deviseMetal"></span>
                            /
                            <span id="uniteMetal"></span>
                        </p>
                    </div>
                        <p id="variation" class="font-bold text-4xl ml-30"></p>
                        <p id="percentage" class="font-bold text-4xl ml-30"></p>
                    </div> 
                </div>
            </article>
            </section>
        `;
    }
        connectedCallback() {
        const metal = this.getAttribute("metal");
        // console.log(metal);
    }
}
customElements.define("metal-card", metalCarte);
export default metalCarte;

