import {
    ExtensionContext,
    window,
    Hover,
    MarkdownString,
    languages,
    HoverProvider,
    TextDocument,
    ProviderResult,
    Position
} from 'vscode';
import { translate } from './translate';

async function activate(context: ExtensionContext) {
    console.log('Congratulations, your extension "vscode-translate" is now active!');
    // context.subscriptions.push(commands.registerCommand('extension.translate', translateCommand));
    registerHoverProvider(context);
    window.onDidChangeActiveTextEditor(
        e => {
            console.log('3333');
            e.document.getText(e.selection);
            window.showInformationMessage('1112');
        },
        undefined,
        context.subscriptions
    );

    window.onDidChangeTextEditorSelection(
        e => {
            console.log(e.textEditor.document.getText(e.textEditor.selection));
            // translateHover().then(context.subscriptions.push);
        },
        undefined,
        context.subscriptions
    );
}

exports.activate = activate;
function deactivate() {}
module.exports = {
    activate,
    deactivate
};
function translateCommand() {
    const editor = window.activeTextEditor;

    if (!editor) {
        return console.log('no open text editor!');
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection);
}

async function translateHover() {
    async function provideHover(document, position) {
        console.log(position.line);
        window.showInformationMessage(position.line);
        const selection = window.activeTextEditor.selection;
        const text = window.activeTextEditor.document.getText(selection);
        const ttext = await translate(text);

        const contents: MarkdownString = new MarkdownString();
        contents.isTrusted = true;
        return new Hover(ttext.candidate.join(','));
    }

    return languages.registerHoverProvider('*', {
        provideHover(document, position) {
            console.log(position);
            return provideHover(document, position);
        }
    });
}

function registerHoverProvider(context) {
    const provider = new TranslateHoverProvider();
    context.subscriptions.push(languages.registerHoverProvider('*', provider));
}

export class TranslateHoverProvider implements HoverProvider {
    provideHover(document: TextDocument, position: Position): ProviderResult<Hover> {
        const word = wordExtract(document, position);

        return translate(word).then(t => new Hover('ffdfd ' + t));
    }
}

function wordExtract(document: TextDocument, position: Position) {
    const line = position.line;
    const documentLine = document.lineAt(line).text;
    const linePoint = position.character;

    let words = [];
    let preWords = [];
    for (let i = 0; i <= documentLine.length; i++) {
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
    }
    return undefined;
    Promise;
}
