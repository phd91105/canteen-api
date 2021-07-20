$(document).ready(() => {
  $(':input').on('input', () => {
    $('.alert').remove();
  });
  $('#loginForm').validate({
    submitHandler: function (form) {
      $('#btnLogin')
        .html('<span class="spinner-border spinner-border-sm"></span>')
        .attr('disabled', 'disabled');
      form.submit();
    },
    rules: {
      user: {
        required: true,
      },
      password: {
        required: true,
      },
    },
    messages: {
      user: {
        required: Message.ERROR.ECL002('Email'),
      },
      password: {
        required: Message.ERROR.ECL002('Password'),
      },
    },
    errorClass: 'error is-invalid',
  });

  $('#resetForm').validate({
    submitHandler: function (form) {
      $('#btnLogin')
        .html('<span class="spinner-border spinner-border-sm"></span>')
        .attr('disabled', 'disabled');
      form.submit();
    },
    rules: {
      password: {
        required: true,
      },
      confirmPassword: {
        required: true,
        equalTo: '[name="password"]',
      },
    },
    messages: {
      password: {
        required: Message.ERROR.ECL002('Password'),
      },
      confirmPassword: {
        required: Message.ERROR.ECL002('Password Confirmation'),
      },
    },
    errorClass: 'error is-invalid',
  });
});
