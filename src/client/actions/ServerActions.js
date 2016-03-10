import AppDispatcher from '../dispatcher/AppDispatcher';
import { Actions } from '../../Constants';

export default class ServerActions {
  recieveLinks(links) {
    console.log('recieveLinks');
    AppDispatcher.dispatch({
      actionType: Actions.RECIEVE_LINKS,
      links: links
    });
  }
}
