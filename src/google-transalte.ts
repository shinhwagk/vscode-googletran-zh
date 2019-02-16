import * as querystring from 'querystring';
import * as got from 'got';
import * as token from './google-tkk';
import { google_transalte_url } from './constants';
import * as request from 'request';
import { getTKKByBody } from '../src/google-tkk';

export function _translate(text: string, gUrl?: string, opts?) {
    opts = opts || { from: 'en', to: 'zh-cn' };
    gUrl = gUrl || google_transalte_url;

    return token
        .get(`https://${gUrl}`, text)
        .then(function(token) {
            const url = `https://${gUrl}/translate_a/single`;
            const data = {
                client: opts.client || 'webapp',
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

            return url + '?' + querystring.stringify(data);
        })
        .then(url => {
            return got(url)
                .then(function(res) {
                    let result = {
                        text: '',
                        from: {
                            language: {
                                didYouMean: false,
                                iso: ''
                            },
                            text: {
                                autoCorrected: false,
                                value: '',
                                didYouMean: false
                            }
                        },
                        raw: ''
                    };

                    if (opts.raw) {
                        result.raw = res.body;
                    }

                    let body = JSON.parse(res.body);
                    body[0].forEach(function(obj) {
                        if (obj[0]) {
                            result.text += obj[0];
                        }
                    });

                    if (body[2] === body[8][0][0]) {
                        result.from.language.iso = body[2];
                    } else {
                        result.from.language.didYouMean = true;
                        result.from.language.iso = body[8][0][0];
                    }

                    if (body[7] && body[7][0]) {
                        let str = body[7][0];

                        str = str.replace(/<b><i>/g, '[');
                        str = str.replace(/<\/i><\/b>/g, ']');

                        result.from.text.value = str;

                        if (body[7][5] === true) {
                            result.from.text.autoCorrected = true;
                        } else {
                            result.from.text.didYouMean = true;
                        }
                    }

                    return result;
                })
                .catch(function(err) {
                    err.message += `\nUrl: ${url}`;
                    if (err.statusCode !== undefined && err.statusCode !== 200) {
                        err.code = 'BAD_REQUEST';
                    } else {
                        err.code = 'BAD_NETWORK';
                    }
                    throw err;
                });
        });
}
const options = {
    url: 'https://translate.google.cn',
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

export async function translate(text) {
    const res = await _tttt(text);
    return format(res);
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
