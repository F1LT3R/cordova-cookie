cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-appversion.RareloopAppVersion",
        "file": "plugins/cordova-plugin-appversion/www/app-version.js",
        "pluginId": "cordova-plugin-appversion",
        "clobbers": [
            "AppVersion"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.2",
    "cordova-plugin-appversion": "1.0.0"
};
// BOTTOM OF METADATA
});