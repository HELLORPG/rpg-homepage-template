# README
```wiki
@author HELLORPG
@date 2022.8.25
```

基于 [vuepress-theme-hope](https://vuepress-theme-hope.github.io/v2/)，修改部分样式和组件，设计了个人主页。


## 配置环境
使用如下指令即可配置环境：
```shell
npm install
```



## 部署在服务器
本人部署在服务器采用的是 Nginx 框架，其他部署方式并未尝试。

### 安装 Nginx
```shell
sudo apt install nginx
```

### 添加网站配置
Nginx 的配置文件位于目录 `/etc/nginx/` 下，可以在 `/etc/nginx/conf.d/` 文件夹中新建对于网站的配置文件 `web-name.conf`。
```text
# /etc/nginx/conf.d/web-name.conf
server {
  server_name hostname1 hostname2;
  root web-dir;
  index index.html;
}
```
修改保存之后，使用如下指令重启服务：
```shell
sudo nginx -s reload
```
参考链接：
- [https://segmentfault.com/a/1190000010487262](https://segmentfault.com/a/1190000010487262)
- [https://blog.csdn.net/qq_38431321/article/details/123018259](https://blog.csdn.net/qq_38431321/article/details/123018259)
- [https://blog.csdn.net/hbysj/article/details/80833810](https://blog.csdn.net/hbysj/article/details/80833810)

### 认证 SSL
可以在所租用云服务器的面板内进行 SSL 的免费认证。
认证之后选择 nginx 格式进行下载，将其中的 `.key` 和 `.pem` 文件上传到服务器。

之后在服务器中 Nginx 配置文件中增加如下的内容：
```text
server {
        listen       443        ssl;
        ssl_certificate         [.pem file path];
        ssl_certificate_key     [.key file path];
        ssl_session_timeout 5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers AESGCM:ALL:!DH:!EXPORT:!RC4:+HIGH:!MEDIUM:!LOW:!aNULL:!eNULL;
        ssl_prefer_server_ciphers on;
}
```
接着重启服务即可通过 `https://` 访问。

为了将所有 http 的访问都重定向到 https 下，可以新建一个配置文件如下：
```text
server {
    listen       80;
    server_name  hostname1 hostname2;
    return 301 https://$server_name$request_uri;
}
```
重启服务即可。

参考链接：
- [https://segmentfault.com/a/1190000022673232](https://segmentfault.com/a/1190000022673232)

