/** @type {import('@remix-run/dev').AppConfig} */
export default {
  appDirectory: "./src",
  assetsBuildDirectory: "./public/build",
  serverBuildPath: './build/src/index.js',
  serverModuleFormat: 'esm',
  ignoredRouteFiles: ['**/.*'],
  dev: {
    tlsKey: "./tls/key.pem", // relative to cwd
    tlsCert: "./tls/cert.pem", // relative to cwd
  }
}