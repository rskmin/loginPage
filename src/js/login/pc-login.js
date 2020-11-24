import { formInput, securityCode } from '../prototypes';
import { verifier } from '../utils';

const accountInput = Object.create(formInput);
accountInput.bind($$('#pc-login__account'));

const passwordInput = Object.create(formInput);
passwordInput.bind($$('#pc-login__password'));

const codeInput = Object.create(formInput);
let verificationCode = $$('#pc-login__verification-code');
codeInput.bind(verificationCode);
codeInput.bindInfo(verificationCode?.parentElement?.parentElement?.parentElement.lastElementChild)

const checkCode = Object.create(securityCode);
checkCode.bind($$('#verification-code__img--pc-login'));

/** @type {HTMLAnchorElement} */
const loginButton = $$('#pc-login');
loginButton.addEventListener('click', () => {
  let accountFlag = accountInput.verify(verifier.notEmpty, '账号不能为空');
  let passwordFlag = passwordInput.verify(verifier.notEmpty, '密码不能为空');
  let codeFlag = codeInput.verify(verifier.notEmpty, '验证码不能为空');
  if (!!accountFlag && !!passwordFlag && !!codeFlag) {
    // 登陆校验
    fetch('http://localhost:3000/posts', {
      method: 'POST',
    }).then(response => response.json()) // 必须返回 JSON 数据
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