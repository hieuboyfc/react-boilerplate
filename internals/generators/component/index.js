/**
 * Component Generator
 */

/* eslint strict: ["off"] */


'use strict';

const componentExists = require('../utils/componentExists');

module.exports = {
    description: 'Thêm một Component không được kết nối',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'Nó nên được gọi là gì?',
            default: 'Button',
            validate: value => {
                if (/.+/.test(value)) {
                    return componentExists(value)
                        ? 'Một Component hoặc Container có tên này đã tồn tại'
                        : true;
                }

                return 'Tên không được để trống!';
            },
        },
        {
            type: 'confirm',
            name: 'memo',
            default: false,
            message: 'Bạn có muốn bọc Component của mình trong React.memo không?',
        },
        {
            type: 'confirm',
            name: 'wantMessages',
            default: true,
            message: 'Bạn có muốn i18n messages (tức là thành phần này sẽ sử dụng văn bản)?',
        },
        {
            type: 'confirm',
            name: 'wantLoadable',
            default: false,
            message: 'Bạn có muốn tải Component không đồng bộ?',
        },
    ],
    actions: data => {
        // Generate index.js and index.test.js
        const actions = [
            {
                type: 'add',
                path: '../../src/components/{{properCase name}}/index.js',
                templateFile: './component/index.js.hbs',
                abortOnFail: true,
            },
            {
                type: 'add',
                path: '../../src/components/{{properCase name}}/tests/index.test.js',
                templateFile: './component/test.js.hbs',
                abortOnFail: true,
            },
        ];

        // If the user wants i18n messages
        if (data.wantMessages) {
            actions.push({
                type: 'add',
                path: '../../src/components/{{properCase name}}/messages.js',
                templateFile: './component/messages.js.hbs',
                abortOnFail: true,
            });
        }

        // If the user wants Loadable.js to load the component asynchronously
        if (data.wantLoadable) {
            actions.push({
                type: 'add',
                path: '../../src/components/{{properCase name}}/loadable.js',
                templateFile: './component/loadable.js.hbs',
                abortOnFail: true,
            });
        }

        actions.push({
            type: 'prettify',
            path: '/components/',
        });

        return actions;
    },
};
