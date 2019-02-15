import * as gt from '../src/google-transalte';

test('apple === 苹果', async () => {
    const result = (await gt.translate('apple')).text;
    expect(result).toBe('苹果');
});
