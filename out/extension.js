"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const catcoding_1 = require("./catcoding");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "learn-vscode" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('learn-vscode.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        let ans = vscode.window.showInformationMessage('Hello World from learn_vscode!', "Good", "Bad").then((ans) => {
            if (ans === "Good") {
                console.log("Good Selected");
            }
            else {
                console.log("Bad or undefined");
            }
        });
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(vscode.commands.registerCommand('catCoding.start', () => {
        catcoding_1.CatCodingPanel.createOrShow(context.extensionUri);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('catCoding.doRefactor', () => {
        if (catcoding_1.CatCodingPanel.currentPanel) {
            catcoding_1.CatCodingPanel.currentPanel.doRefactor();
        }
    }));
    if (vscode.window.registerWebviewPanelSerializer) {
        // Make sure we register a serializer in activation event
        vscode.window.registerWebviewPanelSerializer(catcoding_1.CatCodingPanel.viewType, {
            deserializeWebviewPanel(webviewPanel, state) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log(`Got state: ${state}`);
                    // Reset the webview options so we use latest uri for `localResourceRoots`.
                    webviewPanel.webview.options = catcoding_1.getWebviewOptions(context.extensionUri);
                    catcoding_1.CatCodingPanel.revive(webviewPanel, context.extensionUri);
                });
            }
        });
    }
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map