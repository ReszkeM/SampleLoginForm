export enum ErrorType {
  Warning = 'warning',
  Error = 'error'
}

export class ValidationError {
  constructor(public message: string, public type: ErrorType = ErrorType.Error) {}
}
