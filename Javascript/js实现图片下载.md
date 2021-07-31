JavaScript实现图片下载，其实就是构造了一个a标签，然后模拟点击实现的。
具体实现如下：
```js
<img  src='src' data-name='自定义名称'><script>//js实现图片下载
function download(){
        var name = $('#downImg').attr("data-name");
        var url = $('#downImg').attr("src");
        var a = document.createElement('a')  
        var event = new MouseEvent('click')  
        a.download = name || '下载图片名称'  
        a.href = url  
        a.dispatchEvent(event)  
}</script>
```