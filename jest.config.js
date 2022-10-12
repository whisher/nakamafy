const nextJest = require('next/jest');

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './'
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	moduleDirectories: ['node_modules', '<rootDir>/'],
	testEnvironment: 'jest-environment-jsdom',
	moduleNameMapper: {
		'^@/components/(.*)$': '<rootDir>/components/$1',
		'^@/features/(.*)$': '<rootDir>/lib/components/features/$1',
		'^@/hooks/(.*)$': ['<rootDir>/lib/hooks/$1'],
		'^@/types/(.*)$': ['<rootDir>/lib/types/$1'],
		'^@/ui/(.*)$': ['<rootDir>/lib/components/ui/$1'],
		'^@/util/(.*)$': ['<rootDir>/lib/util/$1']
	}
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
