const input = 
document.querySelector('input[type="file"]')
input.addEventListener('change', function(e) {
    console.log(input.files)
    const reader = new FileReader(input.files)
    reader.onload = function (){
        console.log(reader.result)
    }
    reader.readAsArrayBuffer(input.files[0])
}, false)