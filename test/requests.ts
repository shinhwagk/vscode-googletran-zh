import * as request from 'request';
import { getTKKByBody } from '../src/google-tkk';
import * as querystring from 'querystring';
import { resolve } from 'path';

const options = {
    url: 'https://translate.google.cn',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
};

function test(text) {
    return new Promise((resolve, reject) => {
        request.get(options, (error, response, body) => {
            if (error) {
                reject(error);
                return;
            }
            const token = getTKKByBody(text, body);
            const data = {
                client: 'webapp',
                sl: 'en',
                tl: 'zh-CN',
                hl: 'en',
                dt: ['at', 'bd', 'ex', 'ld', 'md', 'qca', 'rw', 'rm', 'ss', 't'],
                ie: 'UTF-8',
                oe: 'UTF-8',
                otf: 1,
                ssel: 0,
                tsel: 0,
                tk: token.value,
                q: text
            };
            const u = `https://translate.google.cn/translate_a/single` + '?' + querystring.stringify(data);
            console.log(response.headers);
            console.log(u);
            request.get({ url: u }, (error, response, body) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(body);
            });
        });
    });
}

test('five').then(console.log);
