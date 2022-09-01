const loginIdValidator = new FieldValidator('txtLoginId', async function(val) {
    if (!val) {
        return '请填写帐号';
    }
});

const loginPwdValidator = new FieldValidator('txtLoginPwd', function(val) {
    if (!val) {
        return '密码不能为空';
    } else if (val.length > 20) {
        return '密码长度不能超过20位'
    }
});


const form = $('.user-form');
form.onsubmit = async(e) => {
    e.preventDefault();
    const a = await FieldValidator.validate([loginIdValidator, loginPwdValidator]);
    if (!a) {
        return;
    }
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const resp = await API.login(data);
    if (resp.code === 0) {
        alert('登录成功');
        location.href = './index.html'
    } else {
        alert('登陆失败，帐号或密码不正确')
        loginPwdValidator.input.value = '';
    }
}