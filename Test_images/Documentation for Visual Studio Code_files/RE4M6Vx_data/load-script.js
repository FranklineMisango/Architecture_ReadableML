function loadScript(url, async, defer, crossorigin, type) {
    var script = document.createElement('script');
    script.src = url;
    if (async) {
        script.async = true;
    }
    if (defer) {
        script.defer = true;
    }
    if (crossorigin) {
        script.crossOrigin = 'anonymous';
    }
    if (type === 'head') {
        document.head.appendChild(script);
    } else {
        document.body.appendChild(script);
    }
}