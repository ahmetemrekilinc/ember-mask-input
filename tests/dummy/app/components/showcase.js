//BEGIN-SNIPPET showcase
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Showcase extends Component {

  @tracked ibanValue = 'TR625373458726249832302425';
  @tracked bindMaskedIbanValue = 'TR62 5373 4587 2624 9832 3024 25';
  @tracked customValue = '1234123443214321';
  @tracked enteredAction;
  @tracked phoneNumber;
  @tracked creditCard;

  @action
  updateIbanValue(ibanValue){
    this.enteredAction = true;
    this.ibanValue = ibanValue;
  }

  @action
  updateBindMaskedIbanValue(bindMaskedIbanValue){
    this.bindMaskedIbanValue = bindMaskedIbanValue;
  }

  @action
  updateCustomValue(customValue){
    this.customValue = customValue;
  }

  @action
  updatePhoneNumber(phoneNumber){
    this.phoneNumber = phoneNumber;
  }

  @action
  updateCreditCard(creditCard){
    this.creditCard = creditCard;
  }
}
//END-SNIPPET
