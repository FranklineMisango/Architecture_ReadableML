const baseURL = 'https://www.microsoft.com/videoplayer/';

requirejs.config({
    paths: {
        "platform": baseURL + "lib/onerfstatics/onerfcomponentfactory",
        "telem": baseURL + "lib/onerfstatics/onerfonedsconfig",
        "redtux": baseURL + "lib/mwf/slider"
    }, bundles: {
        "platform": ["requireJS", "ariaWebTelemetry", "html5Shiv", "html5ShivMin", "modernizrMin", "pictureFillMin", "RedTiger_telemetry"],
        "telem": ["trackHelper", "jsll"],
        "redtux": ["copyrightHeader", "iController", "iCollectionItem", "videoClosedCaptions", "videoControls", "keycodes", "viewportCollision", "utility", "swipe", "stringExtensions", "removeFocus", "publisher", "observableComponent", "htmlExtensions", "handleImageError", "componentFactory", "breakpointTracker", "actionToggle", "additionalInformation", "alert", "areaHeading", "autosuggest", "backToTop", "banner", "biProductPlacement", "obsoleteCarousel", "checkbox", "combo", "compareChart", "contentPlacement", "contentPlacementItem", "contentToggle", "contentRichBlock", "dateTimePicker", "deviceActions", "dialog", "drawer", "emailSignUp", "feature", "featureChannel", "featureGroup", "file", "flyout", "groupCallToAction", "heading", "hero", "heroItem", "highlightFeature", "histogram", "hyperlinkGroup", "image", "imageIntro", "immersiveHero", "immersiveHeroItem", "inPageNavigation", "linkNavigation", "liveGoldBadge", "media", "mediaGallery", "mosaic", "multiColumn", "multiFeature", "mWFComponentsAll", "mWFPage", "pageBar", "pageBehaviors", "pagination", "panes", "panesProductPlacementItem", "pivot", "productPlacement", "productPlacementItem", "ratingsAndReviews", "refineItem", "refinements", "refineMenu", "richHeading", "searchHelp", "searchResults", "sequenceIndicator", "select", "selectButton", "selectMenu", "skipToMain", "slider", "social", "structuredList", "supplementalNavigation", "systemRequirements", "table", "toggle", "tooltip", "trackList", "typographicIntro", "video", "rating", "multiFeatureCarousel", "multiHeroItem", "multiHero", "feedHero", "feedHeroItem", "carouselBase", "multiSlideCarousel", "singleSlideCarousel", "logoController", "heroItemBase", "button", "actionMenu", "navigationMenu", "rangeSlider", "videoPlayer", "review", "splitReveal", "ageGate", "productDetailOverview", "productDetailHeroDigital", "reportReviewForm", "productDetailHero", "mixedProductPlacement", "list", "flipper", "divider", "glyph", "navigationBar", "mosaicPlacement", "fullBundle", "persona", "cards", "quote", "channelPlacement", "channelPlacementItem", "textArea", "callToAction", "tag", "logo", "parallax", "metadataBadge", "sticky", "actionBar", "ageRating", "ambientVideo", "badge", "blockquote", "breadcrumb", "contextMenu", "explicit", "footer", "paragraph", "password", "price", "progress", "search", "subheading", "channelPivot", "expansionPanel", "tslib"]
    }, onNodeCreated: function (n, c, m, u) {
        if ('platform' === m || 'telem' === m || 'partner' === m || 'redtux' === m)
            return n.setAttribute('crossorigin', 'anonymous'),
                n
    }
});
require(['platform']); require(['telem']); require(['redtux']);