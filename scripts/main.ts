import { decimal_to_binary, binary_to_decimal } from "./conversor";
import { generate_table, generate_kmap } from "./generator";
import { draw_table, draw_kmap } from "./render";

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

    const binary_to_decimal_in = <HTMLInputElement>(
        document.getElementById("binary-to-decimal-in")
    );
    binary_to_decimal_in.addEventListener("change", () => {
        const num = binary_to_decimal_in.value;
        const out = <HTMLSpanElement>(
            document.getElementById("binary-to-decimal-out")
        );

        out.innerHTML = binary_to_decimal(num).toString();
    });

    const equation_submit = <HTMLButtonElement>(
        document.getElementById("equation-submit")
    );
    equation_submit.addEventListener("click", () => {
        const equation_in = <HTMLInputElement>(
            document.getElementById("equation-in")
        );
        const equation = equation_in.value;

        const table = generate_table(equation);
        const kmap = generate_kmap(table);
        draw_table(table);
        draw_kmap(kmap);
    });
});
