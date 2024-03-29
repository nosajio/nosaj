const KEY_FILE = process.env.KEY_FILE;
const SSH_USER = process.env.SSH_USER;
const SSH_HOST = process.env.SSH_HOST;

if (!(KEY_FILE && SSH_USER && SSH_HOST)) {
  console.log('fyi; running ecosystem file without ssh vars');
}

module.exports = {
  apps: [
    {
      script: 'npm start',
      watch: false,
      name: 'nosaj.io',
      instances: 1,
      max_restarts: 10,
      env: {
        PORT: 5420,
      },
    },
  ],

  deploy: {
    production: {
      key: KEY_FILE,
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
