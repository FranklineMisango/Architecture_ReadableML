document.addEventListener("DOMContentLoaded", function(event) 
{
    const vpElements = document.getElementsByClassName('c-video-player');
    const vpElement = vpElements && vpElements.length && vpElements.item(0);

    if (!vpElement) {
        console.log('no video player element found')
        return;
    }

    function tryParse(value, defaultValue) {
        try {
            return JSON.parse(value);
        }
        catch (e) {
            return defaultValue;
        }
    }

    function removeFirstSlash(string) {
        if (!string || string[0] !== '/') {
            return string;
        }
        return string.substring(1);
    }

    function getPlayerDataFromUrl() {
        const paths = removeFirstSlash(window.location.pathname).split('/');
        const videoId = paths[paths.length - 1];

        const metadata = {
            videoId: videoId
        }
        const options = {
            // default options here. below is where we override them if needed
            autoplay: false,
            mute: false,
            loop: false,
            controls: true,
            share: true,
            playbackSpeed: true,
            flexSize: true,
            autoload: true,
            market: "en-us",
            resourceHost: window.location.origin,
            resourceHash: "latest",
            useAdaptive: true,
            trigger: true,
            download: true,
            ageGate: true,
            lazyLoad: true,
            interactivity: true,
            jsllPostMessage: true,
            inViewHeightFraction: 0.5,
            useAMPVersion2: true,
            reporting: {
                enabled: true,
                jsll: true
            }
        };

        var params = document.location.search ? document.location.search.substring(1).split('&') : [];
        if (params.length > 0) {
            params.forEach(function(param) {
                var pair = param.split('=');
                if (pair.length > 1) {
                    let key = pair[0];
                    let value = tryParse(pair[1]);
                    switch (key.toLowerCase()) {
                        case "mkt":
                            key = "market";
                            break;
                        case "autoplay":
                            key = 'autoplay';
                            break;
                        case "mute":
                            key = 'mute';
                            break;
                        case "loop":
                            key = 'loop';
                            break;
                        case "controls":
                            key = 'controls';
                            break;
                        case "debug":
                            break;
                        case "playbackspeed":
                        case "playbackrate":
                            key = 'playbackSpeed';
                            break;
                        case "trigger":
                            key = 'trigger';
                            break;
                        case "theme":
                            key = 'theme';
                            break;
                        case "masklevel":
                            key = 'maskLevel';
                            value = pair[1];
                            break;
                        case "starttime":
                        case "seek":
                            key = 'startTime';
                            break;
                        case "share":
                            key = 'share';
                            break;
                        case "shareoptions":
                            key = 'shareOptions';
                            break;
                        case "resourcepath":
                            key = 'resourcePath';
                            break;
                        case "interactivity":
                            key = 'interactivity';
                            break;
                        case "download":
                            key = 'download';
                            break;
                        case "agegate":
                            key = 'ageGate';
                            break;
                        case "playfullscreen":
                            key = 'playFullScreen';
                            break;
                        case "autocaptions":
                            key = 'autoCaptions';
                            break;
                        case "useadaptive":
                            key = 'useAdaptive';
                            break;
                        case "shimserviceenv":
                            key = 'shimServiceEnv';
                            break;
                        case "shimserviceurl":
                            key = 'shimServiceUrl';
                            break;
                        case "lazyload":
                            key = 'lazyLoad';
                            break;
                        case "jsllpostmessage":
                            key = 'jsllPostMessage';
                            break;
                        case "playpausetrigger":
                            key = 'playPauseTrigger';
                            break;
                        case "showendimage":
                            key = 'showEndImage';
                            break;
                        case "showimageforvideoerror":
                            key = 'showImageForVideoError';
                            break;
                        case "inviewplay":
                            key = 'inviewPlay';
                            break;
                        case "hideposterframe":
                            key = 'hidePosterFrame';
                            break;
                        case "useAMPVersion2": // this is a bug, it should be lowercase, otherwise will never hit
                            key = 'useAMPVersion2'
                            break;
                        case "reporting":
                            key = 'reporting';
                            value = {
                                enabled: value,
                                jsll: value
                            };
                            break;
                        default:
                            break;
                    }

                    if (value !== undefined) {
                        options[key] = value;
                    }
                }
            });
        }

        // if path has a locale in it, then use that and override query params mkt if it was set above
        // example of a locale embed file https://microsoft.com/en-us/videoplayer/embed/RW16rdm
        if (paths.length === 4) {
            options.market = paths[0]; // first item in the path
        }

        // always lowercase the market to avoid issues with CDN rules
        options.market = options.market.toLowerCase();

        return {
            metadata: metadata,
            options: options
        };
    }

    function randomInt(minValue, maxValue) {
        return minValue + Math.floor(Math.random() * ((maxValue + 1) - minValue));
    }

    // This alphabet uses `A-Za-z0-9_-` symbols.
    const urlAlphabet =
        'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
    
    function uuid() {
        var id = [];
        for (var uuidCounter = 0; uuidCounter < 32; uuidCounter++) {
            id.push(urlAlphabet[randomInt(0, urlAlphabet.length - 1)]);
        }
        return id.join('');
    }
    
    // always start with an alphabet, to not break querySelector when searching for an id
    // that starts with a number.
    vpElement.setAttribute('id', 'vp-' + uuid())
    vpElement.setAttribute('data-player-data', JSON.stringify(getPlayerDataFromUrl()))   
});
