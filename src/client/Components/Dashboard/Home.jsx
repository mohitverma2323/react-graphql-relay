import React from 'react';
import FAB from './FAB';

export default class Home extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-xs-6'>
            <h2>story</h2>
            <h3>/ˈstɔːri/</h3>
            <p><i>noun</i></p>
            <div>
              <p>an account of imaginary or real people and events told for entertainment.</p>
              <p className='text-muted'>"an adventure story"</p>
              <p className='text-muted'>synonyms:	tale, narrative, account, recital</p>
            </div>
          </div>
          <div className='col-xs-6'>
            <h2>shot</h2>
            <h3>/ʃɒt/</h3>
            <p><i>noun</i></p>
            <div>
              <p>a small drink of spirits.</p>
              <p className='text-muted'>"he took a shot of whisky"</p>
              <p className='text-muted'>
                synonyms:	injection, inoculation, immunization, vaccination, revaccination, booster
              </p>
            </div>
          </div>
        </div>
        <FAB />
      </div>
    );
  }
}
