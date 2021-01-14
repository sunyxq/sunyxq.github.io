# 上传图片

## js实现图片上传
```html
<label class="upload">
    <input type="file" id="uploadImg" style="display: none;">
    点击上传
  </label>
  <style>
    .upload {
      cursor: pointer;
      border: 1px dashed #eee;
      padding: 6px 10px;
    }
  </style>
```
```js
// 监听选择图片
document.querySelector('#uploadImg').addEventListener('change', function(event) {
  
  let file = event.target.files[0]
  console.log(file, '===========');
  let fileReader = new FileReader()
  fileReader.readAsDataURL(file)

  fileReader.onload = function() {
    console.log(fileReader === this);
    let url = fileReader.result
    console.log(url, '======+++++++++++=');
    setImgUrl(url, 'origin')
    compressImg(url)
  }
})

/**
 * 设置显示图片
 * @param {String} url 
 * @param {String} el 
 */
function setImgUrl(url, el) {
  document.querySelector(`#${el}`).setAttribute('src', url)
}

function compressImg(url) {
  let img = new Image()
  img.src = url
  img.onload = function() {
    console.log(img.width, img.height, this.width, this === img);
    var w = this.width,
        h = this.height
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')

    // var anw = document.createAttribute("width");
    // anw.nodeValue = 300;
    // var anh = document.createAttribute("height");
    // anh.nodeValue = 200;
    // canvas.setAttributeNode(anw);
    // canvas.setAttributeNode(anh);
    canvas.width = 300
    canvas.height = 200

    ctx.drawImage(img, 0, 0, 300, 200)
    let base64 = canvas.toDataURL('image/jpeg', 1)
    console.log(base64, base64.length);
    
    setImgUrl(base64, 'img')
  }
}
```
`FileReader`对象允许`Web`应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用`File`或`Blob`对象指定要读取的文件或数据。




## 参考
1. [使用 JavaScript 压缩和翻转图片](https://learnku.com/articles/31706)
2. 