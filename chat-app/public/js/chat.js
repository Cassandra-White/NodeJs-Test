//ELEMENTS
const socket = io()
const $formMessage = document.querySelector('#form-message-to-send');
const $inputFormMessage = $formMessage.querySelector("input");
const $buttonFormMessage = $formMessage.querySelector('button');
const $buttonShareLocation = document.querySelector("#button-share-location");
const $messages = document.querySelector('#messages');

//TEMPLATE
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector("#location-template").innerHTML;

//OPTION
const {userName, roomName} = Qs.parse(location.search, {ignoreQueryPrefix : true})

socket.on('message', (message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format('k:mm')
    });
    $messages.insertAdjacentHTML('beforeend', html);
});

socket.on("locationMessage",(urlLocation)=> {
    console.log(urlLocation);
    const html = Mustache.render(locationTemplate, {
        urlLocation : urlLocation.url,
        createdAt: moment(urlLocation.createdAt).format('k:mm')

    });
    $messages.insertAdjacentHTML("beforeend", html);
});

$formMessage.addEventListener('submit', (event) => {
    event.preventDefault();
    $inputFormMessage.setAttribute('disabled', 'disabled');
    $buttonFormMessage.setAttribute('disabled', 'disabled');


    const message = event.target[0].value;
    // autre façon :
    // const message = event.target.elements.message.value;
    socket.emit('sendMessage', message, (error) => {

        $inputFormMessage.removeAttribute('disabled');
        $buttonFormMessage.removeAttribute('disabled');
        $inputFormMessage.focus();

        if(error)
            return console.log('Status message :', error);

        $inputFormMessage.value = '';
        console.log('Status message : Délivré');

        
    });
});

$buttonShareLocation.addEventListener("click", () => {
    if(!navigator.geolocation)
        return alert("Votre navigateur ne supporte pas la Géolocalisation");

    $buttonShareLocation.setAttribute('disabled', 'disabled');
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {longitude : position.coords.longitude, latitude: position.coords.latitude }, () => {
            $buttonShareLocation.removeAttribute('disabled');
            console.log('Position partagé');
        });
    });
});

socket.emit('join', { userName, roomName});