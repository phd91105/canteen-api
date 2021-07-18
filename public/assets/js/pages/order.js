'use strict';

var table = $('#kt_datatable_order').DataTable({
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
      },
    },
  ],
  columnDefs: [
    {
      targets: 2,
      width: '75px',
      render: function (data) {
        return (
          '<span class="label label-lg font-weight-bold label-light-secondary text-info label-inline">' +
          data +
          '</span>'
        );
      },
    },
    {
      targets: 3,
      width: '75px',
      render: function (data, type) {
        var flag = {
          0: { title: 'Waiting', class: ' label-light-primary' },
          1: { title: 'Paid', class: ' label-light-warning' },
          2: { title: 'Success', class: ' label-light-success' },
          3: { title: 'Canceled', class: ' label-light-danger' },
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
  ],
});

jQuery(document).ready(function () {
  table.draw();
});
