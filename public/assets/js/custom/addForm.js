$(function () {
  Inputmask('datetime', {
    inputFormat: 'yyyy/mm/dd',
    leapday: '-02-29',
  }).mask('#kt_date_input');
  $(':input').on('input', () => {
    $('.alert').remove();
    $('#deleteError').html('');
  });
  $('#userForm').validate({
    errorClass: 'col-12 error is-invalid',
    submitHandler: function (form) {
      $('#register')
        .html('<span class="spinner-border spinner-border-sm"></span>')
        .attr('disabled', 'disabled');
      form.submit();
    },
    rules: {
      name: { required: true, maxlength: 50 },
      email: {
        required: true,
        maxlength: 255,
        pattern: /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/,
      },
      joiningDate: { required: true },
      password: {
        required: true,
        minlength: 8,
        maxlength: 20,
        pattern: /^([a-z\d]+-)*[a-z\d]+$/,
      },
      passwordConfirmation: {
        required: true,
        equalTo: '[name="password"]',
      },
      sectionId: {
        required: true,
      },
    },
    messages: {
      email: {
        required: Message.ERROR.ECL002('Email'),
        maxlength: function () {
          return jQuery.validator.format(
            Message.ERROR.ECL011,
            'Email',
            255,
            $('input[name=email]').val().length,
          );
        },
        pattern: Message.ERROR.ECL007,
      },
      name: {
        required: Message.ERROR.ECL002('User Name'),
        maxlength: function () {
          return jQuery.validator.format(
            Message.ERROR.ECL011,
            'User Name',
            50,
            $('input[name=name]').val().length,
          );
        },
      },
      joiningDate: {
        required: Message.ERROR.ECL002('Joining Date'),
        date: '',
      },
      password: {
        required: Message.ERROR.ECL002('Password'),
        minlength: Message.ERROR.ECL015,
        maxlength: Message.ERROR.ECL015,
        pattern: Message.ERROR.ECL005('Password'),
      },
      passwordConfirmation: {
        required: Message.ERROR.ECL002('Password'),
        minlength: Message.ERROR.ECL015,
        maxlength: Message.ERROR.ECL015,
        equalTo: Message.ERROR.ECL016,
      },
      sectionId: {
        required: Message.ERROR.ECL002('Section'),
      },
    },
  });
});
