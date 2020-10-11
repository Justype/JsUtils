function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 用 fetch 获取资源， a 标签的click() 触发下载
function downloadFile(urlString, fileName) {
    fetch(urlString).then(async response => {
        const link = document.createElement('a');
        const blob = await response.blob();
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
        link.remove();
    });
}

async function downloadImgs(imgName, startIndex, imgSelector, extension) {
    imgName = imgName || document.title;
    startIndex = startIndex || 0;
    extension = extension || ".jpg";
    const imgList = document.querySelectorAll(imgSelector);

    for (let i = 0; i < imgList.length; i++) {
        const img = imgList[i];
        const urlString = img.src;
        const fileName = imgName + (startIndex + i + 1) + extension;
        downloadFile(urlString, fileName);
        await sleep(200);   // 防止连接数过多，下一半停止
    }
}

async function downloadYukeTang(pptName, startIndex = 0)
{
   await downloadImgs(pptName, startIndex, "img.pptimg");
}
