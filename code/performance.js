function n() {
  var e = {};
  try {
    var t = window.performance.timing;
    if (t.loadEventEnd - t.loadEventStart < 0)
      return void setTimeout(function() {
        n();
      }, 200);
    (e["重定向时间"] = t.redirectEnd - t.redirectStart),
      (e["DNS解析时间"] = t.domainLookupEnd - t.domainLookupStart),
      (e["TCP完成握手时间"] = t.connectEnd - t.connectStart),
      (e["HTTP请求响应完成时间"] = t.responseEnd - t.requestStart),
      (e["DOM开始加载前所花费时间"] = t.responseEnd - t.navigationStart),
      (e["DOM加载完成时间"] = t.domComplete - t.domLoading),
      (e["DOM结构解析完成时间"] = t.domInteractive - t.domLoading),
      (e["脚本加载时间"] =
        t.domContentLoadedEventEnd - t.domContentLoadedEventStart),
      (e["onload事件时间"] = t.loadEventEnd - t.loadEventStart),
      (e.domContentLoaded = t.domContentLoadedEventEnd - t.navigationStart),
      (e.load = t.loadEventEnd - t.navigationStart),
      window.showSnapshotEnd &&
        (e.snapshotShow = window.showSnapshotEnd - t.navigationStart),
      (e["页面完全加载时间"] =
        e["重定向时间"] +
        e["DNS解析时间"] +
        e["TCP完成握手时间"] +
        e["HTTP请求响应完成时间"] +
        e["DOM结构解析完成时间"] +
        e["DOM加载完成时间"]),
      Object.keys(e).forEach(function(t) {
        console.log(t + ":" + e[t] + "毫秒(ms)");
      }),
      console.log(t);
  } catch (e) {
    console.error(e);
  }
}
