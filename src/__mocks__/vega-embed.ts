const vegaEmbed = jest.fn(() => Promise.resolve({
  view: {
    finalize: jest.fn(),
    addSignalListener: jest.fn(),
    removeSignalListener: jest.fn(),
  },
}));

export default vegaEmbed; 