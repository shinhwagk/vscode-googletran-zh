import { ExtensionContext } from 'vscode';
import { registerDocumentProvider } from './transaltes/document';
import { registerHoverProvider } from './transaltes/hover';
import { registerSelectionProvider } from './transaltes/selection';

export async function activate(context: ExtensionContext) {
    console.log('Congratulations, your extension "vscode-translate" is now active!');

    registerHoverProvider(context);
    registerDocumentProvider(context);
    registerSelectionProvider(context);
}

export function deactivate() {}
