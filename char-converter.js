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


function normal_to_chemical(string) {
    return string.replace(/[\w\d][\+\-]/g, c => c[0] + Superscript[c[1]])
                 .replace(/\d/g, c => Subscript[c]);
}