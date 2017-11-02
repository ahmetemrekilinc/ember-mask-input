import Ember from 'ember';
import {MASK_MAPPING} from './masks';

export default Ember.Component.extend({
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

  _mask: Ember.computed('maskType', 'mask', function(){
    let mask = null;
    let type = this.get('maskType');
    if(!Ember.isBlank(type)){
      mask = MASK_MAPPING[this.get('maskType')];
    }
    if(Ember.isBlank(mask)){
      return this.get('mask');
    }else{
      return mask;
    }
  }),

  _clearIfNotMatch:Ember.computed('clearIfNotMatch', function() {
    if (Ember.isPresent(this.get('clearIfNotMatch'))) {
      return this.get('clearIfNotMatch');
    }
    return false;
  }),

  _selectOnFocus:Ember.computed('selectOnFocus', function() {
    if (Ember.isPresent(this.get('selectOnFocus'))) {
      return this.get('selectOnFocus');
    }
    return false;
  }),

  valueChangedObserver:Ember.observer('value', function(){
    this.fillUnmaskedValueAsMasked();
  }),

  didInsertElement() {
    this._super(...arguments);
    if(Ember.isPresent(this.get('_mask'))){
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
    if(Ember.isPresent(this.get('_mask'))){
      Ember.run.scheduleOnce('afterRender', this, function(){
        let unmaskedValue = Ember.isPresent(this.get('_mask')) ? this.$().cleanVal() : this.get('value');

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
    let unmaskedValue = Ember.isPresent(this.get('_mask')) ? this.$().cleanVal() : this.get('value');
    let maskedValue = Ember.isPresent(this.get('_mask')) ? this.$().val() : this.get('value');

    let valueToBeSent = this.get('bindMasked') === true ? maskedValue : unmaskedValue;

    // store current positions in variables
    let selectionStartPosition = this.$()[0].selectionStart;
    let selectionEndPosition = this.$()[0].selectionEnd;

    if(this.get('maskType') === 'iban'){
      valueToBeSent = String(valueToBeSent).toUpperCase();
    }

    let oldValue = this.get('value');

    if(valueToBeSent !== oldValue && !(Ember.isEmpty(valueToBeSent) && Ember.isEmpty(oldValue))){
      if(Ember.isEmpty(valueToBeSent)){
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
