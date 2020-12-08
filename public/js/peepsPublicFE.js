$(document).ready(function() {

  getPeepsOnStartup();

  function getPeepsOnStartup() {
    $.ajax({
      url: '/peeps/initialize',
      method: 'get'
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
  
});