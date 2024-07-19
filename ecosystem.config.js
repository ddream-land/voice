module.exports = {
  apps: [
    {
      name: 'web-voice',
      script: 'npm',
      args: 'start',
      env: {
        HOST: '0.0.0.0',
        PORT: 3000,
        NODE_ENV: 'production'
      },
      // 可选：配置其他PM2选项，比如最大重启次数/内存限制等
            instances: '1', // 或者指定特定数量的实例，比如 2
      exec_mode: 'cluster' // 使用 cluster 模式以充分利用多核 CPU
    }
  ]
};