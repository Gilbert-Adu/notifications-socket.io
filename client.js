const socket = io.connect('http://localhost:5500');
const jQueryScript = document.createElement('script');
jQueryScript.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js');
document.head.appendChild(jQueryScript);

//DOM elements from first page
let hospitalForm = getElement('emergency-form'),
    hospitalName = getElement('hospital-name');


//get DOM elements on page
function getElement(el) {
    return document.getElementById(el);
}

//index page click handler
hospitalForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log(hospitalName.value);
    socket.emit('join_room',{roomName: hospitalName.value,message: 'EMERGENCY ALERT!'});
})
 
//handle sockets for client side
socket.on('notification', (data) => {
    toastr.options.closeButton = true;
    toastr.options.timeOut = 0;
    toastr.options.extendedTimeOut = 0;
    toastr.warning('<button type="button" id="okBtn" class="indexBtn btn-primary">show location</button>&nbsp;',`<h3>${data}</h3>`)
});

//handle joining of rooms
socket.on('join_room', (data) => {
    socket.join(data.roomName)
})
