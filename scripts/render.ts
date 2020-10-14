import { pad, binary_negation } from "./tools";
import { decimal_to_gray } from "./conversor";
import { ITable } from "./types";

export const draw_table = (table_info: ITable) => {
    const { vars, outputs } = table_info;
    const table = <HTMLElement>document.getElementById("equation-table");

    table.innerHTML = "";

    let tr = document.createElement("tr");
    for (let i = 0; i < vars.length; ++i) {
        let th = document.createElement("th");
        th.innerHTML = vars[i];
        tr.appendChild(th);
    }

    let th = document.createElement("th");
    th.innerHTML = "S";
    tr.appendChild(th);
    table.appendChild(tr);

    for (let i = 0; i < outputs.length; ++i) {
        let tr = document.createElement("tr");
        let bin = i.toString(2);
        bin = pad(bin, vars.length);
        for (let j = 0; j < vars.length; ++j) {
            let td = document.createElement("td");
            td.innerHTML = bin[j];
            tr.appendChild(td);
        }

        let td = document.createElement("td");
        td.innerHTML = outputs[i].toString();
        tr.appendChild(td);
        table.appendChild(tr);
    }
};

export const draw_kmap = (kmap: ITable) => {
    const { vars, outputs } = kmap;
    const cols = Math.floor(vars.length / 2);
    const lines = vars.length - cols;

    const table = <HTMLElement>document.getElementById("equation-kmap");

    table.innerHTML = "";

    const col_vars = vars.slice(lines).join("");
    let tr = document.createElement("tr");
    tr.appendChild(document.createElement("td"));
    for (let i = 0; i < cols * 2; ++i) {
        let th = document.createElement("th");
        th.innerHTML = binary_negation(
            col_vars,
            pad(decimal_to_gray(i), lines)
        );
        tr.appendChild(th);
    }
    table.appendChild(tr);

    const line_vars = vars.slice(0, lines).join("");
    for (let i = 0; i < lines * 2; ++i) {
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.innerHTML = binary_negation(
            line_vars,
            pad(decimal_to_gray(i), lines)
        );
        tr.appendChild(th);

        for (let j = 0; j < cols * 2; ++j) {
            let td = document.createElement("td");
            td.innerHTML = outputs[i * (cols * 2) + j].toString();
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
};
