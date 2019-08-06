// This is the default config file.
// It is overriden by config-dev.js
config = {
    /**
     * List of modules.
     * Used to autoload JS files.
     */
    modules: [
        'ws-manager',
        'flashbag',
        'weather',
        'ratp',
        'unsplash',
    ],

    /**
     * API Configs.
     */
    api : {
        weather : {
            endpoint: 'https://fcc-weather-api.glitch.me/api/current',
        },
        ratp : {
            endpoint: 'https://api-ratp.pierre-grimaud.fr/v4',
        },
        unsplash : {
            endpoint: '',
            access: 'YOUR_ACCESS_KEY',
        },
    },
}