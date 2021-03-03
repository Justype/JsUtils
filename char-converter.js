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
Superscript["-"] = "⁻";


function normalToChemical(text) {
    return text.replace(/[\w\d][\+\-]/g, c => c[0] + Superscript[c[1]]) // 识别 数字、字母后面的
        .replace(/\w\d+/g, c => {
            r = c[0];
            for (let i = 1; i < c.length; i++)
                r += Subscript[c[i]];
            return r;
        });
}

function fixAndToChemical(text) {
    let fixText = text.replace(/c[1l]/ig, "Cl") // 目前只发现 Cl 可能拼错
                    //   .replace(/(?<=[\u4e00-\u9fa5，（《])[\n ]+(?=[\u4e00-\u9fa5，、）》])/g, ""); // 去除中文间 多余的换行和空格
                      .replace(/(?<![\.。;；:：])[\n]+/g, ""); // 去除多余的换行
    return normalToChemical(fixText);
}