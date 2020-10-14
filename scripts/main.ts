import { decimal_to_binary } from "./converter";
import { generate_table, generate_kmap } from "./generator";
import { render_table } from "./render";

document.addEventListener("DOMContentLoaded", () => {
    const decimal_to_binary_in = <HTMLInputElement>(
        document.getElementById("decimal-to-binary-in")
    );
    decimal_to_binary_in.addEventListener("change", () => {
        const num = parseInt(decimal_to_binary_in.value);
        const out = <HTMLSpanElement>(
            document.getElementById("decimal-to-binary-out")
        );

        out.innerHTML = decimal_to_binary(num);
    });

    const equation_in = <HTMLInputElement>(
        document.getElementById("equation-in")
    );
    equation_in.addEventListener("change", () => {
        const equation = equation_in.value;

        try {
            const table = generate_table(equation);
            const kmap = generate_kmap(table);
            render_table(table);
        } catch {
            console.log("Error");
        }
    });
});
