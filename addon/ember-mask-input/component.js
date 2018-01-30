import { scheduleOnce } from '@ember/runloop';
import { isBlank, isPresent, isEmpty } from '@ember/utils';
import { computed, observer } from '@ember/object';
import Component from '@ember/component';
import { MASK_MAPPING } from './masks';

export default Component.extend({
  tagName:'input',
  attributeBindings: [
    'accept',
    'autocomplete',
    'autosave',
    'dir',
    'formaction',
    'formenctype',
    'formmethod',
    'formnovalidate',
    'formtarget',
    'height',
    'inputmode',
    'lang',
    'list',
    'max',
    'min',
    'multiple',
    'name',
    'pattern',
    'size',
    'step',
    'type',
    'value',
    'width',
    'autocapitalize',
    'autocorrect',
    'autofocus',
    'disabled',
    'form',
    'maxlength',
    'placeholder',
    'readonly',
    'required',
    'selectionDirection',
    'spellcheck',
    'tabindex',
    'title'
  ],

  selectionStartPosition : 0,
  selectionEndPosition : 0,

  _mask: computed('maskType', 'mask', function(){
    let mask = null;
    let type = this.get('maskType');
    if(!isBlank(type)){
      mask = MASK_MAPPING[this.get('maskType')];
    }
    if(isBlank(mask)){
      return this.get('mask');
    }else{
      return mask;
    }
  }),

  _clearIfNotMatch:computed('clearIfNotMatch', function() {
    if (isPresent(this.get('clearIfNotMatch'))) {
      return this.get('clearIfNotMatch');
    }
    return false;
  }),

  _selectOnFocus:computed('selectOnFocus', function() {
    if (isPresent(this.get('selectOnFocus'))) {
      return this.get('selectOnFocus');
    }
    return false;
  }),

  valueChangedObserver:observer('value', function(){
    this.fillUnmaskedValueAsMasked();
  }),

  didInsertElement() {
    this._super(...arguments);
    if(isPresent(this.get('_mask'))){
      this.$().mask(this.get('_mask'),
      {
        clearIfNotMatch: this.get('_clearIfNotMatch'),
        selectOnFocus: this.get('_selectOnFocus')
      });
    }
  },

  change() {
    this._domValueChanged();
  },

  input() {
    this._domValueChanged();
  },

  fillUnmaskedValueAsMasked(){
    if(isPresent(this.get('_mask'))){
      scheduleOnce('afterRender', this, function(){
        let unmaskedValue = isPresent(this.get('_mask')) ? this.$().cleanVal() : this.get('value');

        if(this.get('maskType') === 'iban'){
          unmaskedValue = String(unmaskedValue).toUpperCase();
        }
        let maskedValue = this.$().masked(unmaskedValue);
        this.$().val(maskedValue);
        this.$().change();
        // restore from variables...
        let selectionStartPosition = this.get('selectionStartPosition');
        let selectionEndPosition = this.get('selectionEndPosition');
        this.$()[0].setSelectionRange(selectionStartPosition, selectionEndPosition);
      });
    }
  },

  _domValueChanged(){
    let unmaskedValue = isPresent(this.get('_mask')) ? this.$().cleanVal() : this.get('value');
    let maskedValue = isPresent(this.get('_mask')) ? this.$().val() : this.get('value');

    let valueToBeSent = this.get('bindMasked') === true ? maskedValue : unmaskedValue;

    // store current positions in variables
    let selectionStartPosition = this.$()[0].selectionStart;
    let selectionEndPosition = this.$()[0].selectionEnd;

    if(this.get('maskType') === 'iban'){
      valueToBeSent = String(valueToBeSent).toUpperCase();
    }

    let oldValue = this.get('value');

    if(valueToBeSent !== oldValue && !(isEmpty(valueToBeSent) && isEmpty(oldValue))){
      if(isEmpty(valueToBeSent)){
        valueToBeSent = null;
      }
      this.set('value', valueToBeSent);

      this.set('selectionStartPosition', selectionStartPosition);
      this.set('selectionEndPosition', selectionEndPosition);

      let onUpdate = this.get('onUpdate');
      if(onUpdate){
        onUpdate(valueToBeSent);
      }
    }
  }
});
