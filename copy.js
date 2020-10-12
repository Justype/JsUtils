function copyText(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert("复制成功");
        });
    }
    else {
        const textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        textarea.value = text;
        textarea.focus();
        textarea.select();
        if (document.execCommand('copy'))
            alert("复制成功");
        textarea.remove();
    }
}

async function getTextFromFile(fileUrl) {
    return fetch(fileUrl).then(r => r.text());
}

async function copyTextFromFile(fileUrl){
    copyText(await getTextFromFile(fileUrl));
}
