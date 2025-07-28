import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: number;
      role: string;
    };
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    session: session.Session & Partial<session.SessionData>;
  }
}
