import { LoggerService, LogLevel } from "@nestjs/common";

export class AppLogger implements LoggerService {
    log(message: any, ...optionalParams: any[]) {
       console.log(`[CustomLog->APP] ${message}`);
    }
    error(message: any,  trace?: string) {
      console.error(`[CustomLog->ERROR] ${message}`, trace);
    }
    warn(message: any, ...optionalParams: any[]) {
        console.warn(`[CustomLog->WARN] ${message}`);
    }
    debug?(message: any, ...optionalParams: any[]) {
       console.debug(`[CustomLog->DEBUG] ${message}`);
    }
    verbose?(message: any, ...optionalParams: any[]) {
      console.debug(`[CustomLog->Verbose] ${message}`);
    }
    fatal?(message: any, ...optionalParams: any[]) {
       console.debug(`[CustomLog->Fatal] ${message}`);
    }
    setLogLevels?(levels: LogLevel[]) {
       console.debug(`[CustomLog->LogLevel] ${levels}`);
    }
    
}