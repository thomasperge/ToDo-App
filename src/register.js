const fileSelector = document.getElementById('file');
const imageSelected = document.getElementById('display-image')
const imageArea = document.getElementById("display-image-area")
const namePicture = document.getElementById("namePicture")

fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;

    if(fileList[0].size <= 1820000) {
        namePicture.innerHTML = fileList[0].name
        namePicture.style = "display: block;"
    } else {
        namePicture.innerHTML = "File too big, please take a new one..."
        namePicture.style = "display: flex;"
    }
});
