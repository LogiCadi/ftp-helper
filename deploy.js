const ftp = require("basic-ftp");

async function deploy(config) {
  const client = new ftp.Client();
  let log = [];
  try {
    await client.access(config);
    log.push(`${new Date().toLocaleString()} 连接服务器成功 ${config.host}`);

    await client.uploadFromDir(config.local, config.remote);
    log.push(`${new Date().toLocaleString()} 文件夹上传成功 ${config.remote}`);
  } catch (err) {
    log.push(`${new Date().toLocaleString()} ${err}`);
  }

  client.close();
  return log;
}

module.exports = deploy;
