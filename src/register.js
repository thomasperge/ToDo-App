// const fileSelector = document.getElementById('file');
// const usernameSelector = document.getElementById('input-username')
// const namePicture = document.getElementById("namePicture")

// const registerButton = document.getElementById("register-button")
// var imageDone = false

// fileSelector.addEventListener('change', (event) => {
//     const fileList = event.target.files;

//     if(fileList[0].size <= 1820000) {
//         namePicture.innerHTML = fileList[0].name
//         namePicture.style = "display: block;"
//         imageDone = true
//     } else {
//         namePicture.innerHTML = "File too big, please take a new one..."
//         namePicture.style = "display: flex;"
//     }
// });

// registerButton.addEventListener('click', function() {
//     if(imageDone && usernameSelector.value.length >= 0) {
//         console.log(imageDone, usernameSelector.value)
//     }
// })