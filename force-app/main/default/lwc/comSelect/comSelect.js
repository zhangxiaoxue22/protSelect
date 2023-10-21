import { LightningElement, api } from 'lwc'

/**
 * カスタマイズの選択リストコンポーネント
 *   目的: スクロールdiv内で選択リストを開くと上手く表示できない問題を修正
 * @date 9/7/2023
 * @author zhang.xiaoxue
 *
 * @class ComSelect
 * @typedef {textCommSelect}
 * @extends {LightningElement}
 */
export default class ComSelect extends LightningElement {

  // 表示ラベル名
  @api label
  // 表示選択値のvalue
  @api value
  // 選択リスト
  @api options
  // エラーメッセージ、ある場合のみ表示する
  @api errors
  // trueを設定する場合、入力不可
  @api disabled
  // true入力場合、inputできる
  @api isinput = false;
  // pop up画面特別バグ修正
  @api popupOffset = 0

  _showDropDown = false;
  _inputVal = ''

  get labelName() {
    if (this.value && this.options && this.options.length > 0) {
        if (!this.options.find(({ value }) => value === this.value)) {
            return this.value
        } else {
            return this.options.find(({ value }) => value === this.value)?.label
        }
    }
    return '-- 選択してください --'
  }

  /**
   * @author zhang.xiaoxue
   * @name inputHandler
   * @kind method
   * @param {any} event
   * @returns {void}
   */
  inputHandler(event) {
    this.value = event.target.value
    const inputEvent = new CustomEvent('input', {
        detail: event.target.value
      })
      this.dispatchEvent(inputEvent)
      this._showDropDown = false
  }

  /**
   * 選択リスト表示要否の取替
   * @date 9/7/2023
   * @author zhang.xiaoxue
   *
   * @param {*} event
   */
  toggleOptions(event) {
    if (this.disabled || !this.options) return
    this._showDropDown = !this._showDropDown
    // ブラウザの相対位置 + 偏移量
    let offset = event.target.getBoundingClientRect().top + event.target.offsetHeight
    let leftpos = event.target.getBoundingClientRect().left
    this.template.querySelector('.my-dropdown').style.top = `${offset}px`
    if (this.popupOffset === 0) {
      this.template.querySelector('.my-dropdown').style.left = `${leftpos}px`
    } else {
      this.template.querySelector('.my-dropdown').style.left = `${leftpos}px` + `${this.popupOffset}px`
    }
  }

  /**
   * 選択値を選択したら、selectイベントを通知する
   * @date 9/7/2023
   * @author zhang.xiaoxue
   *
   * @param {*} event
   */
  selectHandler(event) {
    const index = event.currentTarget.dataset.index
    const selectEvent = new CustomEvent('select', {
      detail: this.options[index]
    })
    this.dispatchEvent(selectEvent)
    this._showDropDown = false
  }

  handleBlur() {
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    setTimeout(() => {
      this._showDropDown = false
    }, 100)
  }

  get openDropDown() {
    let css = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click'
    if (this._showDropDown) {
      return `${css} slds-is-open`
    }
    return css
  }

  get elementClass() {
    if (this.errors) {
      return 'slds-form-element slds-has-error'
    }
    return 'slds-form-element'
  }

  get inputClass() {
    let css = 'slds-input_faux slds-combobox__input slds-combobox__input-value'
    if (this.disabled) {
      return `${css} slds-is-disabled`
    }
    return css
  }

}