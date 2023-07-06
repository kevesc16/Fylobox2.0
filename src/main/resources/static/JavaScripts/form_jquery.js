$("#form_registro").validate({
    rules: {
        nombre: {
            required: true,
            minlength: 3,
            maxlength: 30
        },
        apellido: {
            required: true,
            minlength: 3,
            maxlength: 30
        },
        rol: {
            required:true
        },
        genero: {
            required: true
        },
        correo: {
            required: true,
            email: true
        },
        telefono: {
            number: true,
            minlength: 6,
            maxlength: 9
        },
        usuario: {
            required: true,
            minlength: 3,
            maxlength:30
        },
        password: {
            required: true,
            minlength: 3,
            maxlength:30
        },
        ConPassword: {
            required: true,
            minlength: 3,
            maxlength:30
        }
    }
});


$(document).ready(function(){
    $("#guardar").click(function(){
        if($("#form_registro").valid() == false) {

        }else{
            
            let nombre = $("#nombre").val();
            let apellido = $("#apellido").val();
            let genero = $("#genero").val();
            let correo = $("#correo").val();
            let telefono = $("#telefono").val();
            let usuario = $("#usuario").val();
            let contrasena = $("#password").val();
            let conContrasena = $("#ConPassword").val();
            let expresionRegular = /^\S+$/;

            if(!expresionRegular.test(nombre) ||
            !expresionRegular.test(apellido) ||
            !expresionRegular.test(correo) ||
            !expresionRegular.test(telefono) ||
            !expresionRegular.test(usuario) ||
            !expresionRegular.test(contrasena) ||
            !expresionRegular.test(conContrasena)){
                alert("El campo no debe contener espacios");
            }
            
        }
    });
})

$("#InicioSe").validate({
    rules: {
        usuario:{
            required: true,
            minlength: 3
        },
        password:{
            required:true
        }
    }
});

/*$(document).ready(function(){
    $("#btnSesion").click(function(){
        if($("#InicioSe").valid() == false) {
            alert("Usuario no existe")
        }else{    
            alert('Has ingresado correctamente ESTO ES LO QUE SE MUESTRA')
            location.href="pagina4.html"
        }
    });
})
*/
$(document).ready(function(){
    $("#btnVolver2").click(function(){
        location.href="index.html"
    });
})

$("#confiCambios").validate({
    rules: {
        contraNueva:{
            required: true,
            minlength: 3,
            maxlength: 25
        },
        confiContra:{
            required:true,
            minlength: 3,
            maxlength: 25
        }
    }
});

$(document).ready(function(){
    $("#ConfirmarCambios").click(function(){
        if($("#confiCambios").valid() == false) {
            alert("Ingrese otra contraseña")
        }else{    
            alert('Contraseña modificada correctamente')
        }
    });
})
// Función para enviar los datos del formulario al backend
$('#guardar').click(function() {
    const user = {
        nombre: $('#nombre').val(),
        apellido: $('#apellido').val(),
        genero: $('#genero').val(),
        correo: $('#correo').val(),
        telefono: $('#telefono').val(),
        usuario: $('#usuario').val(),
        password: $('#password').val(),
        rol: $('#rol').val()
    };

    // Send the AJAX request to the backend
    $.ajax({
        url: '/users',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(user),
        success: function (response) {
            // Handle the server response if necessary
            alert(response);
            // Clear the form after successful registration
            $('#form_registro')[0].reset(), window.location.href = 'Login.html';
        },
        error: function (error) {
            // Handle the error if necessary
            alert('Error al registrar usuario');
        }
    });
})
$(document).ready(function() {
                        // Agregar un evento click al botón "Iniciar Sesión"
                        $("#btnSesion").click(function() {
                            // Obtener los valores del formulario
                            const user = {
                                usuario: $("#usuario").val(),
                                password: $("#password").val(),
                                rol:$("#rol").val()
                            };
                            // Realizar la solicitud POST utilizando AJAX
                            $.ajax({
                                url: '/users/login', // Ruta al endpoint de inicio de sesión en el backend
                                type: 'POST',
                                contentType: 'application/json',
                                data: JSON.stringify(user),
                                success: function (response) {
                                    console.log(response.rol)
                                    if (response) {
                                        if('Cliente' !== response.rol){
                                            alert('Bienvenid@' + user.usuario)
                                            alert("Has ingresado como Administrador!")
                                            window.location.href = 'pagina4.html'
                                        }else if('Administrador' !== response.rol){
                                            alert('Bienvenid@' + user.usuario)
                                            alert("Has ingresado como Cliente!")
                                            window.location.href = 'cliente.html'
                                        }

                                    } else {
                                        // Mostrar un mensaje de error en caso de credenciales inválidas
                                        alert("Oye mete bien el usuario y clave");

                                    }
                                },
                                error: function (error) {
                                    // Manejar el error si es necesario
                                    alert("Error al realizar la solicitud de inicio de sesión.");
                                }
                            })
                        })

                    });