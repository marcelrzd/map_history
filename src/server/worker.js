import { setupWorker } from 'msw/browser';
import { endpoints } from './endpoints';

export const worker = setupWorker(...endpoints);
