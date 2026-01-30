export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
}

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  
  // Foreground colors
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  
  // Background colors
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m',
};

const getLevelColor = (level: LogLevel): string => {
  switch (level) {
    case LogLevel.INFO:
      return `${colors.cyan}${colors.bright}`;
    case LogLevel.WARN:
      return `${colors.yellow}${colors.bright}`;
    case LogLevel.ERROR:
      return `${colors.red}${colors.bright}`;
    case LogLevel.DEBUG:
      return `${colors.magenta}${colors.dim}`;
    default:
      return colors.reset;
  }
};

const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  const time = date.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return `${colors.dim}${time}${colors.reset}`;
};

const formatLog = (entry: LogEntry): string => {
  const { level, message, timestamp, data } = entry;
  const levelColor = getLevelColor(level);
  const formattedTimestamp = formatTimestamp(timestamp);
  const levelStr = `${levelColor}${level.padEnd(5)}${colors.reset}`;
  const messageStr = `${colors.white}${message}${colors.reset}`;
  const dataStr = data ? ` ${colors.dim}${JSON.stringify(data)}${colors.reset}` : '';
  
  return `${formattedTimestamp} ${levelStr} ${messageStr}${dataStr}`;
};

export const logger = {
  info: (message: string, data?: unknown) => {
    const entry: LogEntry = {
      level: LogLevel.INFO,
      message,
      timestamp: new Date().toISOString(),
      data,
    };
    console.log(formatLog(entry));
  },

  warn: (message: string, data?: unknown) => {
    const entry: LogEntry = {
      level: LogLevel.WARN,
      message,
      timestamp: new Date().toISOString(),
      data,
    };
    console.warn(formatLog(entry));
  },

  error: (message: string, data?: unknown) => {
    const entry: LogEntry = {
      level: LogLevel.ERROR,
      message,
      timestamp: new Date().toISOString(),
      data,
    };
    console.error(formatLog(entry));
  },

  debug: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV === 'development') {
      const entry: LogEntry = {
        level: LogLevel.DEBUG,
        message,
        timestamp: new Date().toISOString(),
        data,
      };
      console.debug(formatLog(entry));
    }
  },
};
