<template>
    <div class="box">
        <div class="login-box">
            <div class="wrapper">
                <div class="title-text">
                    <div class="title login" :style="{marginLeft}">
                        登录</div>
                    <div class="title signup">
                        注册</div>
                </div>
                <div class="form-container">
                    <div class="slide-controls">
                        <input type="radio" name="slide" id="login" :checked="isChecked">
                        <input type="radio" name="slide" id="signup" :checked="!isChecked">
                        <label for="login" class="slide login" @click="transLogin">登录</label>
                        <label for="signup" class="slide signup" @click="transSignup">注册</label>
                        <div class="slider-tab">
                        </div>
                    </div>
                    <div class="form-inner">
                        <!--登录-->
                        <form action="#" class="login" :style="{marginLeft}" :model="loginForm">
                            <div class="field">
                                <input type="text" placeholder="请输入邮箱地址" v-model="loginForm.username">
                            </div>
                            <div class="field">
                                <input type="password" placeholder="请输入密码" v-model="loginForm.password">
                            </div>
                            <div class="pass-link">
                                <a href="#">忘记密码？</a></div>
                            <div class="field btn">
                                <div class="btn-layer">
                                </div>
                                <input type="submit" value="登录" @click.prevent="submitLogin">
                            </div>
                            <div class="signup-link">
                                没有账号？ <a href="" @click.prevent="transSignup" >立即注册</a></div>
                        </form>
                        <!--注册-->
                        <form class="signup" :model="registerForm">
                            <div class="field">
                                <input type="text" placeholder="请输入邮箱地址" v-model="registerForm.username">
                            </div>
                            <div class="field">
                                <input type="password" placeholder="请输入密码" v-model="registerForm.password">
                            </div>
                            <div class="field">
                                <input type="password" placeholder="请随机输入六位验证码" v-model="registerForm.code">
                            </div>
                            <div class="field btn">
                                <div class="btn-layer">
                                </div>
                                <input type="submit" value="注册" @click.prevent="submitRegister">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {Message} from "element-ui";
    export default {
        name: "BBSLogin",
        data(){
            return {
                isChecked: true,
                marginLeft: '0%',
                loginForm:{
                    username:'',
                    password:'',
                },
                registerForm:{
                    username:'',
                    password:'',
                    code:'',
                },
            }
        },
        methods:{
            transSignup(){
                this.marginLeft = '-50%';
                this.isChecked = !this.isChecked;
            },
            transLogin(){
                this.marginLeft = '0%';
                this.isChecked = !this.isChecked;
            },
            //登录
            submitLogin(){
                if( this.loginForm.username == '' || this.loginForm.password == ''){
                    Message({
                        type: "error",
                        message: "邮箱地址或密码不能为空！",
                        offset: 54
                    })
                } else{
                    this.postRequest('/login',this.loginForm).then(resp=>{
                        if(resp){
                            //存储用户token
                            const tokenStr = resp.obj.tokenHead+resp.obj.token;
                            window.sessionStorage.setItem('tokenStr',tokenStr);
                            //隐藏顶部导航栏的 登录/注册（将isLogin的值传递到Header页面）
                            this.$bus.$emit("isLogin",true)
                            //跳转到首页
                            this.$router.replace('/forum')

                        }
                    })
                }
            },
            //注册
            submitRegister(){
                if( this.registerForm.username == '' || this.registerForm.password == ''){
                    Message({
                        type: "error",
                        message: "邮箱地址或密码不能为空！",
                        offset: 54
                    })
                } else{
                    this.postRequest('/register',this.registerForm).then(resp=>{
                        if(resp){
                            //将注册页信息展示到登录页上
                            this.loginForm.username = this.registerForm.username
                            this.loginForm.password = this.registerForm.password
                            //跳转到登录选项
                            this.transLogin()
                        }
                    })
                }
            }
        }

    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }
    .box{
        position: absolute;
        height: 100%;
        width: 100%;
    }
    .login-box{
        display: grid;
        height: 100%;
        width: 100%;
        place-items: center;
        background-color: #f6f7f8;
        /*background: -webkit-linear-gradient(left,#48c6ef, #6f86d6);*/
    }
    ::selection{
        background: #fa4299;
        color: #fff;
    }
    .wrapper{
        overflow: hidden;
        max-width: 390px;
        background: #fff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0px 15px 20px rgba(0,0,0,0.1);
    }
    .wrapper .title-text{
        display: flex;
        width: 200%;
    }
    .wrapper .title{
        width: 50%;
        font-size: 35px;
        font-weight: 600;
        text-align: center;
        transition: all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55);
    }
    .wrapper .slide-controls{
        position: relative;
        display: flex;
        height: 50px;
        width: 100%;
        overflow: hidden;
        margin: 30px 0 10px 0;
        justify-content: space-between;
        border: 1px solid lightgrey;
        border-radius: 5px;
    }
    .slide-controls .slide{
        height: 100%;
        width: 100%;
        color: #fff;
        font-size: 18px;
        font-weight: 500;
        text-align: center;
        line-height: 48px;
        cursor: pointer;
        z-index: 1;
        transition: all 0.6s ease;
    }
    .slide-controls label.signup{
        color: #000;
    }
    .slide-controls .slider-tab{
        position: absolute;
        height: 100%;
        width: 50%;
        left: 0;
        z-index: 0;
        border-radius: 5px;
        /*background: -webkit-linear-gradient(left, #a445b2, #fa4299);*/
        background: -webkit-linear-gradient(left,#48c6ef, #6f86d6);
        transition: all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55);
    }
    input[type="radio"]{
        display: none;
    }
    #signup:checked ~ .slider-tab{
        left: 50%;
    }
    #signup:checked ~ label.signup{
        color: #fff;
        cursor: default;
        user-select: none;
    }
    #signup:checked ~ label.login{
        color: #000;
    }
    #login:checked ~ label.signup{
        color: #000;
    }
    #login:checked ~ label.login{
        cursor: default;
        user-select: none;
    }
    .wrapper .form-container{
        width: 100%;
        overflow: hidden;
    }
    .form-container .form-inner{
        display: flex;
        width: 200%;
    }
    .form-container .form-inner form{
        width: 50%;
        transition: all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55);
    }
    .form-inner form .field{
        height: 50px;
        width: 100%;
        margin-top: 20px;
    }
    .form-inner form .field input{
        height: 100%;
        width: 100%;
        outline: none;
        padding-left: 15px;
        border-radius: 5px;
        border: 1px solid lightgrey;
        border-bottom-width: 2px;
        font-size: 17px;
        transition: all 0.3s ease;
    }
    .form-inner form .field input:focus{
        border-color: #fc83bb;
        /* box-shadow: inset 0 0 3px #fb6aae; */
    }
    .form-inner form .field input::placeholder{
        color: #999;
        transition: all 0.3s ease;
    }
    form .field input:focus::placeholder{
        color: #b3b3b3;
    }
    .form-inner form .pass-link{
        margin-top: 5px;
    }
    .form-inner form .signup-link{
        text-align: center;
        margin-top: 30px;
    }
    .form-inner form .pass-link a,
    .form-inner form .signup-link a{
        color: #fa4299;
        text-decoration: none;
    }
    .form-inner form .pass-link a:hover,
    .form-inner form .signup-link a:hover{
        /*text-decoration: underline;*/
        text-decoration: none;
    }
    form .btn{
        height: 50px;
        width: 100%;
        border-radius: 5px;
        position: relative;
        overflow: hidden;
    }
    form .btn .btn-layer{
        height: 100%;
        width: 300%;
        position: absolute;
        left: -100%;
        background: -webkit-linear-gradient(right,#48c6ef, #6f86d6, #48c6ef, #6f86d6);
        border-radius: 5px;
        transition: all 0.4s ease;;
    }
    form .btn:hover .btn-layer{
        left: 0;
    }
    form .btn input[type="submit"]{
        height: 100%;
        width: 100%;
        z-index: 1;
        position: relative;
        background: none;
        border: none;
        color: #fff;
        padding-left: 0;
        border-radius: 5px;
        font-size: 20px;
        font-weight: 500;
        cursor: pointer;
    }

</style>