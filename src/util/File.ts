export const exportFile = (payload) => {
    const data = JSON.stringify(payload);
    const blob = new Blob([data], {type: "text/plain"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.target = '_blank';
    a.download = 'template.json';
    a.click();
}

export const getJSON = (callback, template) => {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(req.readyState == 4 && req.status == 200){
            if(req.responseText) {
                var data = JSON.parse(req.responseText)
                callback(data)
            }

        }
    };
    req.open("GET", `/template/${template}.json`, false);
    req.send(null);
}
