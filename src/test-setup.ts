import { JSDOM } from 'jsdom';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
});

Object.defineProperty(global, 'window', {
  value: dom.window,
});

Object.defineProperty(global, 'document', {
  value: dom.window.document,
});

Object.defineProperty(global, 'navigator', {
  value: {
    userAgent: 'node.js',
  },
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Setup Emotion cache
const emotionCache = createCache({
  key: 'emotion-cache',
  prepend: true,
});

Object.defineProperty(global, 'emotionCache', {
  value: emotionCache,
});

// Add structuredClone polyfill
if (typeof structuredClone !== 'function') {
  (global as any).structuredClone = (obj: any) => JSON.parse(JSON.stringify(obj));
}

// Mock canvas
class MockCanvas {
  getContext() {
    return null;
  }
}

Object.defineProperty(global, 'HTMLCanvasElement', {
  value: MockCanvas,
  writable: true,
  configurable: true,
}); 