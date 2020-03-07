const options = {
    type: "basic",
    iconUrl: "../images/icon48.png",
    title: "This is the title",
    message: "This is the main message of the notification",

};

chrome.notifications.create(options);