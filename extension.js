const vscode = require('vscode');
const editor = vscode.window.activeTextEditor;

// the dictionary to translate from
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

/**
 * function that translates the code form russian into english
 */
async function translate () {
    let text = editor.document.getText(editor.selection)
    let newText = text.split('').map(el => dictionary[`${el}`] ? dictionary[`${el}`] : el).join('')
    let isTranslated = text === newText

    isTranslated 
        ? vscode.window.showErrorMessage(`Слово не было изменено!`)
            : vscode.window.showInformationMessage(`Слово успешно переведено!`)

    !isTranslated && editor.edit(editBuilder => {
        editBuilder.replace(editor.selection, newText)
    });
}

/**
 * function that sets a timer for your different purpuses
 */
async function setTimer() {
    let newInput = []
    let timeNumber = 0
    let hCoeff = 3600000
    let mCoeff = 60000
    let sCoeff = 1000
    let options = {
        password: false,
        placeHolder: "1h 1m 1s",
        prompt: "Введите время через которое хотите прекратить работу в правильном формате",
    }

    vscode.window.showInputBox(options).then(input => 
    {
        newInput = input.split(' ')
        
        timeNumber = newInput.reduce((acc, el) => {
            return el.split('').pop() === 'h' ? acc + Number.parseInt(el) * hCoeff 
                        : el.split('').pop() === 'm' ? acc + Number.parseInt(el) * mCoeff
                            :  acc + Number.parseInt(el) * sCoeff
        }, 0)
        console.log('Время:', timeNumber)
        setTimeout(() => vscode.window.showInformationMessage(`Время вышло! Вы поработали ${input} времени.`), timeNumber)
    })
}

/**
 * function that returns the total you have spent on coding
 * 
 * @param {Date} initialDate 
 */
async function getTotalTime(initialDate) {
    let resultTime = ''
    let currentDate = new Date()
    let timeDiff = (currentDate.getTime() - initialDate.getTime()) / 1000

    if (timeDiff >= 60) {
        resultTime = `${timeDiff / 60}m ${timeDiff % 60}s`
    } else {
        resultTime = `${timeDiff}s`
    }

    console.log(timeDiff, timeDiff/1000)
    vscode.window.showInformationMessage(`Вы проработали уже ${resultTime} времени!`)
}

/**
 * function that activates the extension
 * @param context 
 */
function activate(context) {
    var initialDate = new Date()

    let translation = vscode.commands.registerCommand('extension.translate', function () {
        translate()
    });
    context.subscriptions.push(translation)

    let timer = vscode.commands.registerCommand('extension.setTimer', function () {
        setTimer()
    });
    context.subscriptions.push(timer)

    let totalTime = vscode.commands.registerCommand('extension.totalTime', function () {
        getTotalTime(initialDate)
    });
    context.subscriptions.push(totalTime)
}
exports.activate = activate

/**
 * function that deactivates the extension
 * @param context 
 */
function deactivate(context) {}
exports.deactivate = deactivate