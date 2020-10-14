import { generate_table, generate_kmap } from "./generator";
import { render_table } from "./render";

document.addEventListener("DOMContentLoaded", () => {
    const logic_submit = <HTMLButtonElement>(
        document.getElementById("logic-submit")
    );

    logic_submit.addEventListener("click", () => {
        const input = <HTMLInputElement>(
            document.getElementById("logic-expression")
        );
        const equation = input.value;

        const table = generate_table(equation);
        const kmap = generate_kmap(table);

        console.log(table.outputs, kmap.outputs);
        render_table(table);
    });
});
