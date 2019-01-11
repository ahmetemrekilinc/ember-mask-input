import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-mask-input', 'Integration | Component | ember-mask-input', {
  integration: true
});

test('maskType=iban works', function(assert) {
  this.set('obj', {val:'tr625373458726249832302425'});
  this.render(hbs`{{ember-mask-input maskType='iban' value=obj.val}}`);
  assert.equal(this.$('input').val().trim(), 'tr62 5373 4587 2624 9832 3024 25');
});

test('action fires', function(assert) {
  this.set('obj', {val: 'tr625373458726249832302425'});
  let actionListenerValue = null;
  this.on('myMaskAction', function(val) {
    actionListenerValue=val;
  });
  this.render(hbs`{{ember-mask-input maskType='iban' value=obj.val onUpdate=(action 'myMaskAction') }}`);
  assert.equal(this.$('input').val().trim(), 'tr62 5373 4587 2624 9832 3024 25');
  this.$('input').val('tr625373458726249832302427');
  this.$('input').change();
  assert.equal(actionListenerValue, 'TR625373458726249832302427');
});

test('bindMasked=true works', function(assert) {
  this.set('obj', {val: 'tr625373458726249832302425'});
  let actionListenerValue = null;
  this.on('myMaskAction', function(val) {
    actionListenerValue=val;
  });
  this.render(hbs`{{ember-mask-input maskType='iban' value=obj.val onUpdate=(action 'myMaskAction') bindMasked=true }}`);
  assert.equal(this.$('input').val().trim(), 'tr62 5373 4587 2624 9832 3024 25');
  this.$('input').val('tr625373458726249832302427');
  this.$('input').change();
  assert.equal(actionListenerValue, 'TR62 5373 4587 2624 9832 3024 27');
});
