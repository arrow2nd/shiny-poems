import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./"
});

/** @type {import('jest').Config} */
const config = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/tests/"],
  testEnvironment: "jest-environment-jsdom",
  globals: {
    "ts-jest": {
      useESM: true
    }
  }
};

export default createJestConfig(config);
