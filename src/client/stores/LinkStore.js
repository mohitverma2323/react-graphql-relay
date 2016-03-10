/* eslint-disable indent */
import AppDispatcher from '../dispatcher/AppDispatcher';
import { Actions } from '../../Constants';
import { EventEmitter } from 'events';


export default class LinkStore extends EventEmitter {
  constructor(props) {
    super(props);

    this._links_ = [];

    AppDispatcher.register(action => {
      switch (action.actionType) {
        case Actions.RECIEVE_LINKS: {
          this._links_ = action.links;
          console.log('in store');
          this.emit('change');
          break;
        }

        default: { }

      }
    });
  }

  getAllLinks() {
    return this._links_;
  }
}
