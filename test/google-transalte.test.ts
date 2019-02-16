import * as gt from '../src/google-transalte';
import * as gtt from '../src/util/requests';

// test('apple === 苹果', async () => {
//     const result = (await gt.translate('apple')).text;
//     expect(result).toBe('苹果');
// });

test('five === 五', async () => {
    const result = await gt.translate('five');
    expect(result.text).toBe('五');
});

test('apple === 苹果', async () => {
    const result = await gt.translate('apple');
    expect(result.text).toBe('苹果');
});

// const body = `[[["五", "five", null, null, 2], [null, null, "Wǔ", "fīv"]], [["noun", ["五"], [["五", ["five"], null, 0.32976499]], "five", 1], ["", ["五", "伍"], [["五", ["five"], null, 0.32976499], ["伍", ["five"], null, 0.00010890877]], "five", 15]], "en", null, null, [["five", null, [["五", 1000, true, false]], [[0, 4]], "five", 0, 0]], 1, null, [["en"], null, [1], ["en"]], null, null, [["noun", [[["quintet", "pentad", "phoebe", "quintuplet", "fivesome", "fin", "v", "cinque", "quint"], ""], [["five-spot"], ""]], "five"], ["", [[["quintet", "fivesome", "quintuplets", "pentad"], "m_en_us1247422.002"]], "five"]], [["", [["equivalent to the sum of two and three; one more than four, or half of ten; 5.", "m_en_us1247422.001", "a circlet of five petals"]], "five"]], [[["Mark now stretches out four or <b>five</b> days a week for up to half an hour each day.", null, null, null, 3, "m_en_us1247422.001"], ["Mariam had become blind at the age of <b>five</b> as a result of measles.", null, null, null, 3, "m_en_us1247422.003"], ["do you have them in size <b>five</b>?", null, null, null, 3, "neid_7257"], ["in the year <b>five</b> sixty-two", null, null, null, 3, "neid_7249"], ["Her size <b>five</b> Wellingtons, mac and hat were in the hall as if waiting for her to put them on.", null, null, null, 3, "m_en_us1247422.005"], ["More than half the children were still-born; most others died before they reached the age of <b>five</b> .", null, null, null, 3, "m_en_us1247422.003"], ["<b>five</b> per cent", null, null, null, 3, "neid_7247"], ["New magazines and newspaper supplements devoted to design have risen in number in the last <b>five</b> years.", null, null, null, 3, "m_en_us1247422.001"], ["<b>five</b> litres of fuel", null, null, null, 3, "neid_7256"], ["<b>five</b> of his horses are sick", null, null, null, 3, "neid_7250"], ["he met <b>five</b> of the staff", null, null, null, 3, "neid_7251"], ["part <b>five</b> of the course", null, null, null, 3, "neid_7254"], ["<b>five</b> of them are qualified", null, null, null, 3, "neid_7251"], ["at the beginning of chapter <b>five</b>", null, null, null, 3, "neid_7254"], ["in <b>five</b> thirteen", null, null, null, 3, "neid_7249"], ["the <b>five</b> of diamonds", null, null, null, 3, "neid_7259"], ["that's <b>five</b> of them", null, null, null, 3, "neid_7250"], ["ring extension nine seven <b>five</b>", null, null, null, 3, "neid_7246"], ["One day when he was about <b>five</b> and I was six or seven, we took a walk to the park by ourselves.", null, null, null, 3, "m_en_us1247422.003"], ["he needs a double <b>five</b>", null, null, null, 3, "neid_7258"], ["Now there were just four points between the teams with <b>five</b> minutes of the half remaining.", null, null, null, 3, "m_en_us1247422.001"], ["The other <b>five</b> slept on a bunk bed, the old couple down and the other three up.", null, null, null, 3, "m_en_us1247422.002"], ["The referee had to add on over <b>five</b> minutes in each half to allow for balls to be retrieved.", null, null, null, 3, "m_en_us1247422.001"], ["she's a size <b>five</b>", null, null, null, 3, "neid_7257"], ["there were <b>five</b> women", null, null, null, 3, "neid_7253"], ["it starts at <b>five</b>", null, null, null, 3, "neid_7248"], ["I'll call four or <b>five</b> more", null, null, null, 3, "neid_7251"], ["<b>five</b> of Sweden's top financial experts", null, null, null, 3, "m_en_gb0299650.001"], ["it weighs <b>five</b> kilograms", null, null, null, 3, "neid_7256"], ["give me four or <b>five</b> more", null, null, null, 3, "neid_7250"]]]]`;

// test('format', async () => {
//     const result = await gt.format(body);
//     // const result = await gt.tttt('five');

//     // expect(JSON.parse(result)[0][0][0]).toBe('五');
// });
