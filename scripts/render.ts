import { pad } from "./tools";
import { ITable } from "./interfaces";

export const render_table = (table_info: ITable) => {
    const { vars, outputs } = table_info;
    const table = <HTMLElement>document.getElementById("logic-table");

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
