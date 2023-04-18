/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

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
		reactStrictMode: true,
		webpack5: false,
	};
}

module.exports = settingEnv;
