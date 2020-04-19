(function () {

  $('.match-height').matchHeight();

  $('#nav-mobile-toggle').click(function () {
    $('#header-nav').toggleClass('on');
  });

  $('ul#header-nav li.' + $('body').attr('id')).addClass('selected');

  $('nav#toc-nav ul li.' + $('div.documentation-container').attr('id')).addClass('selected');

  //$('nav#toc-nav ul li.' + $('div.documentation-container').attr('id') + ' span').html('-');
})();