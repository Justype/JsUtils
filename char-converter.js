class Subscript { }
Subscript["0"] = "₀";
Subscript["1"] = "₁";
Subscript["2"] = "₂";
Subscript["3"] = "₃";
Subscript["4"] = "₄";
Subscript["5"] = "₅";
Subscript["6"] = "₆";
Subscript["7"] = "₇";
Subscript["8"] = "₈";
Subscript["9"] = "₉";

class Superscript { }
Superscript["+"] = "⁺";
Superscript["＋"] = "⁺";
Superscript["-"] = "⁻";

class ReplaceList { }
ReplaceList["升高"] = "↑";
ReplaceList["上升"] = "↑";
ReplaceList["增加"] = "↑";
ReplaceList["下降"] = "↓";
ReplaceList["降低"] = "↓";
ReplaceList["减少"] = "↓";
ReplaceList["高于正常"] = "↑";
ReplaceList["大于正常"] = "↑";
ReplaceList["少于正常"] = "↓";
ReplaceList["低于正常"] = "↓";
ReplaceList["小于正常"] = "↓";
// ReplaceList["高于"] = ">";
// ReplaceList["大于"] = ">";
// ReplaceList["少于"] = "<";
// ReplaceList["低于"] = "<";
// ReplaceList["小于"] = "<";
ReplaceList[">="] = "≥";
ReplaceList["<="] = "≤";

function normalToChemical(text) {
    return text.replace(/(?<=([a-zA-Z]\d*))[＋\+\-]/g, c => Superscript[c]) // 识别 字母后面的 + -
        // 化学符号的 数字前面一定有字母
        .replace(/(?<=[a-zA-Z])\d+/g, c => {
            r = "";
            for (let i = 0; i < c.length; i++)
                r += Subscript[c[i]];
            return r;
        });
}

function fixAndToChemical(text) {
    let fixText = text.replace(/c[1l]/ig, "Cl") // 目前只发现 Cl 可能拼错
        .replace("HC03-", "HCO₃⁻");
    return normalToChemical(fixText);
}

function replaceSomeWord(text){
    return text.replace(/(升高|上升|增加|下降|降低|减少|高于正常|大于正常|少于正常|低于正常|小于正常|>=|<=)/g, c => ReplaceList[c]);
}

//   .replace(/(?<=[\u4e00-\u9fa5，（《])[\n ]+(?=[\u4e00-\u9fa5，、）》])/g, ""); // 去除中文间 多余的换行和空格
//   .replace(/(?<![\.。;；:：])[\n]+/g, ""); // 去除多余的换行