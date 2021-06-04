// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { CatCodingPanel, getWebviewOptions } from './catcoding';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "learn-vscode" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('learn-vscode.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		let ans = vscode.window.showInformationMessage('Hello World from learn_vscode!',"Good","Bad").then(
			(ans)=>{
				if(ans === "Good"){
					console.log("Good Selected");
				}
				else{
					console.log("Bad or undefined");
				}
			}
		);
	});

	context.subscriptions.push(disposable);


	context.subscriptions.push(
		vscode.commands.registerCommand('catCoding.start', () => {
			CatCodingPanel.createOrShow(context.extensionUri);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('catCoding.doRefactor', () => {
			if (CatCodingPanel.currentPanel) {
				CatCodingPanel.currentPanel.doRefactor();
			}
		})
	);

	if (vscode.window.registerWebviewPanelSerializer) {
		// Make sure we register a serializer in activation event
		vscode.window.registerWebviewPanelSerializer(CatCodingPanel.viewType, {
			async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
				console.log(`Got state: ${state}`);
				// Reset the webview options so we use latest uri for `localResourceRoots`.
				webviewPanel.webview.options = getWebviewOptions(context.extensionUri);
				CatCodingPanel.revive(webviewPanel, context.extensionUri);
			}
		});
	}
}

// this method is called when your extension is deactivated
export function deactivate() {}
