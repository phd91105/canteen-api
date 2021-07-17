$(function () {
  //load init
  init();
  // event left menu, sidenav
  var status_sidenav = true;
  var status_sidenav_mobile = false;
  var status_calendar = false;
  $(window).resize(function () {
    let width = window.innerWidth;
    let height = window.innerHeight;
    if (width > 992) {
      //reset style left-menu
      $('.left-menu').css('margin-right', '');
      $('.left-menu-item .collapse').collapse('hide');
      $('#logout-menu-item').css('display', 'none');
      $('.overlay').hide();

      if (
        $('div.content').find('section div.table-search div.dataTables_wrapper')
          .length == 0
      ) {
        $('div.content').find('section').removeClass('h-auto');
        // set heigt 550px
        $('div.content').find('section').addClass('min-h-550');
      }
    }
    if (width <= 992) {
      $('.left-menu-item .collapse').collapse('hide');
      if (status_sidenav_mobile) {
        $('.left-menu').css('margin-right', '0px');
        $('.overlay').show();
      }

      if (
        $('div.content').find('section div.table-search div.dataTables_wrapper')
          .length == 0
      ) {
        $('div.content').find('section').removeClass('min-h-550');
        $('div.content').find('section').addClass('h-auto');
      }
    }
  });

  if ($('.btn-toggle-sidenav').length > 0) {
    //fixed btn_toggle_sidenav top-left
    var old_top_btn_toggle_sidenav = $('.btn-toggle-sidenav')
      .css('top')
      .replace(/[^-\d\.]/g, '');
    $(window).scroll(function (e) {
      $('.btn-toggle-sidenav').css(
        'top',
        parseInt(old_top_btn_toggle_sidenav) + $(this).scrollTop(),
      );
    });

    $('.btn-toggle-sidenav').on('click', function () {
      if (status_sidenav) {
        $('.left-menu').css('margin-left', '-230px');
        $(this).removeClass('pe-7s-angle-left');
        $(this).addClass('pe-7s-angle-right');
        $(this).css('opacity', '1');
        $('.content').css('width', '100%');
        status_sidenav = false;
      } else {
        $('.left-menu').css('margin-left', '0px');
        $(this).removeClass('pe-7s-angle-right');
        $(this).addClass('pe-7s-angle-left');
        $(this).removeAttr('style');
        $('.content').css('width', 'calc(100% - 250px)');
        status_sidenav = true;
      }
    });
    $('.btn-toggle-hamburger-menu').on('click', function () {
      if (status_sidenav_mobile) {
        $('.left-menu').css('margin-right', '-251px');
        $(this).removeClass('pe-7s-close');
        $(this).addClass('pe-7s-menu');
        $('.overlay').hide();
        status_sidenav_mobile = false;
      } else {
        $('.left-menu').css('margin-right', '0px');
        $(this).removeClass('pe-7s-menu');
        $(this).addClass('pe-7s-close');
        $('.overlay').show();
        $('#logout-menu-item').css('display', 'block');
        status_sidenav_mobile = true;
      }
    });
    $('.overlay').on('click', function () {
      $('.left-menu').css('margin-right', '-251px');
      $('.btn-toggle-hamburger-menu').removeClass('pe-7s-close');
      $('.btn-toggle-hamburger-menu').addClass('pe-7s-menu');
      $('.overlay').hide();
      status_sidenav_mobile = false;
    });
    //calendar
    $('.btn-toggle-calendar').on('click', function () {
      if (status_calendar) {
        $('#calendarNavbar').css('margin-right', '-281px');
        $('i.btn-toggle-calendar').css('right', '-30px');
        status_calendar = false;
      } else {
        $('#calendarNavbar').css('margin-right', '0px');
        $('i.btn-toggle-calendar').css('right', '266px');
        status_calendar = true;
      }
    });
  }
  $('.left-menu-item > a').each(function () {
    if (window.location.pathname.indexOf($(this).attr('href')) > -1) {
      $(this).addClass('left-menu-item-active');
    }
  });
});

function init() {
  //default open collapse
  let w = window.innerWidth;
  let h = window.innerHeight;

  if (w > 992) {
    $('.left-menu-item .collapse').collapse('show');
  } else {
    $('.left-menu-item .collapse').collapse('hide');
  }

  // screen search
  if (
    $('div.content').find('section div.table-search div.dataTables_wrapper')
      .length > 0
  ) {
    $('div.content').find('section').removeClass('min-h-550');
    $('div.content').find('section').addClass('h-auto');
  } else if (
    $('div.content').find('section div.table-search div.dataTables_wrapper')
      .length == 0
  ) {
    $('div.content').find('section').removeClass('h-auto');
    $('div.content').find('section').addClass('min-h-550');
  }
}
