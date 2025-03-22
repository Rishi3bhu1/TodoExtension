// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { HelloWorldPanel } from './HelloWorldPanel';
import { SidebarProvider } from './SidebarProvider';
import path from 'path'
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function openWebview(context: vscode.ExtensionContext, title: string, entry: string) {
    const panel = vscode.window.createWebviewPanel(
        'customWebview',
        title,
        vscode.ViewColumn.One,
        {
            enableScripts: true,
        }
    );

    const webviewUri = panel.webview.asWebviewUri(vscode.Uri.file(
        path.join(context.extensionPath, 'webviews/build', `assets/${entry}.js`)
    ));

    panel.webview.html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${title}</title>
        </head>
        <body>
            <div id="${entry}-root"></div>
            <script type="module" src="${webviewUri}"></script>
        </body>
        </html>`;
}

export function activate(context: vscode.ExtensionContext) {

	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider('vstodo-sidebar',sidebarProvider)
	)
	context.subscriptions.push(vscode.commands.registerCommand('todo.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		HelloWorldPanel.createOrShow(context.extensionUri);
	})
	);
	context.subscriptions.push(vscode.commands.registerCommand('extension.showSidebar', () => {
		openWebview(context, 'Sidebar', 'sidebar');
	}));
	context.subscriptions.push(vscode.commands.registerCommand('extension.showTools', () => {
		openWebview(context, 'Tools', 'tools');
	}));
	context.subscriptions.push(vscode.commands.registerCommand('todo.refresh',()=>{
		HelloWorldPanel.kill()
		HelloWorldPanel.createOrShow(context.extensionUri);
	}))
}

// This method is called when your extension is deactivated
export function deactivate() {}
