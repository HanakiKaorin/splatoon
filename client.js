$(function () {
  var host = 'https://app.splatoon2.nintendo.net';
  var gamemode = 'regular';
  var item = 0;
  var maps = {};

  function api() {
    $.ajax({
      type: 'POST',
      url: 'https://api.kyufox.com/splatoon',
      dataType: 'json',
      success: function(data) {
        console.log('SUCCESS: Splatoon API');
        maps = data.data
        update();
      },
      error: function(data) {
        console.error('ERROR: Splatoon API');
        console.error(data);
      }
    });
  }

  function update() {
    $('.title .inner').text(maps[gamemode][item].game_mode.name);
    $('#stage_a .name').text(maps[gamemode][item].stage_a.name);
    $('#stage_b .name').text(maps[gamemode][item].stage_b.name);
    $('#stage_a').css('background-image', 'url(\'' + host + maps[gamemode][item].stage_a.image + '\')')
    $('#stage_b').css('background-image', 'url(\'' + host + maps[gamemode][item].stage_b.image + '\')')

    var start_time = new Date(maps[gamemode][item].start_time*1000).getHours();
    $('#start_time').text(start_time + ':00');
    var end_time = new Date(maps[gamemode][item].end_time*1000).getHours();
    $('#end_time').text(end_time + ':00');

    var now_min = Math.floor(Date.now() / 1000) - maps[gamemode][item].start_time;
    var end_min = maps[gamemode][item].end_time - maps[gamemode][item].start_time;
    var pos = Math.floor((now_min / end_min) * $('.progress .inner').width() - (now_min / end_min) * $('.progress img').width());
    console.log(pos);
    $('.progress img').css('transform', 'translate(' + pos + 'px, 0%)')    
  }

  api();
});
