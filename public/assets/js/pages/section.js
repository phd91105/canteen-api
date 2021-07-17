'use strict';

var table = $('#kt_datatable_section').DataTable({
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
  buttons: [],
});

$(function () {
  table.draw();
});
