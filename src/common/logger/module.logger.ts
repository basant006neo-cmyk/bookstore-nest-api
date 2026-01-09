export class ModuleLogger {
  constructor(private module: string) {}

  log(message: string) {
    console.log(`[${this.module}] ${message}`);
  }

  error(message: string) {
    console.error(`[${this.module}] ERROR: ${message}`);
  }
}
