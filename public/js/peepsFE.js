$(document).ready(function() {

  getPeepsOnStartup();

  $('#peep-submit-form').submit((e) => {
    e.preventDefault();
    const peep = $('#peep-text').val();
    const timePosted = currentTime();
    $('#peep-text')[0].value = '';
    postPeep(peep, timePosted);
  });

  function getPeepsOnStartup() {
    $.ajax({
      url: '/peeps/initialize',
      method: 'get'
    })
    .done(data => {
      displayPeeps(data);
    });
  }

  function postPeep(text, timePosted) {
    const object = {
      text,
      timePosted
    }

    $.ajax({
      url: '/peeps',
      method: 'post',
      data: object
    })
    .done(data => {
        displayPeeps(data);
    });
  }

  function displayPeeps(peeps) {
    $('#peeps-container').empty();

    peeps.forEach(peep => {
      $('#peeps-container').append(wrapPeep(peep));
      $(window).scrollTop(0);
    });
  }

  function wrapPeep(peep) {
    const peepText = `<h4>${peep.text}</h4>`;
    const peepInfo = `<p>${peep.userName} - ${peep.timePosted} - ${peep.datePosted}</p><hr>`;
    const peepWrapped = $('<div class="peep"></div>').append(peepText).append(peepInfo);
    return peepWrapped;
  }

  function currentTime() {
    const date = new Date();
    const hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    return `${hours}:${minutes}`;
  }
  
});