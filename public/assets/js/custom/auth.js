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
});
