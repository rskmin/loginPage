import { isPC, isDeviceMobile, createEvent } from 'src/js/utils';

/**
 * 状态表
 */
const STATUS_MAP = {
  'phone-login': 'rm-login--phone-login',
  'account-register': 'rm-login--account-register',
  'pc-login': 'rm-login--pc-login',
};

// const MAIN_BUTTON_MAP = {
//   login: STATUS_MAP['pc-login'],
//   register: STATUS_MAP['account-register'],
// };

/**
 * @typedef {Object} StatusSwitch
 * @property {HTMLElement} $login 登陆div(#rm-login)实例
 * @property {string} status 当前登陆页状态
 * @property {Function} changeStatus 状态切换方法 - 传入状态表中的状态
 * @property {Function} init 根据环境初始化状态
 */

let loginStatus = ''
/**
 * 登陆页状态切换器
 * @type {StatusSwitch}
 */
const statusSwitch = {
  $login: $$('#rm-login'),
  changeStatus(status) {
    const $login = this.$login;
    if (!$login) {
      throw new Error('Function changeStatus must be bind with statusSwitch');
    }
    // const removeList = Array(...$login.classList).filter(cla => cla.includes('--'));
    this.status && $login.classList.remove(this.status);
    $login.classList.add(status);
    this.status = status;
  },
  init() {
    if (isPC()) {
      statusSwitch.changeStatus(STATUS_MAP["pc-login"]);
    } else if (isDeviceMobile()) {
      statusSwitch.changeStatus(STATUS_MAP["phone-login"]);
    }
    modeSwitch._init();
  }
}

Object.defineProperty(statusSwitch, 'status', {
  get() {
    return loginStatus;
  },
  set(v) {
    let content = '';
    switch (v) {
      case STATUS_MAP['pc-login']:
        content = 'Register';
        modeSwitch.changeMode('change-mode--pc');
        break;
      case STATUS_MAP['account-register']:
        content = 'Login';
        modeSwitch.changeMode('change-mode--pc');
        break;
      case STATUS_MAP['phone-login']:
        content = 'Login&nbsp;/&nbsp;Register';
        modeSwitch.changeMode('change-mode--phone');
        break;
      case STATUS_MAP['phone-register']:
        modeSwitch.changeMode('change-mode--phone');
        content = 'Login';
        break;
      default: break;
    }
    mainButton.changeContent(content);
    loginStatus = v;
  }
})

/**
 * @typedef {Object} MainButton
 * @property {HTMLButtonElement} $button button(#main-button)实例
 * @property {Function} changeContent 切换按钮内容
 * @property {Function} getContent 获取按钮内容
 * @property {Function} click 按钮点击事件
 */

/**
 * 主按钮
 * @type {MainButton}
 */
const mainButton = {
  $button: $$('#main-button'),
  changeContent(content) {
    const $button = this.$button;
    if (!$button) {
      throw new Error('Function changeText must be bind with mainButton');
    }
    $button.innerHTML = content;
  },
  getContent() {
    const $button = this.$button;
    if (!$button) {
      throw new Error('Function changeText must be bind with mainButton');
    }
    return $button.innerHTML;
  },
  click() {
    let status = '';
    switch (loginStatus) {
      case STATUS_MAP['account-register']: status = STATUS_MAP['pc-login']; break;
      case STATUS_MAP['pc-login']: status = STATUS_MAP['account-register']; break;
      default: break;
    }
    status && statusSwitch.changeStatus(status);
  },
  _init() {
    const $button = this.$button;
    if (!$button) {
      throw new Error('Function changeText must be bind with mainButton');
    }
    $button.addEventListener('click', this.click);
  },
};
mainButton._init();

/**
 * @typedef {Object} modeSwitch
 * @property {HTMLElement} $mode
 * @property {Function} click
 * @property {Function} _init
 * @property {Function} changeMode
 */

/**
 * @type {modeSwitch}
 */
const modeSwitch = {
  $mode: $$('#change-mode'),
  click() {
    switch (loginStatus) {
      case STATUS_MAP['pc-login']:
        statusSwitch.changeStatus(STATUS_MAP["phone-login"]);
        break;
      case STATUS_MAP['account-register']:
        statusSwitch.changeStatus(STATUS_MAP['phone-login']);
        break;
      case STATUS_MAP['phone-login']:
        statusSwitch.changeStatus(STATUS_MAP['pc-login']);
        break;
      default: break;
    }
  },
  _init() {
    const pc = [STATUS_MAP["pc-login"], STATUS_MAP["account-register"]];
    const phone = [STATUS_MAP["phone-login"], STATUS_MAP["phone-register"]];
    if (pc.includes(loginStatus)) {
      this.changeMode('change-mode--pc')
    } else if (phone.includes(loginStatus)) {
      this.changeMode('change-mode--phone');
    }
    this.$mode.addEventListener('click', this.click);
  },
  /**
   * @param {'change-mode--phone'|'change-mode--pc'} mode 
   */
  changeMode(mode) {
    const $mode = this.$mode;
    if (!$mode) {
      throw new Error('Function changeMode must be bind with modeSwitch');
    }
    $mode.classList.remove($mode.classList[0]);
    $mode.classList.add(mode);
  },
}

export default statusSwitch;
export {
  STATUS_MAP,
  loginStatus,
}