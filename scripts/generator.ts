import { parse_equation, pad } from "./tools";
import {
    decimal_to_binary,
    binary_to_decimal,
    decimal_to_gray,
} from "./conversor";

import { ITable, ITest } from "./types";

export const generate_table = (eq: string): ITable => {
    let vars: string[] = [];
    const outputs: number[] = [];

    eq = parse_equation(eq.toUpperCase());
    for (let i = 0; i < eq.length; ++i) {
        let c = eq.charAt(i);
        if (c.toLowerCase() != c && !vars.includes(c)) {
            vars.push(c);
            eq = eq.replace(new RegExp(c, "g"), `tests.${c}`);
        }
    }

    vars = vars.sort();
    for (let i = 0; i < 2 ** vars.length; ++i) {
        let binary = decimal_to_binary(i);
        const tests: ITest = {};

        binary = pad(binary, vars.length);

        for (let j = 0; j < vars.length; ++j) {
            tests[vars[j]] = +binary[j];
        }

        outputs.push(Function("tests", `return ${eq}`)(tests));
    }

    return { vars, outputs };
};

export const generate_kmap = (table: ITable): ITable => {
    const { vars, outputs } = table;
    const karnaugh = [];

    const cols = Math.floor(vars.length / 2);
    const lines = vars.length - cols;

    for (let i = 0; i < 2 ** lines; ++i) {
        let x = pad(decimal_to_gray(i), lines);
        for (let j = 0; j < 2 ** cols; ++j) {
            let y = pad(decimal_to_gray(j), cols);
            let index = binary_to_decimal(x.concat(y));
            karnaugh.push(outputs[index]);
        }
    }
    return { vars, outputs: karnaugh };
};
