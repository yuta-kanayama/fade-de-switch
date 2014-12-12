# フェードで切り替わるやつ

[デモ](http://yuta-k.net/demo/fade-de-switch/)


## オプション

* interval：切り替わる感覚（ミリ秒）
* duration：フェードの早さ（ミリ秒）

### 例

```
$(function(){
  
  var fds = new FadeDeSwitch();
  fds.init({
    interval: 5000,
    duration: 1400
  }).start();
  
});

```



## 使用技術

* gulp
* HTML5
* Sass(Compass)
* JavaScript(jQuery)
