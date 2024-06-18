/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();
 
const config = withNextIntl({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rewuai-foreign.oss-us-west-1.aliyuncs.com',
        port: '',
        pathname: '/nuwa/**',
      }, {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
});


module.exports = config;