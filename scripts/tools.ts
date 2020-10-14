export const pad = (str: string, length: number): string => {
    str = "0".repeat(length).substr(str.length) + str;
    return str;
};

export const binary_negation = (str: string, bin: string): string => {
    let newstr = "";
    for (let i = 0; i < str.length; ++i) {
        if (bin[i] === "0") {
            newstr += str[i] + "\u0305";
        } else {
            newstr += str[i];
        }
    }
    return newstr;
};

export const parse_equation = (str: string): string => {
    const syntax: { [key: string]: string } = {
        AND: "&",
        "\\.": "&",
        "&&": "&",
        XOR: "^",
        OR: "|",
        "\\+": "|",
        "\\|\\|": "|",
        NOT: "!",
    };

    Object.keys(syntax).forEach((l) => {
        str = str.replace(new RegExp(l, "g"), syntax[l]);
    });

    return str;
};
