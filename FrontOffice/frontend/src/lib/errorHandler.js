class errorHandler {
  constructor(code, status,  message, data) {
      this.status=status
      this.message=message
      this.type=code
      this.all=data
  }
}

export default errorHandler;