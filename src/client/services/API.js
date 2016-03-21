import { post } from 'jquery';
import { GRPAHQL } from '../../Constants';
import ServerActions from '../actions/ServerActions';

export default class API {
  getLinks() {
    post(GRPAHQL, {
      query:
      `{
        links {
          _id,
          story,
          author
        }
      }`
    }).done(response => {
      new ServerActions().recieveLinks(response.data.links);
    });
  }
}
