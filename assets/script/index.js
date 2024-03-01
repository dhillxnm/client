'use strict';

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function onEvent(event, selector, callback) {  // onEvent nu but es tra likna 
    return selector.addEventListener(event, callback);   // add event nu es tra likde aa
}

const deviceType = select(".device-type");
const languageType = select(".lang-type");
const browserType = select(".browser-type");
const width = select(".width");
const height = select(".height");
const orientation = select(".orientation");
const batteryLevel = select('.level');
const batteryStatus = select('.status');
const state = select('.state');
const batColor = select('.batState');



// Operating system
const readSystem = () => {
    let deviceName = '';
    if (navigator.userAgent.match(/Android/i)) {  
        deviceName = 'Android';
    } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        deviceName = 'iOS';
    } else if (navigator.userAgent.match(/Windows/i)) {
        deviceName = 'Windows';
    } else if (navigator.userAgent.match(/Mac/i)) {
        deviceName = 'Mac';
    } else {
        deviceName = 'Unknown';
    }  
   
    let languageUsed = navigator.language || navigator.userLanguage;
    // navigator.language is new property to get browser language sometimes it not work 
    // thts why we se old property navigate.userLanguage
    
    let browserName = navigator.userAgent.toLowerCase();
    if (browserName.indexOf('firefox') > -1) {  // it is default behaviour of indexOf to return -1 if it fail to find 
        // > -1 by this , we give situation to it not give -1 
        browserName = 'Firefox';
    } else if (browserName.indexOf('edg') > -1) {
        browserName = 'Microsoft Edge';
    } else if (browserName.indexOf('chrome') > -1) {
        browserName = 'Chrome';
    } else if (browserName.indexOf('safari') > -1) {
        browserName = 'Safari';
    } else if (browserName.indexOf('opera') > -1) {
        browserName = 'Opera';
    } else if (browserName.indexOf('msie') > -1 || browserName.indexOf('trident') > -1) {
        browserName = 'Internet Explorer';
    } else {
        browserName = 'Unknown';
    }
  
    deviceType.innerText = `OS:  ${deviceName}`;
    languageType.innerText = `Language:  ${languageUsed}`;
    browserType.innerText = `Browser:  ${browserName}`;
}

window.addEventListener('load', readSystem);
  
// window measurements
const windowMeasurements = () => {
    let windowWidth = window.innerWidth;
    width.innerText = `Width:  ${windowWidth}px`;
  
    let windowHeight = window.innerHeight;
    height.innerText = `Height:  ${windowHeight}px`;
  
    let windowOrientation = windowWidth >= windowHeight ? 'Landscape' : 'Portrait';
    orientation.innerText = `Orientation: ${windowOrientation}`;
}

window.addEventListener('load', windowMeasurements);
window.addEventListener('resize', windowMeasurements);  // resize and load is events like click 

//  BATTERY
function batteryIdentifier(battery) {
    batteryStatus.innerText = `Status: ${battery.charging ? 'Charging' : 'Idle'}`;
    batteryLevel.innerText = `Level: ${Math.floor(battery.level * 100)}%`;
}

function checkBattery(battery) {
    batteryIdentifier(battery);
    onEvent('levelchange', battery, () => batteryIdentifier(battery));
    onEvent('chargingchange', battery, () => batteryIdentifier(battery));   // levelchange and chargingchange is events to trigger
    // changes in the battery
}

if (navigator.getBattery) {
    // navigator.getBattery()  method to get the device battery information
    navigator.getBattery().then(checkBattery);
    //  explanation of then (scroll down)
} else {
    batteryLevel.innerText = 'Level: not available';
    batteryStatus.innerText = 'Status: not available';
}

// ONLINE AND OFFLINE 
function updateState() {
    if (navigator.onLine) {
        state.innerText = 'Online';
        batColor.style.background = '#28a745';
    } else {
        state.innerText = 'Offline';
        batColor.style.background = '#c47600';
    }
}

window.addEventListener('load', updateState); 
window.addEventListener('online', updateState); 
window.addEventListener('offline', updateState); 





// EXPLANATION 

 navigator.userAgent.match(/Android/i)
 // (i) is a flag that signifies case-insensitive matching. This means that the regex will match the text 
// "Android" regardless of whether it is written in uppercase, lowercase, or any combination of the two.

// there are several other flags you can use at the end of a regular expression in JavaScript:
//  g (global): This flag instructs the match() method to find all occurrences of the pattern in the string, rather than just the first one. For example:
// JavaScript
// const str = "This is a test string, with another test";
// const matches = 
str.match(/test/g); // ["test", "test"]


// then method (promise)

/*

Imagine you ask a friend to check the mailbox for any letters. Since checking the mailbox
 might take some time, your friend wouldn't be able to tell you immediately if there's mail
  or not. Instead, they might promise to let you know once they've checked (similar to the Promise).

The then method is like saying, "Once you've checked the mailbox and know if there's mail, come tell me."
In the code, the checkBattery function plays the role of your friend telling you the result 
(battery information in this case).


The then method allows you to specify a callback function (checkBattery in this case) that will
 be executed once the Promise is successfully resolved. This means that the checkBattery function
will only be called after navigator.getBattery() has successfully retrieved the battery information.




*/