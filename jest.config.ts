import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
	setupFilesAfterEnv: ['<rootDir>/src/server/test/assets/singleton.ts'],
	clearMocks: true,
	verbose: true,
};

export default config;
