import { formInput, securityCode } from '../prototypes';
import { verifier } from '../utils';

const accountInput = Object.create(formInput);
accountInput.bind($$('#account-register__account'));

const passwordInput = Object.create(formInput);
passwordInput.bind($$('#account-register__password'));

const affirmPasswordInput = Object.create(formInput);
affirmPasswordInput.bind($$('#account-register__password-affirm'));

const codeInput = Object.create(formInput);
let verificationCode = $$('#account-register__verification-code');
codeInput.bind(verificationCode);
codeInput.bindInfo(verificationCode?.parentElement?.parentElement?.parentElement.lastElementChild)

const checkCode = Object.create(securityCode);
checkCode.bind($$('#verification-code__img--account-register'));

/** @type {HTMLAnchorElement} */
const affirmButton = $$('#account-register');
affirmButton.addEventListener('click', () => {
  let accountFlag = accountInput.verify(verifier.notEmpty, '账号不能为空');
  let passwordFlag = passwordInput.verify(verifier.notEmpty, '密码不能为空');
  let affirmFlag = affirmPasswordInput.setInfo(verifier.samePassword(passwordInput.$input.value, affirmPasswordInput.$input.value));
  let codeFlag = codeInput.verify(verifier.notEmpty, '验证码不能为空');
  if (!!accountFlag && !!affirmFlag && !!passwordFlag && !!codeFlag) {
    // 注册校验
    fetch('http://localhost:3000/posts', {
      method: 'POST',
    }).then(response => response.json())
    .catch(error => console.log(error))
    .then(response => console.log(response));
    // 成功
    // 跳转
    // location.href = '/main.html'

    // 失败
    // 将错误状态信息展示到页面
    // example: codeInput.setInfo('账号不存在')
  }
});