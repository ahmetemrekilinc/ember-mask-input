/* eslint no-console: 0 */
import Controller from '@ember/controller';

export default Controller.extend({

    actions : {
        valueUpdated(value){
            this.set('updatedValue', value);
        }
    }

});