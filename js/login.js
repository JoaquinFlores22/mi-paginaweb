function login() {
    let user;
    let pass;
    let email;
  
    user = document.getElementById("user").value;
    pass = document.getElementById("pass").value;
    email = document.getElementById("email").value;
  
    if (user == "joaquin" && pass == "1234") {
      Swal.fire({
        icon: 'Good job!',
        title: "session iniciada",
        text: "Exelente, ya podes seguir comprando.",
        footer: '<a href="./index.html">vuelve al inicio</a>',
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "NO INGRESASTE LOS DATOS",
        text: "Por favor ingresa los datos pedidos",
        footer: `vuelve a intentarlo, gracias.`,
      });
    }
  
  
  
    // user == "joaquin" && pass == "123"
    //   ? Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: "Something went wrong!",
    //       footer: '<a href="./index.html">vuelve al inicio</a>',
    //     }) : Swal.fire({
    //       icon: "error",
    //       title: "NO INGRESASTE LOS DATOS",
    //       text: "Por favor ingresa los datos pedidos",
    //       footer: `vuelve a intentarlo, gracias.`,
    //     });
    // aca use el operador ternario para remplazar el if:else que tengo comentado arriba <3
  }
  
  let btnLogin = document.getElementById("login");
  btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    login();
  });