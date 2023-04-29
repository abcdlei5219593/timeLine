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
    const APPID = 'wxa24b17f4db19ee09';
    const redirectUri = encodeURIComponent('/app/airContent/home');
    const styleBase64 = 'LmltcG93ZXJCb3ggLnRpdGxlIHsgZGlzcGxheTogbm9uZTsgfS5pbXBvd2VyQm94IC5xcmNvZGUgeyB3aWR0aDogMTg0cHg7bWFyZ2luLXRvcDogMDtib3JkZXI6IG5vbmU7IH0uaW1wb3dlckJveCAuaW5mbyB7IGRpc3BsYXk6IG5vbmU7IH0=';
    return `https://open.weixin.qq.com/connect/qrconnect?appid=${APPID}&scope=snsapi_login&redirect_uri=${redirectUri}&state=1&login_type=jssdk&style=black&self_redirect=default&href=data:text/css;base64,${styleBase64}`;
};

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
