
/**
 * @typedef FormInput
 * @property {HTMLInputElement|null} $input input实例
 * @property {HTMLElement|null} $info 错误信息 div 实例
 * @property {Function} verify 验证
 * @property {Function} setInfo 设置提示信息
 * @property {Function} bind 绑定实例
 */

/**
 * @type {FormInput}
 */
const formInput = {
  $input: null,
  $info: null,
  verify(verifier, info = '') {
    if (!this.$input) {
      throw new Error('Please bind input element');
      return false;
    }
    const value = this.$input.value;
    let _info = verifier(value);

    if (_info == null) {
      _info = '';
    } else {
      _info += '';
    }

    if (!_info) {
      this.setInfo('');
      return true;
    }
    this.setInfo(info ? info : _info);
    return false;
  },
  setInfo(errInfo) {
    if (!this.$info) {
      throw new Error('Please bind info element');
    }

    this.$info.innerText = errInfo + '';
    return (errInfo + '').length > 0 ? false : true;
  },
  bind(ele) {
    this.$input = ele;
    this.$info = ele?.parentElement?.parentElement?.lastElementChild;
  },
  bindInfo(ele) {
    this.$info = ele;
  }
};

/**
 * @typedef SecurityCode
 * @property {HTMLImageElement} $securityCode
 * @property {Function} getCode 获取验证码
 * @property {Function} setStatus 设置获取状态
 * @property {Function} bind 绑定实例
 */

/**
 * @type {SecurityCode}
 */
const securityCode = {
  $securityCode: null,
  getCode() {
    return new Promise((resolve, reject) => {
      // TODO: 请求base64
      resolve();
    }).then(base64 => {
      let src = `data:image/jpeg;base64,${base64}`;
      if (!this.$securityCode) {
        throw new Error('You must bind securityCode');
      }
      this.$securityCode.src = src;
    })
  },
  setStatus(status = false) {
    const className = 'rm-loading';
    if (status) {
      this.$securityCode.parentNode.classList.remove(className);
    } else {
      this.$securityCode.parentNode.classList.add(className);
    }
  },
  bind(ele) {
    this.$securityCode = ele;
    if (!ele) {
      throw new Error('You must bind a securityCode with click event');
    }
    this.$securityCode.addEventListener('click', async () => {
      this.setStatus(false);
      await this.getCode();
      this.setStatus(true);
    })
  }
};

export {
  formInput,
  securityCode,
}