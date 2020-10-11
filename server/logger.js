/* eslint-disable no-console */

const chalk = require('chalk');
const ip = require('ip');
const divider = chalk.gray('\n---------------------------------------------');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {
    // Called whenever there's an error on the server we want to print
    error: err => {
        console.error(chalk.red(err));
    },

    // Called when express.js src starts on given port w/o errors
    appStarted: (port, host, tunnelStarted) => {
        console.log(`Máy chủ đã được bật ! ${chalk.green('✓')}`);

        // If the tunnel started, log that and the URL it's available at
        if (tunnelStarted) {
            console.log(`Trang website được khởi tạo ! ${chalk.green('✓')}`);
        }

        console.log(`
${chalk.bold('Các đường dẫn được truy cập:')}${divider}
Địa chỉ Localhost: ${chalk.magenta(`http://${host}:${port}`)}
Địa chỉ mạng LAN: ${chalk.magenta(`http://${ip.address()}:${port}`) +
            (tunnelStarted ? `\nĐịa chỉ Proxy: ${chalk.magenta(tunnelStarted)}` : '')}${divider}
${chalk.redBright(`Hãy bấm ${chalk.italic('[CTRL-C]')} để dừng chương trình!!!`)}
    `);
    },
};

module.exports = logger;
