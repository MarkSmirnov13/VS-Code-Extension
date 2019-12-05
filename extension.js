const vscode = require('vscode');
const editor = vscode.window.activeTextEditor;

const dictionary = {
    "а": "f",
    "А": "F",
    "б": ",",
    "Б": "<",
    "в": "d",
    "В": "D",
    "г": "u",
    "Г": "U",
    "д": "l",
    "Д": "L",
    "е": "t",
    "Е": "T",
    "ё": "\\",
    "Ё": "|",
    "ж": ";",
    "Ж": ":",
    "з": "p",
    "З": "P",
    "и": "b",
    "И": "B",
    "й": "q",
    "Й": "Q",
    "к": "r",
    "К": "R",
    "л": "k",
    "Л": "K",
    "м": "v",
    "М": "V",
    "н": "y",
    "Н": "Y",
    "о": "j",
    "О": "J",
    "п": "g",
    "П": "G",
    "р": "h",
    "Р": "H",
    "с": "c",
    "С": "C",
    "т": "n",
    "Т": "N",
    "у": "e",
    "У": "E",
    "ф": "a",
    "Ф": "A",
    "x": "[",
    "Х": "{",
    "ц": "w",
    "Ц": "W",
    "ч": "x",
    "Ч": "X",
    "ш": "i",
    "Ш": "I",
    "щ": "o",
    "Щ": "O",
    "ъ": "]",
    "Ъ": "}",
    "ы": "s",
    "Ы": "S",
    "ь": "m",
    "Ь": "M",
    "э": "'",
    "Э": "\"",
    "ю": ".",
    "Ю": ">",
    "я": "z",
    "Я": "Z",
}

async function translate () {
    let text = editor.document.getText(editor.selection)
    let newText = text.split('').map(el => dictionary[`${el}`] ? dictionary[`${el}`] : el).join('')
 
    vscode.window.showInformationMessage(`Слово успешно переведено!`);
    editor.edit(editBuilder => {
        editBuilder.replace(editor.selection, newText);
    });
}

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.translate', function () {
        translate()
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate(context) {}
exports.deactivate = deactivate;