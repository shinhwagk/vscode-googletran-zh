import * as querystring from 'querystring';
import { google_transalte_url } from './constants';
import * as request from 'request';
import { getTKKByBody } from './google-tkk';

const options = {
    url: `https://${google_transalte_url}`,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
};

function _tttt(text) {
    return new Promise<string>((resolve, reject) => {
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

export function format(res) {
    const result = {
        text: ''
    };

    const body = JSON.parse(res);

    body[0].forEach(obj => {
        if (obj[0]) {
            result.text += obj[0];
        }
    });

    return result;
}

export function formatTop5(res) {
    const result = {
        text: ''
    };
    const body = JSON.parse(res);
    result.text = body[1][0][1].slice(0, 5).join(',');
    return result;
}

export async function translate(text) {
    const res = await _tttt(text);
    return format(res);
}

export async function translateTop5(text) {
    const res = await _tttt(text);
    return formatTop5(res);
}
