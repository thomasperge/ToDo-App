function getValue() {
    // Sélectionner l'élément input et récupérer sa valeur
    // var input = document.getElementById("taskInputText").value;
    // Afficher la valeur
    // return input

    let input = document.getElementById("taskInputText")
    input?.addEventListener("click", () => {
        return input.value
    })
}

// export function getValue() {}