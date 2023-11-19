import "@testing-library/jest-dom";

const testCache = <T extends Function>(func: T) => func;

// cache をモックする
// 参考: https://github.com/vercel/next.js/discussions/49304
jest.mock("react", () => {
  const originalModule = jest.requireActual("react");
  return {
    ...originalModule,
    cache: testCache
  };
});
