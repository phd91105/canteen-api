'use strict';

var table = $('#kt_datatable_2').DataTable({
  responsive: true,
  ordering: false,
  searching: true,
  lengthChange: false,
  info: true,
  pageLength: 20,
  pagingType: 'full_numbers',
  dom: '<"top"flp>rt<"bottom"iB><"clear">',
  language: {
    emptyTable: Message.INFO.ICL001,
    zeroRecords: Message.INFO.ICL001,
  },
  buttons: [
    {
      extend: 'csv',
      text: 'Export CSV',
      exportOptions: {
        orthogonal: 'exportcsv',
        modifier: { page: 'all', search: 'none' },
        format: {
          header: function (data, index) {
            if (index == 1) {
              return 'Name';
            } else {
              return data;
            }
          },
        },
      },
    },
  ],
  columnDefs: [
    {
      targets: 3,
      visible: false,
    },
    {
      targets: 6,
      width: '75px',
      render: function (data, type) {
        var flag = {
          0: { title: 'Admin', class: ' label-light-danger' },
          1: { title: 'User', class: ' label-light-info' },
        };
        if (type === 'exportcsv') {
          return data;
        }
        if (typeof flag[data] === 'undefined') {
          return data;
        }
        return (
          '<span class="label label-lg font-weight-bold' +
          flag[data].class +
          ' label-inline">' +
          flag[data].title +
          '</span>'
        );
      },
    },
    {
      targets: 7,
      visible: false,
    },
    {
      targets: 8,
      visible: false,
    },
  ],
});

jQuery(document).ready(function () {
  $('.dataTables_filter').remove();
  $.fn.dataTable.ext.search.push(function (
    settings,
    searchData,
    index,
    rowData,
  ) {
    if (rowData[4]) {
      return true;
    }
    return false;
  });
  table.draw();
  if ($('.dataTables_empty').html() == Message.INFO.ICL001) {
    $('#kt_datatable_2_wrapper').remove();
    $('#searchForm').append(
      `<div id="noRecord" class="text-center mt-3">${Message.INFO.ICL001}</div>`,
    );
    $('.card-body').append(`
    <a href="/user/add">
      <button class="btn btn-light-success buttons-csv" aria-controls="kt_datatable_2" type="button">
        <span>New</span>
      </button>
    </a>`);
  }
  $('#kt_datatable_2').css('visibility', 'visible');
});
