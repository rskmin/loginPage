/**
 * 判断是否是PC端
 * @returns {boolean}
 */
const isPC = () => {
  let userAgentInfo = navigator.userAgent;
  const Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

const ua = navigator.userAgent.toLowerCase();
/**
 * 判断是否是移动端
 * @returns {boolean}
 */
const isDeviceMobile = () => {
  return /android|webos|iphone|ipod|balckberry/i.test(ua);
}

/**
 * @typedef MobileEvents
 * @property {Event} touchstart 触摸开始（手指放在触摸屏上）
 * @property {Event} touchmove 拖动（手指在触摸屏上移动）
 * @property {Event} touchend 触摸结束（手指从触摸屏上移开）
 * @property {Event} touchenter 移动的手指进入一个dom元素
 * @property {Event} touchleave 移动的手指离开一个dom元素
 * @property {Event} touchcancel 在拖动中断时候触发
 */

// 模拟移动端事件

/**
 * 创建事件
 * @param {string} [name] 事件名称
 * @param {boolean} [bubbles] 是否冒泡
 * @param {boolean} [cancelable] 是否可取消
 * @returns {Event}
 */
function createEvent(name, bubbles, cancelable) {
  const event = document.createEvent('Events');
  name && event.initEvent(name, bubbles, cancelable);
  return event;
}
const _mobileEvents = {};
/** @type {MobileEvents} */
const mobileEvents = {};
Object.defineProperties(mobileEvents, {
  touchstart: {
    get() {
      if (!_mobileEvents.touchstart) {
        _mobileEvents.touchstart = createEvent('touchstart', true, true);
      }
      return _mobileEvents.touchstart;
    },
    enumerable: true,
  },
  touchmove: {
    get() {
      if (!_mobileEvents.touchmove) {
        _mobileEvents.touchmove = createEvent('touchmove', true, true);
      }
      return _mobileEvents.touchmove;
    },
    enumerable: true,
  },
  touchend: {
    get() {
      if (!_mobileEvents.touchend) {
        _mobileEvents.touchend = createEvent('touchend', true, true);
      }
      return _mobileEvents.touchend;
    },
    enumerable: true,
  },
  touchenter: {
    get() {
      if (!_mobileEvents.touchenter) {
        _mobileEvents.touchenter = createEvent('touchenter', true, true);
      }
      return _mobileEvents.touchenter;
    },
    enumerable: true,
  },
  touchleave: {
    get() {
      if (!_mobileEvents.touchleave) {
        _mobileEvents.touchleave = createEvent('touchleave', true, true);
      }
      return _mobileEvents.touchleave;
    },
    enumerable: true,
  },
  touchcancel: {
    get() {
      if (!_mobileEvents.touchcancel) {
        _mobileEvents.touchcancel = createEvent('touchcancel', true, true);
      }
      return _mobileEvents.touchcancel;
    },
    enumerable: true,
  },
});

/**
 * @typedef Verifier
 * @property {Function} account 账号校验
 * @property {Function} password 密码校验
 * @property {Function} securityCode 验证码校验
 * @property {Function} notEmpty 非空判断
 * @property {Function} samePassword 两次密码检查
 */

/**
 * @type {Verifier}
 */
const verifier = {
  account(val = '') {
    let flag = regs.username.reg.test(val);
    if (flag) return '';
    return regs.username.info;
  },
  password(val = '') {
    let flag = regs.password.reg.test(val);
    if (flag) return '';
    return regs.password.info;
  },
  securityCode(val = '') {

  },
  notEmpty(val = '') {
    if (
      val == null ||
      ((typeof val === 'string') && val.trim() === '')
      ) {
        return '不能为空';
    }
    return '';
  },
  samePassword(password, affirm) {
    if (password !== affirm) return '两次密码不相同';
    return '';
  }
}

const regs = {
  username: {
    reg: /^[a-zA-Z0-9_-]{4,16}$/,
    info: '4到16位（字母，数字，下划线，减号）',
  },
  password: {
    reg: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
    info: '最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符',
  },
}

export {
  isPC,
  isDeviceMobile,
  ua,
  mobileEvents,
  createEvent,
  verifier,
}