/**
 * Container Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
    description: 'Thêm thành phần Container',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'Nó nên được gọi là gì?',
            default: 'Form',
            validate: value => {
                if (/.+/.test(value)) {
                    return componentExists(value)
                        ? 'Một Component hoặc Container có tên này đã tồn tại'
                        : true;
                }

                return 'Tến không được để trống!';
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
            name: 'wantHeaders',
            default: false,
            message: 'Bạn có muốn tiêu đề?',
        },
        {
            type: 'confirm',
            name: 'wantActionsAndReducer',
            default: true,
            message:
                'Bạn có muốn một bộ actions/constants/selectors/reducer cho Container?',
        },
        {
            type: 'confirm',
            name: 'wantSaga',
            default: true,
            message: 'Bạn có muốn sagas cho luồng không đồng bộ? (ví dụ: tìm nạp dữ liệu)',
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
            default: true,
            message: 'Bạn có muốn tải tài nguyên không đồng bộ?',
        },
    ],
    actions: data => {
        // Generate index.js and index.test.js
        const actions = [
            {
                type: 'add',
                path: '../../src/containers/{{properCase name}}/index.js',
                templateFile: './container/index.js.hbs',
                abortOnFail: true,
            },
            {
                type: 'add',
                path: '../../src/containers/{{properCase name}}/tests/index.test.js',
                templateFile: './container/test.js.hbs',
                abortOnFail: true,
            },
        ];

        // If component wants messages
        if (data.wantMessages) {
            actions.push({
                type: 'add',
                path: '../../src/containers/{{properCase name}}/messages.js',
                templateFile: './container/messages.js.hbs',
                abortOnFail: true,
            });
        }

        // If they want actions and a reducer, generate actions.js, constants.js,
        // reducer.js and the corresponding tests for actions and the reducer
        if (data.wantActionsAndReducer) {
            // Actions
            actions.push({
                type: 'add',
                path: '../../src/containers/{{properCase name}}/actions.js',
                templateFile: './container/actions.js.hbs',
                abortOnFail: true,
            });
            actions.push({
                type: 'add',
                path: '../../src/containers/{{properCase name}}/tests/actions.test.js',
                templateFile: './container/actions.test.js.hbs',
                abortOnFail: true,
            });

            // Constants
            actions.push({
                type: 'add',
                path: '../../src/containers/{{properCase name}}/constants.js',
                templateFile: './container/constants.js.hbs',
                abortOnFail: true,
            });

            // Selectors
            actions.push({
                type: 'add',
                path: '../../src/containers/{{properCase name}}/selectors.js',
                templateFile: './container/selectors.js.hbs',
                abortOnFail: true,
            });
            actions.push({
                type: 'add',
                path:
                    '../../src/containers/{{properCase name}}/tests/selectors.test.js',
                templateFile: './container/selectors.test.js.hbs',
                abortOnFail: true,
            });

            // Reducer
            actions.push({
                type: 'add',
                path: '../../src/containers/{{properCase name}}/reducer.js',
                templateFile: './container/reducer.js.hbs',
                abortOnFail: true,
            });
            actions.push({
                type: 'add',
                path: '../../src/containers/{{properCase name}}/tests/reducer.test.js',
                templateFile: './container/reducer.test.js.hbs',
                abortOnFail: true,
            });
        }

        // Sagas
        if (data.wantSaga) {
            actions.push({
                type: 'add',
                path: '../../src/containers/{{properCase name}}/saga.js',
                templateFile: './container/saga.js.hbs',
                abortOnFail: true,
            });
            actions.push({
                type: 'add',
                path: '../../src/containers/{{properCase name}}/tests/saga.test.js',
                templateFile: './container/saga.test.js.hbs',
                abortOnFail: true,
            });
        }

        if (data.wantLoadable) {
            actions.push({
                type: 'add',
                path: '../../src/containers/{{properCase name}}/loadable.js',
                templateFile: './component/loadable.js.hbs',
                abortOnFail: true,
            });
        }

        actions.push({
            type: 'prettify',
            path: '/containers/',
        });

        return actions;
    },
};
