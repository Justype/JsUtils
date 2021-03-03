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


function normal_to_chemical(text) {
    return text.replace(/[\w\d][\+\-]/g, c => c[0] + Superscript[c[1]])
        .replace(/\w\d+/g, c => {
            r = c[0];
            for (let i = 1; i < c.length; i++)
                r += Subscript[c[i]];
            return r;
        });
}