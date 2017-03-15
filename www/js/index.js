/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.getElementById("setLocalStorage").addEventListener("click", setLocalStorage);
        document.getElementById("showLocalStorage").addEventListener("click", showLocalStorage);
        document.getElementById("removeProjectFromLocalStorage").addEventListener("click", removeProjectFromLocalStorage);
        document.getElementById("getLocalStorageByKey").addEventListener("click", getLocalStorageByKey);

        // Sample built-in volume up button
        document.addEventListener("volumeupbutton", callbackFunction, false);

        // Sample built-in back button
        document.addEventListener("backbutton", onBackKeyDown, false);

        var localStorage = window.localStorage;
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        window.addEventListener("batterystatus", onBatteryStatus, false);
        document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture);
        document.getElementById("cameraGetPicture").addEventListener("click", cameraGetPicture);

        // Contact
        document.getElementById("createContact").addEventListener("click", createContact);
        document.getElementById("findContact").addEventListener("click", findContacts);
        document.getElementById("deleteContact").addEventListener("click", deleteContact);

        // Device
        document.getElementById("cordovaDevice").addEventListener("click", cordovaDevice);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function callbackFunction() {
    alert('Volume Up Button is pressed!');
}

function onBackKeyDown(e) {
    e.preventDefault();
    alert('Back Button is Pressed!');
}

function setLocalStorage() {
    localStorage.setItem("Name", "John");
    localStorage.setItem("Job", "Developer");
    localStorage.setItem("Project", "Cordova Project");
}

function showLocalStorage() {
    console.log(localStorage.getItem("Name"));
    console.log(localStorage.getItem("Job"));
    console.log(localStorage.getItem("Project"));
}

function removeProjectFromLocalStorage() {
    localStorage.removeItem("Project");
}

function getLocalStorageByKey() {
    console.log(localStorage.key(0));
}

function onBatteryStatus(info) {
    alert("BATTERY STATUS: Level: " + info.level + " isPlugged: " + info.isPlugged);
}

function cameraTakePicture() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });

    function onSuccess(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}

function cameraGetPicture() {
    navigator.camera.getPicture(onSuccess, onFail, {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });

    function onSuccess(imageURL) {
        var image = document.getElementById('myImage');
        image.src = imageURL;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}

// Contact Management
function createContact() {
    var myContact = navigator.contacts.create({ "displayName": "Test User" });
    myContact.save(contactSuccess, contactError);

    function contactSuccess() {
        alert("Contact is saved!");
    }

    function contactError(message) {
        alert("Failed because: " + message);
    }
}

function findContacts() {
    var options = new ContactFindOptions();
    options.filter = "Test User";
    options.multiple = true;

    fields = ["displayName"];
    navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

    function contactfindSuccess(contacts) {
        for (var i = 0; i < contacts.length; i++) {
            alert("Display Name = " + contacts[i].displayName);
        }
    }

    function contactfindError(message) {
        alert('Failed because: ' + message);
    }
}

function deleteContact() {
    var options = new ContactFindOptions();
    options.filter = "Test User";
    options.multiple = false;
    fields = ["displayName"];

    navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

    function contactfindSuccess(contacts) {
        var contact = contacts[0];
        contact.remove(contactRemoveSuccess, contactRemoveError);

        function contactRemoveSuccess(contact) {
            alert("Contact Deleted");
        }

        function contactRemoveError(message) {
            alert('Failed because: ' + message);
        }
    }

    function contactfindError(message) {
        alert('Failed because: ' + message);
    }
}

function cordovaDevice() {
    alert("Cordova version: " + device.cordova + "\n" +
        "Device model: " + device.model + "\n" +
        "Device platform: " + device.platform + "\n" +
        "Device UUID: " + device.uuid + "\n" +
        "Device version: " + device.version
    );
}

app.initialize();