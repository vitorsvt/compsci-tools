document.addEventListener("DOMContentLoaded", () => {
    function pad_number(number, length) {
        number = "0".repeat(length).substr(number.length) + number;
        return number;
    }

    function decimal_to_gray(number) {
        number = (number ^ (number >>> 1)).toString(2);
        return number;
    }

    function binary_to_decimal(number) {
        number = parseInt(number, 2);
        return number;
    }

    function parse_equation(string) {
        const syntax = {
            // AND
            AND: "&",
            "\\.": "&",
            "&&": "&",
            // XOR
            XOR: "^",
            // OR
            OR: "|",
            "\\+": "|",
            "\\|\\|": "|",
            // NOT
            NOT: "!",
        };

        Object.keys(syntax).forEach((l) => {
            string = string.replace(new RegExp(l, "g"), syntax[l]);
        });

        return string;
    }

    function generate_table(equation) {
        let vars = [];
        let outputs = [];

        equation = parse_equation(equation.toUpperCase());

        for (let i = 0; i < equation.length; ++i) {
            let c = equation.charAt(i);

            if (c.toLowerCase() != c && !vars.includes(c)) {
                vars.push(c);
                equation = equation.replace(new RegExp(c, "g"), `tests.${c}`);
            }
        }

        vars = vars.sort();

        for (let i = 0; i < 2 ** vars.length; ++i) {
            let binary = i.toString(2);
            binary = pad_number(binary, vars.length);

            let tests = {};
            for (let j = 0; j < vars.length; ++j) {
                tests[vars[j]] = +binary[j];
            }

            outputs.push(Function("tests", `return ${equation}`)(tests));
        }

        return { vars, outputs };
    }

    function render_table(table) {
        const { vars, outputs } = table;

        const table_el = document.getElementById("logic-table");
        table_el.innerHTML = "";

        let tr = document.createElement("tr");
        for (let i = 0; i < vars.length; ++i) {
            let th = document.createElement("th");
            th.innerHTML = vars[i];
            tr.appendChild(th);
        }

        let th = document.createElement("th");
        th.innerHTML = "S";
        tr.appendChild(th);

        table_el.appendChild(tr);

        for (let i = 0; i < outputs.length; ++i) {
            let tr = document.createElement("tr");
            let bin = i.toString(2);
            bin = pad_number(bin, vars.length);

            for (let j = 0; j < vars.length; ++j) {
                let td = document.createElement("td");

                td.innerHTML = bin[j];
                tr.appendChild(td);
            }

            let td = document.createElement("td");
            td.innerHTML = outputs[i];
            tr.appendChild(td);

            table_el.appendChild(tr);
        }
    }

    function generate_karnaugh(table) {
        let { vars, outputs } = table;

        let karnaugh = [];

        let cols = Math.floor(vars.length / 2);
        let lines = vars.length - cols;

        for (let i = 0; i < lines * 2; ++i) {
            let x = pad_number(decimal_to_gray(i), lines);

            for (let j = 0; j < cols * 2; ++j) {
                let y = pad_number(decimal_to_gray(j), cols);

                let index = binary_to_decimal(x.concat(y));

                karnaugh.push(outputs[index]);
            }
        }

        return { vars, karnaugh };
    }

    document.getElementById("logic-submit").addEventListener("click", () => {
        const equation = document.getElementById("logic-expression").value;
        const table = generate_table(equation);
        const map = generate_karnaugh(table);

        console.log(table.outputs, map.karnaugh);

        render_table(table);
    });
});
