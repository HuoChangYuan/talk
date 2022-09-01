/**
 * 对某一个表单项进行验证的构造函数
 */
class FieldValidator {
    /**
     * 构造器
     * @param {string} txtId 文本框的ID
     * @param {function} validatorFunc 验证规则函数，当需要对该文本框进行验证时会调用该函数，函数的参数为当前文本框的值，函数的返回值为验证的错误消息，若没有返回则表示无错误
     */
    constructor(txtId, validatorFunc) {
        this.input = $('#' + txtId);
        this.p = this.input.nextElementSibling;
        this.validatorFunc = validatorFunc;
        // 失去焦点
        this.input.onblur = () => {
            this.validate();
        }
    };
    /**
     * 验证，成功返回true，失败返回false
     */
    async validate() {
        const err = await this.validatorFunc(this.input.value);
        if (err) {
            this.p.innerText = err;
            return false;
        } else {
            this.p.innerText = '';
            return true;
        }
    };
    // 静态方法验证
    static async validate(validators) {
        const pro = validators.map(v => v.validate());
        const result = await Promise.all(pro);
        // console.log(result);
        // 是否每一个都是true
        return result.every(r => r);
    }
};


// function test() {
//     FieldValidator.validate([loginIdValidator, nickNameValidator]).then(r => {
//         console.log(r);
//     })
// }