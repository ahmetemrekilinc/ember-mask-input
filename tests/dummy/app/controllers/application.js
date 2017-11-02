/* eslint no-console: 0 */
import Ember from 'ember';

export default Ember.Controller.extend({

    actions : {
        valueUpdated(value){
            this.set('updatedValue', value);
        }
    }

});