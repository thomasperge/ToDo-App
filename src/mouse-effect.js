const fileSelector = document.getElementById('file');
const imageSelected = document.getElementById('display-image')
const imageArea = document.getElementById("display-image-area")

fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    console.log(fileList[0].path)
    imageSelected.setAttribute("src", fileList[0].path)
    imageArea.style = "display: flex;"
});
