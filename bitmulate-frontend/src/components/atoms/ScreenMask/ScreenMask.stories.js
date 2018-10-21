import React from 'react';
import { storiesOf } from '@storybook/react';
import ScreenMask from './ScreenMask'

//storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('ScreenMask', module)
  .add('with text', () => <ScreenMask/>)