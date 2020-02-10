import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | ember-mask-input', function(hooks) {
  setupRenderingTest(hooks);

  test('maskType=iban works', async function(assert) {
    await render(hbs`<EmberMaskInput @value="tr625373458726249832302425" @maskType='iban' />`);

    assert.equal(this.element.querySelector('input').value, 'tr62 5373 4587 2624 9832 3024 25');
  });

  test('action fires', async function(assert) {
    let actionListenerValue = null;
    this.set('myMaskAction', (val) => {
      actionListenerValue = val;
    });

    await render(hbs`<EmberMaskInput @value="tr625373458726249832302425" @maskType='iban' @onUpdate={{action myMaskAction}} />`);

    assert.equal(this.element.querySelector('input').value, 'tr62 5373 4587 2624 9832 3024 25');

    await fillIn('input', 'tr625373458726249832302427');

    assert.equal(actionListenerValue, 'TR625373458726249832302427');
  });

  test('bindMasked=true works', async function(assert) {
    let actionListenerValue = null;
    this.set('myMaskAction', (val) => {
      actionListenerValue = val;
    });

    await render(hbs`<EmberMaskInput @value="tr625373458726249832302425" @maskType='iban' @bindMasked={{true}} @onUpdate={{action myMaskAction}} />`);

    assert.equal(this.element.querySelector('input').value, 'tr62 5373 4587 2624 9832 3024 25');

    await fillIn('input', 'tr625373458726249832302427');

    assert.equal(actionListenerValue, 'TR62 5373 4587 2624 9832 3024 27');
  });
});
