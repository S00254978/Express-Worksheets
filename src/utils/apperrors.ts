export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number
  ) {
    super(message);
    this.name = new.target.name;
  }
}

export class UserAlreadyExistsError extends AppError {
  constructor() {
    super("User already exists", 409);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}