<template>
    <div class="wx-info b-center">
        <div class="qrcode">
            <iframe sandbox="allow-scripts allow-top-navigation" scrolling="no" width="184" height="184" frameBorder="0"
                allowTransparency="true" :src="setSrc()"></iframe>
            <span class="qrcode-title">使用微信扫一扫登录</span>
        </div>
    </div>
</template>

<script lang='ts' setup>
const setSrc = () => {
    const APPID = 'wx3820691c81731e89';
    const redirectUri = encodeURIComponent('http://192.168.1.8:3000/#/login');
    const styleBase64 = 'LmltcG93ZXJCb3ggLnRpdGxlIHsgZGlzcGxheTogbm9uZTsgfS5pbXBvd2VyQm94IC5xcmNvZGUgeyB3aWR0aDogMTg0cHg7bWFyZ2luLXRvcDogMDtib3JkZXI6IG5vbmU7IH0uaW1wb3dlckJveCAuaW5mbyB7IGRpc3BsYXk6IG5vbmU7IH0=';
    return `https://open.weixin.qq.com/connect/qrconnect?appid=${APPID}&scope=snsapi_login&redirect_uri=${redirectUri}&state=1&login_type=jssdk&style=black&self_redirect=default&href=data:text/css;base64,${styleBase64}`;
};
// const setSrc = () => {
//     const APPID = 'wxa24b17f4db19ee09';
//     const redirectUri = encodeURIComponent('https://pinmei.xinchao.com/#/wxLogin');
//     const styleBase64
//         = 'data:text/css;base64,LmxvZ2luUGFuZWwubm9ybWFsUGFuZWwgLnRpdGxlIHsNCiAgZGlzcGxheTogbm9uZTsNCn0NCi5xcmNvZGUubGlnaHRCb3JkZXIgew0KICB3aWR0aDogMTc0cHg7DQogIGhlaWdodDogMTc0cHg7DQogIG1hcmdpbi10b3A6IDA7DQogIGJveC1zaXppbmc6IGJvcmRlci1ib3g7DQp9DQouaW1wb3dlckJveCAuaW5mbyB7DQogIGRpc3BsYXk6IG5vbmU7DQp9DQoud2ViX3FyY29kZV90eXBlX2lmcmFtZSB7DQogIHdpZHRoOiAxNzRweDsNCn0NCg==';
//     return `https://open.weixin.qq.com/connect/qrconnect?appid=${APPID}&scope=snsapi_login&redirect_uri=${redirectUri}&state=1&login_type=jssdk&style=black&self_redirect=default&href=data:text/css;base64,${styleBase64}`;
// };

// const script = document.createElement('script');
// script.type = 'text/javascript';
// script.src = 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js';
// document.body.appendChild(script);

// let obj = new WxLogin({
//     'self_redirect': false, // 默认为false(保留当前二维码)  true(当前二维码所在的地方通过iframe 内跳转到 redirect_uri)
//     id: 'login_container', // 容器的id
//     appid: 'wxa3fdea5a3090f', // 应用唯一标识，在微信开放平台提交应用审核通过后获得
//     scope: 'snsapi_login', // 应用授权作用域，拥有多个作用域用逗号（,）分隔，网页应用目前仅填写snsapi_login即可
//     'redirect_uri': 'https://www.xiang.com//client/index.html', // 扫完码授权成功跳转到的路径
//     // state: "",    //用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止 csrf 攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加 session 进行校验
//     style: 'white', // 提供"black"、"white"可选，默认为黑色文字描述
//     href: 'data:text/css;base64,LmxvZ2luUGFuZWwubm9ybWFsUGFuZWwgLnRpdGxlIHsNCiAgZGlzcGxheTogbm9uZTsNCn0NCi5xcmNvZGUubGlnaHRCb3JkZXIgew0KICB3aWR0aDogMTc0cHg7DQogIGhlaWdodDogMTc0cHg7DQogIG1hcmdpbi10b3A6IDA7DQogIGJveC1zaXppbmc6IGJvcmRlci1ib3g7DQp9DQouaW1wb3dlckJveCAuaW5mbyB7DQogIGRpc3BsYXk6IG5vbmU7DQp9DQoud2ViX3FyY29kZV90eXBlX2lmcmFtZSB7DQogIHdpZHRoOiAxNzRweDsNCn0NCg==' // 自定义样式链接，第三方可根据实际需求覆盖默认样式
// });

</script>

<style lang="scss" scoped>
.b-center {
    justify-content: center;
    align-items: center;
}

.flex-box {
    display: flex;
}

// 微信登录
.wx-info {
    font-family: PingFang SC-Regular, PingFang SC;
    display: flex;
    flex-direction: column;
    position: relative;

    .qrcode {
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        padding: 2px 2px 16px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .qrcode-title {
            font-size: 14px;
            color: #252525;
            margin-top: 2px;
        }
    }
}
</style>
