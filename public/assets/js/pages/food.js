'use strict';

var table = $('#kt_datatable_food').DataTable({
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
});

jQuery(document).ready(function () {
  table.draw();
});
