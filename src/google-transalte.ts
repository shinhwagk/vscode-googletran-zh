import * as querystring from 'querystring';
import * as got from 'got';
import * as token from './google-tkk';

export function translate(gUrl: string, text: string, opts?) {
    opts = opts || { from: 'en', to: 'zh-cn' };

    return token
        .get(gUrl, text)
        .then(function(token) {
            let url = `https://${gUrl}/translate_a/single`;
            let data = {
                client: opts.client || 'gtx',
                sl: opts.from,
                tl: opts.to,
                hl: opts.to,
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

// translate('translate.google.cn/', 'apple').then(console.log);
