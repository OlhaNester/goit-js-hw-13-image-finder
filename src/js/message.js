import { info, error, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';

function messageError(err) {
  error({
    title: 'Ups!',
    text: err,
    delay: 2000,
  });
}
function sentMessage(resTotal, resTotalTop) {
  info({
    title: `It's found ${resTotal} results`,
    text: `Available ${resTotalTop} results`,
    delay: 5000,
  });
}

export { messageError, sentMessage };
