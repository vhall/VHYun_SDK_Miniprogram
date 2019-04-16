## 微吼云小程序SDK

### 结构说明

#### 工程文件
- app.js app.json package.json project.config.json


#### 目录
- player目录 直播观看demo
- vod目录 回放点播观看demo
- vplayer目录 vhall播放器sdk
- index 主页面文件


#### player 与 vod 文件结构
- index 输入配置页面
- player 播放页面 （调用vplayer）

### vhall播放器SDK接口使用说明

#### 实例化播放器
<pre><code>
// 实例化vhall播放器
var vplayer = new videoJs({
  wx: wx, // 微信句柄
  context: this, // 当前页面上下文句柄，用于修改微信播放组件的播放源
  playerKey: '', // 微信播放组件src属性变量，用于配置播放源
  id_: '', // 微信播放组件元素id
  type: '', // live or vod。观看直播或点播
  access_token: '', // 用户access_token
  account_Id: '', // 第三方用户ID
  aid: '', // 直播为roomid、点播为recordid
  app_id: '', // 应用id
}, function () {
  // 成功回调，实例的所有接口必须在实例化成功后方可使用
}, function () {
  // 失败回调
});
</code></pre>

#### 开始播放
<pre><code>
vplayer.play();
</code></pre>

#### 停止播放
<pre><code>
vplayer.stop();
</code></pre>

#### 进入全屏模式
<pre><code>
vplayer.inFullScreen();
</code></pre>

#### 退出全屏模式
<pre><code>
vplayer.outFullScreen();
</code></pre>

#### 获取清晰度列表
<pre><code>
// 列表为 ['same', '720p', '480p', '360p', 'a'] 格式
// 其中 same 代表原画，a 代表纯音频
var qlist = vplayer.getQualityList();
</code></pre>

#### 获取当前播放清晰度
<pre><code>
// 返回字符串 '480p' '720p' 等
var cq = vplayer.getCurrentQuality();
</code></pre>

#### 切换当前播放清晰度
<pre><code>
// 获取清晰度列表
var qlist = vplayer.getQualityList();
// 传入清晰度列表中的字符串项
vplayer.switchQualityLevel(qlist[0]);
</code></pre>
**tips:**
- 由于微信小程序观看直播（live-player组件）全屏模式下切换清晰度（播放源）无效，故采取先退出全屏，切换后进入全屏的方式
- 经测试微信小程序观看点播（video组件）切换清晰度（播放源）原生播放器UI加载视频时有几率显示播放按钮

### 直播组件能力
开发微信小程序时部分功能可直接通过微信直播播放器组件接口进行开发，相关文档。
<https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html>

### 点播组件能力
开发微信小程序时部分功能可直接通过微信点播播放器组件接口进行开发，相关文档。
<https://developers.weixin.qq.com/miniprogram/dev/component/video.html>
