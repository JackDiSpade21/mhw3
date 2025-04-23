const api_ticketmaster = '';
const api_spotify = '';

fetch('./keys.txt')
    .then(response => response.text(), onError)
    .then(text => {
        const api_ticketmaster = text.split('\n')[0].trim();
        const api_spotify = text.split('\n')[1].trim();
        console.log('API Key spotify:', api_spotify);
        console.log('API Key ticketmaster:', api_ticketmaster);

        fetch('https://app.ticketmaster.com/discovery/v2/events.json' + '?apikey=' + api_ticketmaster + '&locale=it-it' + '&sort=id,asc' + '&size=50')
            .then(onResponseTicket, onError)
            .then(onJSONTicket);
    })

function onResponseTicket(response) {
    if (response.ok) {
        return response.json();
    }
    else
        return null;
}

function onError(err) {
    console.error('Fetch problem: ' + err.message);
}

function onJSONTicket(json) {
    console.log(json);

    const events = new Map();
    const results = json._embedded.events.length;

    for (let i = 0; i < results; i++) {
        const embedded = json._embedded.events[i];
        const name = embedded._embedded.attractions[0].name;
        const type = embedded.classifications[0].segment.name;

        let imageUrl = '';
        for (const image of embedded.images) {
            if (image.ratio === "16_9" && image.height > 500) {
                imageUrl = image.url;
                break;
            }
        }

        if (!events.has(name)) {
            events.set(name, { name, type, imageUrl });
        }
    }

    console.log(Array.from(events.values()));

    const maincards = document.querySelector('#main-cards');
    const mostwanted = document.querySelector('#most-wanted');
    const discover = document.querySelector('#discover');

    let index = 0;
    for (const [key, event] of events) {
        if (index >= 4) break;
        createCard(event.name, event.type, event.imageUrl, maincards, ['cmain']);
        index++;
    }

    index = 0;
    for (const [key, event] of events) {
        if (index < 5){
            index++;
            continue;
        }else if (index === 5){
            createCard(event.name, event.type, event.imageUrl, mostwanted, ['featured']);
        }else if (index >= 6 && index < 8){
            createCard(event.name, event.type, event.imageUrl, mostwanted, ['featured', 'feat-max-two']);
        }else if (index < 10){
            createCard(event.name, event.type, event.imageUrl, mostwanted, ['featured', 'feat-max']);
        }else{
            break;
        }
        index++;
    }

    index = 0;
    for (const [key, event] of events) {
        if (index < 10){
            index++;
            continue;
        }else if (index === 11){
            createCard(event.name, event.type, event.imageUrl, discover, ['dis']);
        }else if (index === 12){
            createCard(event.name, event.type, event.imageUrl, discover, ['dis', 'dis-max-two']);
        }else if (index < 16){
            createCard(event.name, event.type, event.imageUrl, discover, ['dis', 'dis-max']);
        }else{
            break;
        }
        index++;
    }


}

function createCard(name, type, imageUrl, section, classes) {
    const article = document.createElement('article');
    article.classList.add('card');

    if(classes) {
        for (let i in classes) {
            article.classList.add(classes[i]);
        }
    }

    const holder = document.createElement('div');
    holder.id = 'holder';

    const thumbnail = document.createElement('img');
    thumbnail.src = imageUrl;
    thumbnail.classList.add('big-card');
    holder.appendChild(thumbnail);

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    const tsov = document.createElement('div');

    tsov.classList.add('tsov');
    overlay.appendChild(tsov);

    const solidov = document.createElement('div');
    solidov.classList.add('solidov');

    const freccia = document.createElement('img');
    freccia.src = './icons/freccia.png';
    solidov.appendChild(freccia);

    overlay.appendChild(solidov);
    holder.appendChild(overlay);
    article.appendChild(holder);

    const title = document.createElement('p');
    title.textContent = type;
    article.appendChild(title);

    const link = document.createElement('a');
    link.href = '#';
    const linkText = document.createElement('h3');
    linkText.textContent = name;
    link.appendChild(linkText);

    article.appendChild(link);
    section.appendChild(article);

    if(section.id === 'discover') {
        const span = document.createElement('span');
        span.classList.add('cat');
        span.textContent = 'biglietti';
        article.appendChild(span);
    }

    return;
}