# qinglong

自用青龙脚本。

## 添加脚本命令

```bash
ql repo https://github.com/nashaofu/qinglong.git "*" "utils" "utils" "release" "js"
```

安装 nodejs 依赖 `axios` `cheerio`

## v2ex

支持 v2ex 每日自动领取奖励。注意 v2ex 领取奖励必须在早上 8 点之后，否则不能领取成功。

- 添加环境变量 `V2EX_COOKIE`，值为 v2ex 网站 cookie 中请求 cookie 的内容。

## PTTime

支持 PTTime 每日签到。

- 添加环境变量 `PTTIME_COOKIE`，值为 v2ex 网站 cookie 中请求 cookie 的内容。
