import { post } from 'jquery';
import { GRPAHQL } from '../../Constants';
import ServerActions from '../actions/ServerActions';

export default class API {
  getLinks() {
    console.log('api');
    post(GRPAHQL, { query: '{ links { _id, name, desc } }' }).done(response => {
      new ServerActions().recieveLinks(response.data.links);
    });
  }
}
