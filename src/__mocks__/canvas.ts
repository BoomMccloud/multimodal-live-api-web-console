const createCanvas = jest.fn(() => ({
  getContext: jest.fn(() => ({
    drawImage: jest.fn(),
    getImageData: jest.fn(),
    putImageData: jest.fn(),
    createImageData: jest.fn(),
    setTransform: jest.fn(),
    drawWindow: jest.fn(),
    scale: jest.fn(),
    translate: jest.fn(),
    save: jest.fn(),
    restore: jest.fn(),
  })),
  toDataURL: jest.fn(),
  toBlob: jest.fn(),
}));

export const canvas = {
  createCanvas,
  loadImage: jest.fn(() => Promise.resolve({})),
}; 