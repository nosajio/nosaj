const SSH_USER = process.env.SSH_USER;
const SSH_HOST = process.env.SSH_HOST;

if (!SSH_USER || !SSH_HOST) {
  console.error('Missing env vars');
  process.exit(1);
}

module.exports = {
  apps: [
    {
      script: 'npm start',
      watch: '.',
      name: 'nosaj.io',
      instances: 1,
      max_restarts: 20,
      env: {
        PORT: 5420,
      },
    },
  ],

  deploy: {
    production: {
      user: SSH_USER,
      host: SSH_HOST,
      ref: 'origin/master',
      repo: 'https://github.com/nosajio/nosaj',
      path: '/home/apps/nosajio_production',
      'post-deploy':
        'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
    },
  },
};
