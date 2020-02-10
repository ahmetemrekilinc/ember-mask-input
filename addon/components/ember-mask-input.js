import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { isBlank, isPresent, isEmpty } from '@ember/utils';
import { MASK_MAPPING } from '../masks';
import { action } from '@ember/object';
import $ from 'jquery';
import { guidFor } from '@ember/object/internals';

export default class EmberMaskInput extends Component {

  @tracked selectionStartPosition = 0;
  @tracked selectionEndPosition = 0;

  maskInputId = 'maskInput-' + guidFor(this);

  get _mask() {
    let mask = null;
    let type = this.args.maskType;
    if(!isBlank(type)){
      mask = MASK_MAPPING[type];
    }
    return isBlank(mask) ? this.args.mask : mask;
  }

  get maskType() {
    return this.args.maskType;
  }

  get _clearIfNotMatch() {
    return isPresent(this.args.clearIfNotMatch) ? this.args.clearIfNotMatch : false;
  }

  get _selectOnFocus() {
    return isPresent(this.args.selectOnFocus) ? this.args.selectOnFocus : false;
  }

  maskFunc(element, [mask, clearIfNotMatch, selectOnFocus]) {
    if(isPresent(mask)){
      $(element).mask(mask,
        {
          clearIfNotMatch: clearIfNotMatch,
          selectOnFocus: selectOnFocus
        });
    }
  }

  fillUnmaskedValueAsMasked(element, [mask, selectionStartPosition, selectionEndPosition, maskType, value]) {
    if(isPresent(mask)){
      if(maskType === 'iban'){
        value = String(value).toUpperCase();
      }
      let maskedValue = $(element).masked(value);
      $(element).val(maskedValue);
      $(element).change();

      // restore from variables...
      $(element)[0].setSelectionRange(selectionStartPosition, selectionEndPosition);
    }
  }

  @action
  _domValueChanged(){
    let unmaskedValue = isPresent(this._mask) ? $('#' + this.maskInputId).cleanVal() : this.args.value;
    let maskedValue = isPresent(this._mask) ? $('#' + this.maskInputId).val() : this.args.value;

    let valueToBeSent = this.args.bindMasked === true ? maskedValue : unmaskedValue;

    // store current positions in variables
    let selectionStartPosition = $('#' + this.maskInputId)[0].selectionStart;
    let selectionEndPosition = $('#' + this.maskInputId)[0].selectionEnd;

    if(this.args.maskType === 'iban'){
      valueToBeSent = String(valueToBeSent).toUpperCase();
    }

    let oldValue = this.args.value;

    if(valueToBeSent !== oldValue && !(isEmpty(valueToBeSent) && isEmpty(oldValue))){
      if(isEmpty(valueToBeSent)){
        valueToBeSent = '';
      }

      this.selectionStartPosition = selectionStartPosition;
      this.selectionEndPosition = selectionEndPosition;

      let onUpdate = this.args.onUpdate;
      if(onUpdate){
        onUpdate(valueToBeSent);
      }
    }
  }
}
