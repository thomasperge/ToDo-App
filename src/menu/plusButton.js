const fs = require('fs')

const ADD = document.getElementById("add")
ADD.addEventListener("click", loadAddWindows)

/**
 * Fonction to load Stats Page
 * @function
 */
 function loadAddWindows(){
    const customer = {
        name3: "Newbie Co.",
        order_count3: 9,
        address3: "Po Box City",
    }

    const jsonString = JSON.stringify(customer)
    
    fs.writeFileSync('data.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
}
