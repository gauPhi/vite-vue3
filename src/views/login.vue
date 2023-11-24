<template>
  <div class="login-container">
    <div class="logo">VITE-VUE3-管理平台</div>



    <!-- <a-form ref="formRef" :model="formState" :rules="rules" @keyup.enter="handleSubmit" layout="vertical">

      <a-form-item label="账号" name="username">
        <a-input v-model:value="form.username" autocomplete="off" placeholder="请输入手机号/邮箱" allowClear>
          <template v-slot:prefix>
            <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item label="密码" name="password">
        <a-input-password v-model:value="form.password" autocomplete="off" placeholder="请输入密码" allowClear>
          <template v-slot:prefix>
            <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item style="margin-bottom: 10px;">
        <a-button type="primary" @click="handleSubmit()" :loading="loadingStatus">登录</a-button>
      </a-form-item>

    </a-form> -->

    <a-row>
      <a-col :xs="0" :md="0" :sm="12" :lg="14" :xl="14"></a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8">
        <div class="login-container-form">
          <div class="login-container-hello">欢迎登录</div>
          <a-form ref="formRef" :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
            autocomplete="off" @keyup.enter="handleSubmit">
            <a-form-item label="账号" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
              <a-input placeholder="账号" v-model:value="formState.username" />
            </a-form-item>

            <a-form-item label="密码" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
              <a-input-password placeholder="密码" v-model:value="formState.password" />
            </a-form-item>

            <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
              <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
              <a-button type="primary" @click="handleSubmit()">提交</a-button>
            </a-form-item>
          </a-form>


          <div class="operate">
            <router-link to='reset' class="forget">忘记密码？</router-link>
            <router-link to='register' class="register">立即注册</router-link>
          </div>

        </div>
      </a-col>
    </a-row>

    <div class="login-container-tips">
      <p class="one">
        <span>{{ websiteInfo.website }}</span>
        <span>{{ websiteInfo.copyright }}</span>
      </p>
      <div class="two">
        <a-space>
          <span>客服热线：{{ websiteInfo.phone }}</span>
          <span>邮箱：{{ websiteInfo.email }}</span>
          <!-- <router-link to='/rules/privacy' class="rule-item">隐私政策</router-link>
          <router-link to='/rules/tou' class="rule-item">使用条款</router-link> -->
          <!--<router-link to='privacy' class="register">使用条款</router-link>-->
        </a-space>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, defineComponent, reactive, ref, UnwrapRef } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
// import { message } from 'ant-design-vue'
// import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { login, systemInfo } from '@/api/login'
import router from '@/router';

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}
const websiteInfo = ref({
  website: '',
  copyright: '',
  phone: '',
  email: '',
})
const loadingStatus = ref<boolean>(false)
const formRef = ref()
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

// 账号验证
const validateAccount = async (rule: RuleObject, value: string) => {
  let regPone = null
  const mobile = /^(1[3456789]\d{9})$/ // 手机号
  const mail = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/ // 邮箱
  // console.log('账号验证 value', value)
  if (value !== '' && value !== null && value.indexOf('@') !== -1) {
    regPone = mail
  } else {
    regPone = mobile
  }
  if (regPone === null || value === '') {
    return Promise.reject(new Error('请输入手机号，邮箱'))
  } else if (!regPone.test(value)) {
    return Promise.reject(new Error('请输入正确的手机号，邮箱'))
  } else {
    return Promise.resolve()
  }
}
// 密码
const validatePas = async (rule: RuleObject, value: string) => {
  const reg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}/
  if (value === '' || value === null) {
    return Promise.reject(new Error('请输入密码'))
  } else if (!reg.test(value)) {
    return Promise.reject(new Error('密码必须由数字、字母、特殊字符组合,请输入8-20位'))
  } else {
    return Promise.resolve()
  }
}
const rules = reactive({
  username: [{ required: true, validator: validateAccount, trigger: 'blur' }],
  password: [{ required: true, validator: validatePas, trigger: 'blur' }]
})

// 登录提交
function handleSubmit() {
  formRef.value.validate().then(async (e: any) => {
    // loadingStatus.value = true

    console.log('formState', formState)
    console.log('router', router)

    setTimeout(() => router.push('/layout'), 100)

    // await login(formState).then(async (res: any) => {
    //   console.log('login res:', res)
    //   if (res.code === 0) {
    //     loadingStatus.value = false
    //     localStorage.setItem(ELocalStorageKey.Token, res.data.tokenValue)
    //     store.commit('SET_ORG_LIST', res.data.orgs)
    //     store.commit('SET_USER_ROLE_ID', res.data.orgs[0].userOrganizationRoleId)
    //     store.commit('SET_USER_ROLE_KEY', res.data.orgs[0].userOrganizationRoleKey)
    //     sessionStorage.setItem('SET_ORG_LIST', JSON.stringify(res.data.orgs))
    //     sessionStorage.setItem('SET_USER_ID', res.data.userId)
    //     root.$router.push(ERouterName.HOMEPAGE)
    //   }
    // }).catch(err => {
    //   loadingStatus.value = false
    //   message.error(err.message || err.data.message)
    // })

    // const result = await login(form)
    // console.log('result', result)
    // if (result.code === 0) {
    //   // console.log(result)
    //   loadingStatus.value = false
    //   localStorage.setItem(ELocalStorageKey.Token, result.data.tokenValue)
    //   // localStorage.setItem(ELocalStorageKey.WorkspaceId, result.data.workspace_id)
    //   // localStorage.setItem(ELocalStorageKey.Username, result.data.username)
    //   // localStorage.setItem(ELocalStorageKey.UserId, result.data.user_id)
    //   // localStorage.setItem(ELocalStorageKey.Flag, EUserType.Web.toString())
    //   store.commit('SET_ORG_LIST', result.data.orgs)
    //   sessionStorage.setItem('SET_ORG_LIST', JSON.stringify(result.data.orgs))
    //   root.$router.push(ERouterName.HOMEPAGE)
    // } else {
    //   loadingStatus.value = false
    //   message.error(result.message)
    // }

    // store.dispatch('user/login', form).then(e => {
    //   const route = router.currentRoute.value
    //
    //   const url = route.query.redirect || '/'
    //
    //   // console.log('route.query.redirect',route.query.redirect)
    //
    //   // router.push(url as string)
    //   loadingStatus.value = false
    //   setTimeout(() => router.push(url as string), 100)
    // }).catch(err => {
    //   loadingStatus.value = false
    //   message.error(err.message || err.data.message)
    // })
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: url('/src/assets/images/login_bg.png');
  background-size: cover;
  overflow: hidden;
  position: relative;

  .logo {
    position: absolute;
    top: 25px;
    left: 25px;
    color: #fff;
    padding: 15px 15px 15px 80px;
    font-size: 30px;
    z-index: 1;
    background: url('/src/assets/images/logo.png') no-repeat left center;
  }

  & .login-container-form {
    width: calc(100% - 40px);
    padding: 4vh;
    margin-top: calc((100vh - 380px) / 2);
    margin-right: 20px;
    margin-left: 20px;
    background-color: rgba(217, 217, 217, .8);
    background-size: 100% 100%;
    border-radius: 10px;
    box-shadow: 0 2px 8px 0 rgba(7, 17, 27, 0.06);

    & .login-container-hello {
      margin-bottom: 20px;
      font-size: 32px;
      color: #091531;
    }

    & .login-container-title {
      margin-bottom: 30px;
      font-size: 20px;
      color: #fff;
    }

    .operate {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .forget {
        color: #676767;
        font-size: 14px;
      }

      .register {
        color: #0b86f7;
        font-size: 14px;
      }
    }

  }
}

.login-container-tips {
  position: fixed;
  bottom: 20px;
  width: 100%;
  height: 40px;
  color: #b0b0b2;
  font-size: 12px;
  text-align: center;
  z-index: 2;

  .one {
    margin-bottom: 10px;

    span {
      padding: 0 10px;
    }
  }

  .rule-item {
    color: #b0b0b2;
    text-decoration: underline;
  }
}
</style>
<style lang="scss">
.login-container {
  & .login-container-form {
    & .ant-col {
      width: 100%;
    }

    & .ant-input {
      height: 35px;
    }

    & .ant-btn {
      width: 100%;
      height: 45px;
      border-radius: 5px;
      background: #091531;
      border-color: #091531;
    }

  }
}
</style>