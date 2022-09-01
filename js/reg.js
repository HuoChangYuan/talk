const loginIdValidator = new FieldValidator('txtLoginId', async function(val) {
    if (!val) {
        return '请填写帐号';
    }
    const resp = await API.exists(val);
    if (resp.data) {
        return '该帐号已存在，请重新填写';
    }
    // console.log(resp);
});
const nickNameValidator = new FieldValidator('txtNickname', function(val) {
    if (!val) {
        return '请填写昵称';
    }
});

const loginPwdValidator = new FieldValidator('txtLoginPwd', function(val) {
    if (!val) {
        return '密码不能为空';
    } else if (val.length > 20) {
        return '密码长度不能超过20位'
    }
});
const loginPwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm', function(val) {
    if (!val) {
        return '请填写确认密码';
    }
    if (val !== loginPwdValidator.input.value) {
        return '确认密码与密码不一致';
    }
});

const form = $('.user-form');
form.onsubmit = async(e) => {
    e.preventDefault();
    const a = await FieldValidator.validate([loginIdValidator, nickNameValidator, loginPwdValidator, loginPwdConfirmValidator]);
    if (!a) {
        return;
    }
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const resp = await API.reg(data);
    if (resp.code === 0) {
        alert('注册成功');
        location.href = './login.html'
    }
}