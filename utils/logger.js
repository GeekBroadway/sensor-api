let winston = require('winston');
winston.emitErrs = true;

let logger;
/* istanbul ignore if */
if(process.env.NODE_ENV !== 'test') {
    logger = new winston.Logger({
        levels: {
            'debug': 0,
            'startup': 0,
            'info': 1,
            'error': 4
        },
        colors: {
            'debug': 'blue',
            'startup': 'cyan',
            'info': 'green',
            'error': 'red'
        },
        transports: [
            new winston.transports.File({
                level: 'info',
                filename: './logs/all-logs.log',
                handleExceptions: true,
                json: true,
                maxsize: 5242880, //5MB
                maxFiles: 5,
                colorize: false
            }),
            new winston.transports.Console({
                level: 'error',
                handleExceptions: true,
                json: false,
                colorize: true
            })
        ],
        exitOnError: false
    });
} else {
    logger = new winston.Logger({
        levels: {
            'debug': 0,
            'startup': 0,
            'info': 1,
            'error': 4
        },
        colors: {
            'debug': 'blue',
            'startup': 'cyan',
            'info': 'green',
            'error': 'red'
        },
        transports: [
            new winston.transports.File({
                level: 'error',
                filename: './logs/testing-log.log',
                handleExceptions: true,
                json: true,
                maxsize: 5242880, //5MB
                maxFiles: 5,
                colorize: false
            })
        ]
    });
}

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
