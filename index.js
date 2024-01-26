// 'use strict';

// import signalr from '/@microsoft/signalr'


var connection = new signalR.HubConnectionBuilder().withUrl("/chat").build();

connection.start().catch(function (err) {
    return console.error(err.toString())
});

document.getElementById("sendmessage").addEventListener("click", function (event) {
    var user = document.getElementById("displayname").value;
    var message = document.getElementById("message").value;

    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString())
    })

    event.preventDefault();
})

connection.on("ReceiveMessage", function (user, message) {
    var encodedMsg = user + ": " + message;
    var li = document.createElement('li')
    li.textContent = encodedMsg;
    document.getElementById('discussion').appendChild(li)
})