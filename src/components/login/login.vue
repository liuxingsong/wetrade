<template>
    <div class="pub-page">
        <div v-if="loginOrRegister">
            <p>用户登录</p>
            <div class="phone-input">
                <mt-field type="tel" placeholder="请输入您的手机号" v-model="phoneNumber"></mt-field>
                <mt-field type="number" placeholder="请输入验证码" v-model="captcha">
                    <span @click="getCode">获取验证码</span>
                </mt-field>
            </div>
            <div class="to-login-in">
                <mt-button type="primary" @click="login">登录</mt-button>
                <div>
                    <span>没有账号？</span>
                    <label @click="toRegister">申请账号</label>
                </div>
            </div>
        </div>
        <div v-else>
            <p>账号注册</p>
            <div class="phone-input">
                <mt-field type="tel" placeholder="请输入您的手机号" v-model="phoneNumber"></mt-field>
                <mt-field type="number" placeholder="请输入验证码" v-model="captcha">
                    <span>获取验证码</span>
                </mt-field>
            </div>
            <div class="to-login-in">
                <mt-button type="primary" @click="register">立即注册</mt-button>
                <div>
                    <span>已有账号</span>
                    <label @click="toLogin">立即登录</label>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                phoneNumber: '',
                captcha: '',
                loginOrRegister: true
            }
        },
        methods: {
            toRegister () {
                this.loginOrRegister = false;
            },
            toLogin () {
                this.loginOrRegister = true;
            },
            register () {

            },
            login () {
                this.$router.push('/product');
            },
            getCode () {

            }
        }
    }
</script>
<style lang="less">
    .pub-page {
      background: #666;
      height: 100vh;
      & > div {
        p {
          padding-top: 40%;
          padding-bottom: 30px;
          text-align: center;
        }
        .phone-input {
          width: 90%;
          margin: 0 auto;
          a {
            margin-bottom: 20px;
            .mint-cell-wrapper {
              height: 72px;
              background: #ddd;
              input {
                background: #ddd;
              }
              .mint-field-other {
                span {
                  display: inline-block;
                  border: 1px solid #57c2ff; /*no*/
                  padding: 12px;
                }
              }
            }
          }
        }
        .to-login-in {
          margin-top: 60px;
          .mint-button {
            width: 90%;
            height: 72px;
            line-height: 72px;
            margin: 0 auto;
            display: block;
            font-size: 32px;
          }
          & > div {
            margin-top: 20px;
            float: right;
            margin-right: 5%;
            span {
              font-size: 24px;
            }
            label {
              color: #ff8400;
              padding: 20px 0;
              cursor: pointer;
              font-size: 24px;
            }
          }
        }
      }
    }
</style>