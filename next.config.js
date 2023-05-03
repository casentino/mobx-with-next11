/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const nextConfig = {
	reactStrictMode: true,
	webpack5: false,
};
function settingEnv(phase) {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const env = {
    DEV_SERVER_URL: (() => { 
      if (isDev) { 
        return 'http://localhost:8080'
      }
    })()
  }
  return {
		env,
		...nextConfig,
	};
}

module.exports = settingEnv;
