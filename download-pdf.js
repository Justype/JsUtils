/**
 * 利用jsPDF 把图片汇总到一个pdf文件内
 */

// 注入jsPDF
var scriptJspdf = document.createElement('script');
scriptJspdf.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.1.1/jspdf.umd.min.js";
document.getElementsByTagName("head")[0].appendChild(scriptJspdf);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function savePdf(cssSelector, fileName = document.title) {
    const imgToPtRatio = 0.75;  // 图像的宽高到 pt 的比例

    const oImgs = document.querySelectorAll(cssSelector);
    const oImg = oImgs[0];

    const doc = new window.jspdf.jsPDF({
        orientation: oImg.naturalWidth > oImg.naturalHeight ? "l" : "p",    // 根据宽高比选择方向
        unit: "pt",
        format: [oImg.naturalWidth * imgToPtRatio, oImg.naturalHeight * imgToPtRatio],
        putOnlyUsedFonts: true, // 只使用 pdf
        compress: true
    });

    oImgs.forEach(async (imgElement, index) => {
        console.log("第" + (index + 1) + "页", "下载中。。。");
        if (index !== 0)
            doc.addPage([imgElement.naturalWidth * imgToPtRatio, imgElement.naturalHeight * imgToPtRatio],
                imgElement.naturalWidth > imgElement.naturalHeight ? "l" : "p");
        doc.addImage(imgElement, "png", 0, 0);
    });

    console.log("图片插入完毕，保存中");

    doc.save(fileName + ".pdf");
}

async function imgToPdf(cssSelector, fileName) {
    await sleep(500);   // 等待 jsPDF 注入
    let counter = 0;
    while (!window.jspdf) {
        if (counter > 5) {
            console.log("已等待5s，请检查网络");
            return;
        }
        counter++;
        console.log("jsPDF 未注入，等待1s");
        await sleep(1000);
    }
    savePdf(cssSelector, fileName);
}

function downloadYuKeTang(fileName) {
    imgToPdf("img.pptimg", fileName);
}
