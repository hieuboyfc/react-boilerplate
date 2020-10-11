/**
 * Language Generator
 */
const fs = require('fs');
const {exec} = require('child_process');

function languageIsSupported(language) {
    try {
        fs.accessSync(`src/translations/${language}.json`, fs.F_OK);
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = {
    description: 'Thêm ngôn ngữ',
    prompts: [
        {
            type: 'input',
            name: 'language',
            message:
                'Ngôn ngữ bạn muốn thêm hỗ trợ i18n là gì (ví dụ: "vi", "en")?',
            default: 'vi',
            validate: value => {
                if (/.+/.test(value) && value.length === 2) {
                    return languageIsSupported(value)
                        ? `Ngôn ngữ "${value}" đã được hỗ trợ.`
                        : true;
                }
                return 'Ngôn ngữ phải có 2 ký tự';
            },
        },
    ],

    actions: ({test}) => {
        const actions = [];

        if (test) {
            // backup files that will be modified so we can restore them
            actions.push({
                type: 'backup',
                path: '../../src',
                file: 'i18n-bak.js',
            });

            actions.push({
                type: 'backup',
                path: '../../src',
                file: 'index-bak.js',
            });
        }

        actions.push({
            type: 'modify',
            path: '../../src/i18n.js',
            pattern: /(const ..LocaleData = require\('react-intl\/locale-data\/..'\);\n)+/g,
            templateFile: './language/intl-locale-data.hbs',
        });
        actions.push({
            type: 'modify',
            path: '../../src/i18n.js',
            pattern: /(\s+'[a-z]+',\n)(?!.*\s+'[a-z]+',)/g,
            templateFile: './language/src-locale.hbs',
        });
        actions.push({
            type: 'modify',
            path: '../../src/i18n.js',
            pattern: /(const ..TranslationMessages = require\('\.\/translations\/..\.json'\);\n)(?!const ..TranslationMessages = require\('\.\/translations\/..\.json'\);\n)/g,
            templateFile: './language/translation-messages.hbs',
        });
        actions.push({
            type: 'modify',
            path: '../../src/i18n.js',
            pattern: /(addLocaleData\([a-z]+LocaleData\);\n)(?!.*addLocaleData\([a-z]+LocaleData\);)/g,
            templateFile: './language/add-locale-data.hbs',
        });
        actions.push({
            type: 'modify',
            path: '../../src/i18n.js',
            pattern: /([a-z]+:\sformatTranslationMessages\('[a-z]+',\s[a-z]+TranslationMessages\),\n)(?!.*[a-z]+:\sformatTranslationMessages\('[a-z]+',\s[a-z]+TranslationMessages\),)/g,
            templateFile: './language/format-translation-messages.hbs',
        });
        actions.push({
            type: 'add',
            path: '../../src/translations/{{language}}.json',
            templateFile: './language/translations-json.hbs',
            abortOnFail: true,
        });
        actions.push({
            type: 'modify',
            path: '../../src/index.js',
            pattern: /(import\('intl\/locale-data\/jsonp\/[a-z]+\.js'\),\n)(?!.*import\('intl\/locale-data\/jsonp\/[a-z]+\.js'\),)/g,
            templateFile: './language/polyfill-intl-locale.hbs',
        });

        if (!test) {
            actions.push(() => {
                const cmd = 'npm run extract-intl';
                exec(cmd, (err, result) => {
                    if (err) throw err;
                    process.stdout.write(result);
                });
                return 'sửa đổi dịch tin nhắn';
            });
        }

        return actions;
    },
};
