function handleStart(id){
    // 判断浏览器是否支持websocket
    let CreateWebSocket = (function () {
      return function (urlValue) {
        if (window.WebSocket) return new WebSocket(urlValue);
        if (window.MozWebSocket) return new MozWebSocket(urlValue);
        return false;
      }
    })()
    // 创建一个websocket
    let webSocket = CreateWebSocket("ws://127.0.0.1:3003/websocket/" + id);
    // 监听连接开启
    webSocket.onopen = function (evt) {
        // 主动向后台发送数据
          webSocket.send("前端向后端发送第一条数据")
    }
    // 监听websocket通讯
    webSocket.onmessage = function (evt) {
        // 这是服务端返回的数据
        let res = JSON.parse(evt.data)
        if(res.n > 0.99) {
          // 前端主动关闭连接
          webSocket.close()
        }
    }
    // 监听连接关闭
    webSocket.onclose = function (evt) {
        console.log("Connection closed.")
    }
}

handleStart(176)