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
        'motd',
        'drupal',
    ],

    /**
     * API Configs.
     */
    api: {
        weather: {
            endpoint: 'https://fcc-weather-api.glitch.me/api/current',
        },
        ratp: {
            endpoint: 'https://api-ratp.pierre-grimaud.fr/v4',
        },
        unsplash: {
            endpoint: 'https://api.unsplash.com',
            access: 'YOUR_ACCESS_KEY',
            query: 'nature',
        },
        motd: {
            endpoint: 'https://api.adviceslip.com/advice',
        },
        drupal: {
            endpoint: 'https://www.drupal.org/api-d7/node.json',
        }
    },
}
