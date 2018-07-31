function cc(response) {

    $('#markdown').text(response.blogBody);
}

function aa() {
    var backgroundPage = chrome.extension.getBackgroundPage();

    backgroundPage.start(cc);
}

$(function() {

    aa();

    //$('#start').click(aa)
})