import React from 'react';
import { Card, CardTitle, CardText, CardMedia } from 'material-ui';

export default class About extends React.Component {

  render() {
    return (
      <div className='container'>
        <br />
        <Card className='span12'>
          <CardTitle
            title={'About'}
            style={{ padding: 20 }} />
          <CardMedia >
            <img src="http://lorempixel.com/890/250/business/" />
          </CardMedia>
          <CardText style={{ padding: 50 }}>
            <h3>
              Introduction
            </h3>
            <p>An app that let's you take shots of short stories on the run.</p>
            <p>
              Excepteur reprehenderit sint exercitation ipsum consequat qui sit id velit elit.
              Velit anim eiusmod labore sit amet. Voluptate voluptate irure occaecat deserunt incididunt esse in.
              Sunt velit aliquip sunt elit ex nulla reprehenderit qui ut eiusmod ipsum do.
              Duis veniam reprehenderit laborum occaecat id proident nulla veniam.
              Duis enim deserunt voluptate aute veniam sint pariatur exercitation.
              Irure mollit est sit labore est deserunt pariatur duis aute laboris cupidatat.
              Consectetur consequat esse est sit veniam adipisicing ipsum enim irure.
            </p>
            <h3>
              Irure mollit est sit labore
            </h3>
            <p>
              Excepteur reprehenderit sint exercitation ipsum consequat qui sit id velit elit.
              Velit anim eiusmod labore sit amet. Voluptate voluptate irure occaecat deserunt incididunt esse in.
              Sunt velit aliquip sunt elit ex nulla reprehenderit qui ut eiusmod ipsum do.
              Duis veniam reprehenderit laborum occaecat id proident nulla veniam.
              Duis enim deserunt voluptate aute veniam sint pariatur exercitation.
              Irure mollit est sit labore est deserunt pariatur duis aute laboris cupidatat.
              Consectetur consequat esse est sit veniam adipisicing ipsum enim irure.
            </p>
          </CardText>
        </Card>
        <br />
      </div>
    );
  }
}
