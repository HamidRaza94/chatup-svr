const { createLogger, format, transports } = require('winston');

class LoggerService {
  constructor() {
    this.log = createLogger({
      format: format.combine(
        format.splat(),
        format.simple(),
      ),
      transports: [new transports.Console()]
    });
  }
}

export default LoggerService;
