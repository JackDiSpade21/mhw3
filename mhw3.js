const musica = document.querySelector("#Musica");
const festival = document.querySelector("#Festival");
const arte = document.querySelector("#Arte");
const sport = document.querySelector("#Sport");
const tempo = document.querySelector("#Tempo");
const altro = document.querySelector("#Altro");

const otherMusic = document.querySelector("#other-music");
const otherFestival = document.querySelector("#other-festival");
const otherArte = document.querySelector("#other-art");
const otherSport = document.querySelector("#other-sport");
const otherTempo = document.querySelector("#other-tempo");

const mobileMenuButton = document.querySelector("#mobile-menu");
mobileMenuButton.addEventListener("click", openMobileMenu);
const closeButton = document.querySelector("#close-button");
closeButton.addEventListener("click", closeMobileMenu);
const mobileMenu = document.querySelector("#mobile-menu-nav");

const navButtons = [musica, festival, arte, sport, tempo, altro];
const otherButtons = [otherMusic, otherFestival, otherArte, otherSport, otherTempo];

for(let i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener("click", openModalNav);
}

for(let i = 0; i < otherButtons.length; i++) {
    otherButtons[i].addEventListener("click", changeOtherNav);
}

const modal = document.querySelector("#modal-nav-desktop");
document.addEventListener("click", closeModalNav);

const wrapper = document.querySelector("#nav-box-wrapper");
const navSidebar = document.querySelector("#nav-sidebar");

const navBox = document.createElement("div");
navBox.classList.add("nav-box");
const discoverMore = document.createElement("h2");

const footerElement = document.querySelectorAll(".elenco");
for(let i = 0; i < footerElement.length; i++){
    footerElement[i].addEventListener("click", toggleFooterSection);
}
const footerSection = document.querySelectorAll(".mobilelist");

const MODAL_MUSICA = [
    "Alternative/Indie Rock", "Canto Corale", "Chanson", "Concerti", "Concerto di Natale", "Dance Band",
    "Dance Elettronica", "Flamenco/ Rumba", "Folk/ Country", "Hard Rock/Metal", "Hip-hop/ R&B", "Italiano",
    "Jazz/Blues", "Musica classica", "Musica contemporanea per adulti", "Musica religiosa", "Musica tradizionale", "Progressive Rock",
    "Reggae", "Rock/Pop", "Soul", "World Music", "Altri - Musica", "Tutti Musica ➔"
];

const MODAL_FESTIVAL = [
    "Festival Blues", "Festival culturali", "Festival Dance Elettronica", "Festival del cinema",
    "Festival di arte/cultura", "Festival di comicità", "Festival di musica classica", "Festival di teatro",
    "Festival Jazz", "Festival musicali", "Festival per bambini", "Festival per studenti",
    "Festival sportivi", "Festival Rock/Pop", "Altri - Festival", "Tutti Festival ➔"
];

const MODAL_ARTE = [
    "Alberghi/Ristoranti", "Arte & Teatro", "Balletto", "Balletto & Danza", "Black Light Theater",
    "Cibi/Bevande", "Cinema", "Circo", "Comicità - Arte & Teatro", "Conferenze", "Danza",
    "Letture", "Magia", "Multimedia", "Musei & Esposizioni", "Musical", "Opera", "Spettacoli",
    "Spettacoli Varietà/Tributo", "Teatro", "Vacanze", "Wellness", "Altri - Arte & Teatro", "Tutti Arte & Teatro ➔"
];

const MODAL_SPORT = [
    "Arti marziali", "Atletica leggera", "Baseball", "Basket", "Calcio", "Ciclismo", "eSport", "Gala & Show sportivi",
    "Golf", "Hockey sul ghiaccio", "Ippica", "Manifestazioni sportive", "Palestra/Fitness", "Pallamano",
    "Pattinaggio sul ghiaccio", "Pugilato", "Rugby", "Sci", "Scuola calcio", "Sport Motoristici",
    "Tennis", "Volley", "Wrestling", "Tutti Sport ➔"
];

const MODAL_TEMPO = [
    "Balletto per bambini", "Circo per tutta la famiglia", "Feste", "Fiere & Esposizioni", "Musica & Teatro per bambini",
    "Musica per bambini", "Opera per bambini", "Partecipazione", "Per tutta la famiglia", "Spettacoli di burattini",
    "Spettacoli di magia per bambini", "Spettacoli per tutta la famiglia", "Spettacoli sul ghiaccio", "Teatro per bambini",
    "Trasporto", "Viaggi evento", "Visite guidate/ Esposizioni", "Altro", "Altri - Tempo libero", "Tutti Tempo Libero ➔"
];

function closeModalNav(event) {

    if (modal.contains(event.target)) {
        return;
    }

    navBox.innerHTML = "";
    wrapper.innerHTML = "";
    wrapper.classList.remove("nav-wrap-size");
    modal.classList.add('hidden');
    navSidebar.classList.add('hidden');
    navSidebar.classList.remove('nav-sidebar-style');
    modal.classList.remove('other-navigation');
    for(let i = 0; i < navButtons.length; i++) {
        navButtons[i].addEventListener("click", openModalNav);
        navButtons[i].classList.add('nav-b-hover');
        navButtons[i].classList.remove('nav-b-inactive');
        navButtons[i].classList.remove('nav-b-active');
    }
}

function openModalNav(event) {

    modal.classList.remove('hidden');
    event.stopPropagation();
    for (let i = 0; i < navButtons.length; i++) {
        navButtons[i].removeEventListener("click", openModalNav);
        navButtons[i].classList.remove('nav-b-hover');
        navButtons[i].classList.add('nav-b-inactive');
    }
    event.currentTarget.classList.add('nav-b-active');

    if (event.currentTarget === navButtons[0]) {
        fillModalNav(MODAL_MUSICA, 6, 4);
    } else if (event.currentTarget === navButtons[1]) {
        fillModalNav(MODAL_FESTIVAL, 4, 4);
    } else if (event.currentTarget === navButtons[2]) {
        fillModalNav(MODAL_ARTE, 6, 4);
    } else if (event.currentTarget === navButtons[3]) {
        fillModalNav(MODAL_SPORT, 6, 4);
    } else if (event.currentTarget === navButtons[4]) {
        fillModalNav(MODAL_TEMPO, 5, 4);
    } else if (event.currentTarget === navButtons[5]) {
        fillModalNavOther(MODAL_TEMPO, 5, 4);
    }
}

function fillModalNav(contentList, rows, columns) {
    modal.appendChild(wrapper);
    wrapper.appendChild(navBox);
    discoverMore.classList.add("nav-title");
    discoverMore.classList.remove("nav-wrap-title");
    discoverMore.innerHTML = "Scoprire </br> di più";
    navBox.appendChild(discoverMore);

    navFiller(contentList, rows, columns);
}

function navFiller(contentList, rows, columns) {

    let navList = [];
    for (let i = 0; i < columns; i++) {
        navList[i] = document.createElement("div");
        navList[i].classList.add("nav-list");
        navBox.appendChild(navList[i]);
    }

    for (let i = 0; i < contentList.length; i++) {
        let content = contentList[i];
        let navElement = document.createElement("a");
        navElement.href = "#";
        navElement.textContent = content;

        if ((i + 1) === contentList.length) {
            navElement.classList.add("all-category");
        }

        let columnIndex = parseInt(i / rows);
        navList[columnIndex].appendChild(navElement);
    }
}

function fillModalNavOther(contentList, rows, columns) {
    modal.classList.add('other-navigation');
    navSidebar.classList.remove('hidden');
    navSidebar.classList.add('nav-sidebar-style');

    modal.appendChild(wrapper);
    discoverMore.classList.add("nav-wrap-title");
    discoverMore.classList.remove("nav-title");
    discoverMore.innerHTML = "Scoprire di più";
    wrapper.classList.add("nav-wrap-size");
    wrapper.appendChild(discoverMore);
    wrapper.appendChild(navBox);
    
    navFiller(contentList, rows, columns);

}

function changeOtherNav(event) {
    
    navBox.innerHTML = "";
    for(let i = 0; i < otherButtons.length; i++) {
        otherButtons[i].classList.remove('other-active');
    }
    event.currentTarget.classList.add('other-active');

    if (event.currentTarget === otherMusic) {
        fillModalNavOther(MODAL_MUSICA, 6, 4);
    } else if (event.currentTarget === otherFestival) {
        fillModalNavOther(MODAL_FESTIVAL, 4, 4);
    } else if (event.currentTarget === otherArte) {
        fillModalNavOther(MODAL_ARTE, 6, 4);
    } else if (event.currentTarget === otherSport) {
        fillModalNavOther(MODAL_SPORT, 6, 4);
    } else if (event.currentTarget === otherTempo) {
        fillModalNavOther(MODAL_TEMPO, 5, 4);
    }
}

function openMobileMenu(){
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("mobile-menu-style");
    mobileMenu.style.top = window.pageYOffset + 'px';
    document.body.classList.add("no-scroll");
}

function closeMobileMenu() {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("mobile-menu-style");
    document.body.classList.remove("no-scroll");
}

function toggleFooterSection(event){
    const imgChild = event.currentTarget.querySelector("img");

    for(let i = 0; i < footerSection.length; i++){
        if(footerSection[i].dataset.cat === event.currentTarget.dataset.cat){
            if(footerSection[i].classList.contains("hidden")){
                footerSection[i].classList.remove("hidden");
                footerSection[i].classList.add("lista-mobile");
                imgChild.src = "./icons/uparrow.png";
            }
            else{
                footerSection[i].classList.add("hidden");
                footerSection[i].classList.remove("lista-mobile");
                imgChild.src = "./icons/downarrow.png";
            }

            break;
        }
    }

}