$(function () {
  if (selected.indexOf('0') != -1) $('#admin').prop('checked', true);
  if (selected.indexOf('1') != -1) $('#user').prop('checked', true);

  if (window.location.search) {
    $('#noRecord').html(Message.INFO.ICL001);
  }
  $('input[name=joiningDateFrom]').on('input', () => {
    $('#dateError').hide();
    $('input[name=joiningDateFrom]').removeClass('text-danger');
  });
  $('input[name=joiningDateTo]').on('input', () => {
    $('#dateError').hide();
    $('input[name=joiningDateTo]').removeClass('text-danger');
  });
  $('#searchForm').on('submit', function (event) {
    if (
      ($('input[name=joiningDateFrom]').val() &&
        moment($('input[name=joiningDateFrom]').val()).format() ==
          'Invalid date') ||
      ($('input[name=joiningDateTo]').val() &&
        moment($('input[name=joiningDateTo]').val()).format() == 'Invalid date')
    ) {
      if (
        $('input[name=joiningDateFrom]').val() &&
        moment($('input[name=joiningDateFrom]').val()).format() ==
          'Invalid date'
      ) {
        $('input[name=joiningDateFrom]').addClass('text-danger');
        event.preventDefault();
      }
      if (
        $('input[name=joiningDateTo]').val() &&
        moment($('input[name=joiningDateTo]').val()).format() == 'Invalid date'
      ) {
        $('input[name=joiningDateTo]').addClass('text-danger');
        event.preventDefault();
      }
    } else if (
      moment($('input[name=joiningDateFrom]').val()).format() !=
        'Invalid date' &&
      moment($('input[name=joiningDateTo]').val()).format() != 'Invalid date' &&
      moment($('input[name=joiningDateFrom]').val()).format() >
        moment($('input[name=joiningDateTo]').val()).format()
    ) {
      $('#dateError').text(Message.ERROR.ECL018).show();
      event.preventDefault();
    } else return;
  });

  Inputmask('datetime', {
    inputFormat: 'yyyy/mm/dd',
    leapday: '-02-29',
  }).mask('#kt_date_input');

  Inputmask('datetime', {
    inputFormat: 'yyyy/mm/dd',
    leapday: '-02-29',
  }).mask('#kt_date_input2');
});

function getCurrentDate() {
  let dateObj = new Date();
  let month = dateObj.getMonth() + 1;
  let day = String(dateObj.getDate()).padStart(2, '0');
  let year = dateObj.getFullYear();
  let output = '';
  if (month < 10) {
    output = year + '-' + '0' + month + '-' + day;
  } else {
    output = year + '-' + month + '-' + day;
  }
  return output;
}

function resetSearchForm() {
  $('.alert').remove();
  $(':input').val('').change();
  $('#admin').prop('checked', false);
  $('#user').prop('checked', false);
  $('#dateError').html('');
  $('input[name=joiningDateFrom]').removeClass('text-danger');
  $('input[name=joiningDateTo]').removeClass('text-danger');
}

function hideButton() {
  $('.buttons-csv').remove();
}

function addButton(title, link) {
  $('.dt-buttons').prepend(`<div class="dt-buttons btn-group flex-wrap">
    <a href="${link}">
      <button class="btn btn-light-success buttons-csv" aria-controls="kt_datatable_2" type="button">
        <span>${title}</span>
      </button>
    </a>
    </div>`);
}

function deleteUserError() {
  $('#deleteError').html(Message.ERROR.ECL019).show();
}
