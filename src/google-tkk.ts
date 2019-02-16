import * as got from 'got';

function sM(a) {
    let b: any;
    if (null !== yr) b = yr;
    else {
        b = wr(String.fromCharCode(84));
        let c = wr(String.fromCharCode(75));
        b = [b(), b()];
        b[1] = c();
        b = (yr = state[b.join(c())] || '') || '';
    }
    let d: any = wr(String.fromCharCode(116));
    let c: any = wr(String.fromCharCode(107));
    d = [d(), d()];
    d[1] = c();
    c = '&' + d.join('') + '=';
    d = b.split('.');
    b = Number(d[0]) || 0;
    const e = [];
    for (let f = 0, g = 0; g < a.length; g++) {
        let l = a.charCodeAt(g);
        128 > l
            ? (e[f++] = l)
            : (2048 > l
                  ? (e[f++] = (l >> 6) | 192)
                  : (55296 == (l & 64512) && g + 1 < a.length && 56320 == (a.charCodeAt(g + 1) & 64512)
                        ? ((l = 65536 + ((l & 1023) << 10) + (a.charCodeAt(++g) & 1023)),
                          (e[f++] = (l >> 18) | 240),
                          (e[f++] = ((l >> 12) & 63) | 128))
                        : (e[f++] = (l >> 12) | 224),
                    (e[f++] = ((l >> 6) & 63) | 128)),
              (e[f++] = (l & 63) | 128));
    }
    a = b;
    for (let f = 0; f < e.length; f++) (a += e[f]), (a = xr(a, '+-a^+6'));
    a = xr(a, '+-3^+b+-f');
    a ^= Number(d[1]) || 0;
    0 > a && (a = (a & 2147483647) + 2147483648);
    a %= 1e6;
    return c + (a.toString() + '.' + (a ^ b));
}

let yr = null;

const wr = function(a) {
    return function() {
        return a;
    };
};

const xr = function(a, b) {
    for (let c = 0; c < b.length - 2; c += 3) {
        let d = b.charAt(c + 2);
        d = 'a' <= d ? d.charCodeAt(0) - 87 : Number(d);
        d = '+' == b.charAt(c + 1) ? a >>> d : a << d;
        a = '+' == b.charAt(c) ? (a + d) & 4294967295 : a ^ d;
    }
    return a;
};

const config = { TKK: '0' };

const state = {
    TKK: config.TKK || '0'
};

async function updateTKK(service_urls) {
    const now = Math.floor(Date.now() / 3600000);
    if (Number(state.TKK.split('.')[0]) === now) {
        return;
    } else {
        got(service_urls)
            .then(res => {
                const matches = res.body.match(/tkk:\s?'(.+?)'/i);

                if (matches) {
                    state.TKK = matches[1];
                    config.TKK = state.TKK;
                }

                return;
            })
            .catch(err => {
                const e = new Error();
                e.message = err.message;
                return;
            });
    }
}

export async function get(service_urls: string, text: string) {
    return updateTKK(service_urls)
        .then(() => {
            let tk = sM(text);
            tk = tk.replace('&tk=', '');
            return { name: 'tk', value: tk };
        })
        .catch(err => {
            throw err;
        });
}

export function getTKKByBody(text: string, body: string) {
    const matches = body.match(/tkk:\s?'(.+?)'/i);
    if (matches) {
        state.TKK = matches[1];
        config.TKK = state.TKK;
    }
    let tk = sM(text);
    tk = tk.replace('&tk=', '');
    return { name: 'tk', value: tk };
}
