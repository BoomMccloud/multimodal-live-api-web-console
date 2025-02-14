/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { CacheProvider } from '@emotion/react';

// Mock the components that use canvas
jest.mock('./components/altair/Altair', () => ({
  Altair: () => <div data-testid="mock-altair">Mock Altair</div>,
}));

jest.mock('./components/side-panel/SidePanel', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-side-panel">Mock SidePanel</div>,
}));

jest.mock('./components/control-tray/ControlTray', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-control-tray">Mock ControlTray</div>,
}));

// Mock environment variables
process.env.REACT_APP_GEMINI_API_KEY = 'test-api-key';

test('renders app components', () => {
  render(
    <CacheProvider value={(global as any).emotionCache}>
      <App />
    </CacheProvider>
  );
  expect(screen.getByTestId('mock-altair')).toBeInTheDocument();
  expect(screen.getByTestId('mock-side-panel')).toBeInTheDocument();
  expect(screen.getByTestId('mock-control-tray')).toBeInTheDocument();
});
