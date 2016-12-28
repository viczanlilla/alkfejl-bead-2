$('#btnRegistration').on('click', function (e) {
  e.preventDefault()
  const $modal = $('#registrationModal')
  if ($modal.length>0) {
    $modal.modal('show')
  } else {
    const $modal = $(`
      <div class="modal fade confirm-modal" tabindex="-1" role="dialog" id="registrationModal">
        <div class="modal-dialog modal-md" role="document">
          <div class="modal-content">
            <div class="modal-header">Regisztráció</div>
            <div class="modal-body">
              <div class="alert alert-danger"></div>
              <div class="form-area"></div>
            </div>
          </div>
        </div>
      </div>
    `)
    const $formContainer = $modal.find('.form-area')
    const $errorContainer = $modal.find('.alert').hide()
    $formContainer.load('/register form', function () {
      $modal.modal('show')
      const $form = $modal.find('form')
      $form.on('submit', function(e) {
        e.preventDefault()
        const data = $(this).serializeArray()
        Promise.resolve(
          $.ajax({
            url: '/ajax/register',
            method: 'POST',
            data,
            dataType: 'json',
            headers: { 'csrf-token': $('[name="_csrf"]').val() }
          })
        )
          .then(json => {
            if (json.success) {
              $('#navContainer').load('/ #navContainer', function() {
                $modal.modal('hide')
              })
            } else {
              $errorContainer.show().text('Nem megfelelő adatok')
            }
          })
          .catch(err => console.log(err))

      })  
    })
  }


})

// $(document).on('click', 'a[href="/login"]', function (e) {

// })
