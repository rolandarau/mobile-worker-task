module.exports = {
  preset: "jest-preset-angular",
  roots: ["<rootDir>/src/app"],
  testMatch: ["**/+(*.)+(spec).+(ts)"],
  transform: {
    "^.+\\.(t/j)?$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/src/test.ts"],
  collectCoverage: true,
  coverageReporters: ["html"],
  coverageDirectory: "<rootDir>/src/app/coverage",
};
