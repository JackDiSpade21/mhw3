fetch('https://app.ticketmaster.com/discovery/v2/events.json' + '?apikey=' + api_ticketmaster + '&locale=it-it' + '&sort=id,asc' + '&size=30')
    .then(onResponseTicket, onError)
    .then(onJSONTicket);

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

    const results = json.num_found;
    for (let i = 0; i < results; i++) {
        
    }

    const maincards = document.querySelector('#main-cards');

}