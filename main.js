let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");
let download = document.getElementById("download");
let reset = document.querySelector("span");
let filters = document.querySelectorAll("ul li input");
let upload = document.getElementById("upload");
let img = document.getElementById("img");
let imgBox = document.querySelector(".img-box");
//Canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
//Reset Value
function resetValue() {
    ctx.filter = "none";
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    saturate.value = "100";
    contrast.value = "100";
    brightness.value = "100";
    sepia.value = "0";
    grayscale.value = "0";
    blur.value = "0";
    hueRotate.value = "0";
}

window.onload = ()=> {
    imgBox.style.display = "none";
    download.style.display = "none";
    reset.style.display = "none";
}
//Upload Function
upload.onchange = ()=> {
    resetValue();
    imgBox.style.display = "block";
    download.style.display = "block";
    reset.style.display = "block";
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = ()=> {
        img.src = file.result;
    }
    img.onload = ()=> {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        img.style.display= "none"
    }
}
//Filtters Function
filters.forEach(filter =>{
    filter.addEventListener("input", ()=>{
        ctx.filter = `
            saturate(${saturate.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value})
            grayscale(${grayscale.value})
            blur(${blur.value}px)
            hue-rotate(${hueRotate.value}deg)
        `
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
    })
})
//Download Function
download.onclick = ()=> {
    download.href = canvas.toDataURL('image/jpeg');
}