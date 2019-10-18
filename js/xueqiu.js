var blogBody;

function process(element) {

    switch (element.tagName) {
        case "P":
            process_p(element);
            break;
        case "H1":
            process_h(element, 1);
            break;
        case "H2":
            process_h(element, 2);
            break;
        case "H3":
            process_h(element, 3);
            break;
        case "H4":
            process_h(element, 4);
            break;
        case "H5":
            process_h(element, 5);
            break;
        case "DIV":
            process_div(element);
            break;
        default:
            break;
    }
}

function process_p(element) {

    var nodes = element.childNodes;
    if (nodes == null || nodes.length == 0) {
        return;
    }

    nodes.forEach(process_p_node);
}

function process_h(element, n) {

    var innerText = element.innerText.trim();
    if (innerText.length > 0) {
        blogBody += new Array(n + 1).join("#") + ' ' + element.innerText.trim();
        blogBody += "\r\n\r\n";
    }
}

function process_p_node(node) {

    switch (node.tagName) {
        case "IMG":
            process_p_node_img(node);
            break;
        case "STRONG":
            process_p_node_strong(node);
            break;
        case "BR":
            break;
        case 'SPAN':
        default:
            {
                var textContent = node.textContent.trim();
                if (textContent.length > 0) {
                    blogBody += textContent.trim();

                    if (textContent != '，') {
                        blogBody += "\r\n\r\n";
                    }
                }
            }
            break;
    }
}

function process_p_node_img(element) {

    blogBody += "![](" + element.src + ")\r\n\r\n";
}

function process_p_node_strong(element) {

    blogBody += "#### " + element.innerText.trim() + "\r\n\r\n";
}

function process_div(element) {
    if (element.className === "cnblogs_code") {
        blogBody += "```\r\n";
        blogBody += element.innerText.trim();
        blogBody += "\r\n```\r\n\r\n";
    }
}

function on_message(request, sender, callback) {

    if (request.requestFrom != "page-to-markdown") {
        return;
    }

    blogBody = "# " + $('.article__bd__title').text() + "\r\n";

    $('.article__bd__detail').children().each(function (index, item) {
        process(item)
    })

    callback({ blogBody: blogBody })
}

chrome.runtime.onMessage.addListener(on_message);