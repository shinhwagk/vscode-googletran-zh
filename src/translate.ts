import * as https from 'https';
import * as querystring from 'querystring';

let tkk = '429175.1243284773';

function asyncGet(url): Promise<any> {
    let options: https.RequestOptions = {
        headers: {
            'X-Frame-Options': 'SAMEORIGIN',

            Pragma: 'no-cache',

            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Content-Type': 'application/json; charset=UTF-8',
            'X-Content-Type-Options': 'nosniff',

            'Content-Encoding': 'gzip'
        }
    };

    return new Promise((resolve, reject) => {
        https.get(url, res => {
            const { statusCode } = res;
            console.log(statusCode);
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', chunk => {
                rawData += chunk;
            });
            res.on('error', err => reject(err.message));
            res.on('end', () => {
                try {
                    // console.log(rawData);
                    // const parsedData = JSON.parse(rawData);
                    resolve(rawData);
                } catch (e) {
                    reject(e.message);
                }
            });
        });
    });
}

// Get Tkk value
(async () => {
    let url = 'https://translate.google.cn/';
    let rsp = await asyncGet(url);
    let tkkMat = rsp.match(/tkk:'([\d.]+)'/);
    tkk = tkkMat ? tkkMat[1] : tkk;
})();

// translate_m_zh-CN.js:formatted Line 8084
function Ho(a) {
    return function() {
        return a;
    };
}

function Io(a, b) {
    for (var c = 0; c < b.length - 2; c += 3) {
        var d = b.charAt(c + 2);
        d = 'a' <= d ? d.charCodeAt(0) - 87 : Number(d);
        d = '+' == b.charAt(c + 1) ? a >>> d : a << d;
        a = '+' == b.charAt(c) ? (a + d) & 4294967295 : a ^ d;
    }
    return a;
}

// translate_m_zh-CN.js:formatted Line 8099 fun Ko
function tk(a, tkk) {
    var b = tkk || '';
    var d: any = Ho(String.fromCharCode(116));
    var c: any = Ho(String.fromCharCode(107));
    d = [d(), d()];
    d[1] = c();
    c = '&' + d.join('') + '=';
    d = b.split('.');
    b = Number(d[0]) || 0;
    for (var e = [], f = 0, g = 0; g < a.length; g++) {
        var k = a.charCodeAt(g);
        128 > k
            ? (e[f++] = k)
            : (2048 > k
                  ? (e[f++] = (k >> 6) | 192)
                  : (55296 == (k & 64512) && g + 1 < a.length && 56320 == (a.charCodeAt(g + 1) & 64512)
                        ? ((k = 65536 + ((k & 1023) << 10) + (a.charCodeAt(++g) & 1023)),
                          (e[f++] = (k >> 18) | 240),
                          (e[f++] = ((k >> 12) & 63) | 128))
                        : (e[f++] = (k >> 12) | 224),
                    (e[f++] = ((k >> 6) & 63) | 128)),
              (e[f++] = (k & 63) | 128));
    }
    a = b;
    for (f = 0; f < e.length; f++) (a += e[f]), (a = Io(a, '+-a^+6'));
    a = Io(a, '+-3^+b+-f');
    a ^= Number(d[1]) || 0;
    0 > a && (a = (a & 2147483647) + 2147483648);
    a %= 1e6;
    return c + (a.toString() + '.' + (a ^ b));
}

function getCandidate(tran) {
    let words = [];
    if (tran[1]) words = words.concat(tran[1][0][1]);
    if (tran[5]) words = words.concat(tran[5][0][2].map(t => t[0]));
    return words;
}

export async function translate(word: string) {
    let lang = {
        from: 'en',
        to: 'zh-CN'
    };

    let matEng = word.match(/[a-zA-Z]/g);
    if (!matEng || matEng.length < word.length / 2) {
        lang = {
            to: 'en',
            from: 'zh-CN'
        };
    }

    let url = `https://translate.google.cn/translate_a/single?client=webapp&sl=${lang.from}&tl=${
        lang.to
    }&hl=en&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&otf=1&ssel=0&tsel=0&kc=1${tk(
        word,
        tkk
    )}&${querystring.stringify({ q: word })}`;

    try {
        console.log(url);
        const result = await asyncGet(url);

        const tranWord = JSON.parse(result);
        const candidate = getCandidate(tranWord);

        return {
            word: tranWord[0][0][0],
            candidate
        };
    } catch (err) {
        console.log('11111111', err);
        throw 'Translate failed, please check your network.';
    }
}

// translate('apple');

const uuu =
    'https://192.168.2.102:8888/translate_a/single?client=webapp&sl=en&tl=zh-CN&hl=en&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&otf=1&ssel=0&tsel=0&kc=1&tk=475500.119659&q=apple';
import * as request from 'request';
request.get(uuu, (e, r, user) => {
    console.log(e);
    console.log(r);
    console.log(user);
});
// https://translate.google.cn/translate_a/single?client=webapp&sl=en&tl=zh-CN&hl=en&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&otf=1&ssel=0&tsel=0&kc=1&tk=475500.119659&q=apple
