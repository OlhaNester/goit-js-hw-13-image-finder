

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

export default {
  messageError, sentMessage  
}