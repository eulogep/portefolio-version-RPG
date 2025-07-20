import '@testing-library/jest-dom';

// Mock IntersectionObserver for Jest (Framer Motion, etc.)
class IntersectionObserverMock {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = IntersectionObserverMock; 