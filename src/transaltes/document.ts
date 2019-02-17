import {
    commands,
    ExtensionContext,
    workspace,
    TextDocumentContentProvider,
    Uri,
    window,
    EventEmitter,
    Event,
    TextDocumentChangeEvent
} from 'vscode';
import { translate } from '../google-transalte';

const scheme = 'vscode-googletran';
const previewUri = Uri.parse(`${scheme}://document`);

export function registerDocumentProvider(context: ExtensionContext) {
    const docProvider = new TransalteDocumentContentProvider();
    context.subscriptions.push(workspace.registerTextDocumentContentProvider(scheme, docProvider));

    workspace.onDidChangeTextDocument(
        (e: TextDocumentChangeEvent) => {
            if (e.document === window.activeTextEditor.document) {
                setTimeout(() => docProvider.update(previewUri), 500);
            }
        },
        null,
        context.subscriptions
    );

    context.subscriptions.push(
        commands.registerCommand('extension.translate.document', async () => {
            const doc = await workspace.openTextDocument(previewUri);
            await window.showTextDocument(doc, {
                preview: false,
                viewColumn: window.activeTextEditor.viewColumn + 1
            });
        })
    );
    context.subscriptions.push(docProvider);
}

class TransalteDocumentContentProvider implements TextDocumentContentProvider {
    private _onDidChange = new EventEmitter<Uri>();

    async provideTextDocumentContent(uri: Uri): Promise<string> {
        const editor = window.activeTextEditor;
        if (!editor) return '';

        const doc = editor.document;
        const lines = [];
        while (lines.length < doc.lineCount) {
            const s = doc.lineAt(lines.length).text;
            lines.push(s);
        }
        return (await translate(lines.join('\n'))).text;
    }
    get onDidChange(): Event<Uri> {
        return this._onDidChange.event;
    }
    public update(uri: Uri) {
        this._onDidChange.fire(uri);
    }

    dispose() {
        this._onDidChange.dispose();
    }
}
