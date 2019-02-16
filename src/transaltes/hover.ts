import { Hover, languages, HoverProvider, TextDocument, ProviderResult, Position, window } from 'vscode';
import * as googleTransalte from '../google-transalte';

export function registerHoverProvider(context) {
    const provider = new TranslateHoverProvider();
    context.subscriptions.push(languages.registerHoverProvider('*', provider));
}

class TranslateHoverProvider implements HoverProvider {
    async provideHover(document: TextDocument, position: Position): Promise<Hover> {
        const word = wordExtract(document, position);
        if (!word) return undefined;
        const t = await googleTransalte.translate(word).then(ff => new Hover('ffdfd ' + ff.text));
        return t;
        // .catch(window.showErrorMessage)
    }
}

function wordExtract(document: TextDocument, position: Position) {
    const line = position.line;
    const documentLine = document.lineAt(line).text;
    const lineLength = documentLine.length;
    const linePoint = position.character;

    let words = [];
    let preWords = [];
    for (let i = 0; i <= lineLength; i++) {
        const w = documentLine[i];
        if (/[a-zA-Z]/.test(w)) {
            words.push(w);
        } else {
            preWords = words;
            words = [];
        }

        if (i >= linePoint && words.length === 0) {
            return preWords.join('');
        }
        if (lineLength === i) {
            return words.join('');
        }
    }
    return undefined;
}
