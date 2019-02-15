import {
    ExtensionContext,
    window,
    Hover,
    MarkdownString,
    languages,
    commands,
    HoverProvider,
    TextDocument,
    ProviderResult,
    Position
} from 'vscode';
import * as googleTransalte from './google-transalte';

export async function activate(context: ExtensionContext) {
    console.log('Congratulations, your extension "vscode-translate" is now active!');
    context.subscriptions.push(commands.registerCommand('extension.translate', translateCommand));
    registerHoverProvider(context);
}

export function deactivate() {}

function translateCommand() {
    const editor = window.activeTextEditor;

    if (!editor) {
        return console.log('no open text editor!');
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection);
    googleTransalte.translate(text).then(t => window.showInformationMessage(t.text));
}

function registerHoverProvider(context) {
    const provider = new TranslateHoverProvider();
    context.subscriptions.push(languages.registerHoverProvider('*', provider));
}

export class TranslateHoverProvider implements HoverProvider {
    provideHover(document: TextDocument, position: Position): ProviderResult<Hover> {
        const word = wordExtract(document, position);
        if (!word) return undefined;
        return googleTransalte.translate(word).then(ff => new Hover('ffdfd ' + ff.text));
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
