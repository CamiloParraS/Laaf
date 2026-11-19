import { QueryFailedError } from 'typeorm';

export const isUniqueViolation = (error: unknown): boolean =>
  error instanceof QueryFailedError &&
  (error as unknown as { code?: string }).code === '23505';
