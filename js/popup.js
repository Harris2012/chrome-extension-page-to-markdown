function start(popup_callback) {

    get_current_tab(get_current_tab_callback, popup_callback);
}

function get_current_tab(get_current_tab_callback, popup_callback) {
    var queryInfo = { active: true, currentWindow: true };

    chrome.tabs.query(queryInfo, function(tabs) {
        var tab = tabs[0];

        get_current_tab_callback(tab, popup_callback);
    });
}

function get_current_tab_callback(current, popup_callback) {
    var url = current.url;

    chrome.tabs.sendMessage(current.id, { requestFrom: "page-to-markdown" }, popup_callback);
}

function popup_callback(response) {

    $('#markdown').text(response.blogBody);
}

$(function() {
    start(popup_callback);
})