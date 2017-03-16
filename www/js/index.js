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
        // document.getElementById("setLocalStorage").addEventListener("click", setLocalStorage);
        // document.getElementById("showLocalStorage").addEventListener("click", showLocalStorage);
        // document.getElementById("removeProjectFromLocalStorage").addEventListener("click", removeProjectFromLocalStorage);
        // document.getElementById("getLocalStorageByKey").addEventListener("click", getLocalStorageByKey);

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
        // document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture);
        // document.getElementById("cameraGetPicture").addEventListener("click", cameraGetPicture);

        // Contact
        // document.getElementById("createContact").addEventListener("click", createContact);
        // document.getElementById("findContact").addEventListener("click", findContacts);
        // document.getElementById("deleteContact").addEventListener("click", deleteContact);

        // Device
        document.getElementById("cordovaDevice").addEventListener("click", cordovaDevice);

        // Acceleration
        document.getElementById("getAcceleration").addEventListener("click", getAcceleration);
        document.getElementById("watchAcceleration").addEventListener("click", watchAcceleration);

        // Dialog 
        // document.getElementById("dialogAlert").addEventListener("click", dialogAlert);
        // document.getElementById("dialogConfirm").addEventListener("click", dialogConfirm);
        // document.getElementById("dialogPrompt").addEventListener("click", dialogPrompt);
        // document.getElementById("dialogBeep").addEventListener("click", dialogBeep);

        // File System
        // document.getElementById("createFile").addEventListener("click", createFile);
        // document.getElementById("writeFile").addEventListener("click", writeFile);
        // document.getElementById("readFile").addEventListener("click", readFile);
        // document.getElementById("removeFile").addEventListener("click", removeFile);

        // File Transfer
        // document.getElementById("uploadFile").addEventListener("click", uploadFile);
        // document.getElementById("downloadFile").addEventListener("click", downloadFile);
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

function getAcceleration() {
    navigator.accelerometer.getCurrentAcceleration(accelerometerSuccess, accelerometerError);

    function accelerometerSuccess(acceleration) {
        alert('Acceleration X: ' + acceleration.x + '\n' +
            'Acceleration Y: ' + acceleration.y + '\n' +
            'Acceleration Z: ' + acceleration.z + '\n' +
            'Timestamp: ' + acceleration.timestamp + '\n');
    };

    function accelerometerError() {
        alert('onError!');
    }
}

function watchAcceleration() {
    var accelerometerOptions = {
        frequency: 3000
    }

    var watchID = navigator.accelerometer.watchAcceleration(accelerometerSuccess, accelerometerError, accelerometerOptions);

    function accelerometerSuccess(acceleration) {
        alert('Acceleration X: ' + acceleration.x + '\n' +
            'Acceleration Y: ' + acceleration.y + '\n' +
            'Acceleration Z: ' + acceleration.z + '\n' +
            'Timestamp: ' + acceleration.timestamp + '\n');

        setTimeout(function() {
            navigator.accelerometer.clearWatch(watchID);
        }, 10000);
    };

    function accelerometerError() {
        alert('onError!');
    }
}

// Dialog
function dialogAlert() {
    var message = "I am Alert Dialog!";
    var title = "ALERT";
    var buttonName = "Alert Button";

    navigator.notification.alert(message, alertCallback, title, buttonName);

    function alertCallback() {
        console.log("Alert is Dismissed!");
    }
}

function dialogConfirm() {
    var message = "Am I Confirm Dialog?";
    var title = "CONFIRM";
    var buttonLabels = "YES,NO";

    navigator.notification.confirm(message, confirmCallback, title, buttonLabels);

    function confirmCallback(buttonIndex) {
        console.log("You clicked " + buttonIndex + " button!");
    }

}

function dialogPrompt() {
    var message = "Am I Prompt Dialog?";
    var title = "PROMPT";
    var buttonLabels = ["YES", "NO"];
    var defaultText = "Default"

    navigator.notification.prompt(message, promptCallback, title, buttonLabels, defaultText);

    function promptCallback(result) {
        console.log("You clicked " + result.buttonIndex + " button! \n" +
            "You entered " + result.input1);
    }

}

function dialogBeep() {
    var times = 2;
    navigator.notification.beep(times);
}

// File System
function createFile() {
    var type = window.TEMPORARY;
    var size = 5 * 1024 * 1024;

    window.requestFileSystem(type, size, successCallback, errorCallback)

    function successCallback(fs) {
        fs.root.getFile('log.txt', { create: true, exclusive: true }, function(fileEntry) {
            alert('File creation successfull!')
        }, errorCallback);
    }

    function errorCallback(error) {
        alert("ERROR: " + error.code)
    }
}

function writeFile() {
    var type = window.TEMPORARY;
    var size = 5 * 1024 * 1024;

    window.requestFileSystem(type, size, successCallback, errorCallback)

    function successCallback(fs) {

        fs.root.getFile('log.txt', { create: true }, function(fileEntry) {

            fileEntry.createWriter(function(fileWriter) {
                fileWriter.onwriteend = function(e) {
                    alert('Write completed.');
                };

                fileWriter.onerror = function(e) {
                    alert('Write failed: ' + e.toString());
                };

                var blob = new Blob(['Lorem Ipsum'], { type: 'text/plain' });
                fileWriter.write(blob);
            }, errorCallback);

        }, errorCallback);

    }

    function errorCallback(error) {
        alert("ERROR: " + error.code)
    }
}

function readFile() {
    var type = window.TEMPORARY;
    var size = 5 * 1024 * 1024;

    window.requestFileSystem(type, size, successCallback, errorCallback)

    function successCallback(fs) {

        fs.root.getFile('log.txt', {}, function(fileEntry) {

            fileEntry.file(function(file) {
                var reader = new FileReader();

                reader.onloadend = function(e) {
                    var txtArea = document.getElementById('textarea');
                    txtArea.value = this.result;
                };

                reader.readAsText(file);

            }, errorCallback);

        }, errorCallback);
    }

    function errorCallback(error) {
        alert("ERROR: " + error.code)
    }

}

function removeFile() {
    var type = window.TEMPORARY;
    var size = 5 * 1024 * 1024;

    window.requestFileSystem(type, size, successCallback, errorCallback)

    function successCallback(fs) {
        fs.root.getFile('log.txt', { create: false }, function(fileEntry) {

            fileEntry.remove(function() {
                alert('File removed.');
            }, errorCallback);

        }, errorCallback);
    }

    function errorCallback(error) {
        alert("ERROR: " + error.code)
    }
}


app.initialize();