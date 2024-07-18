function counter() {
  let countdown = 2;

  let timerDiv = document.getElementById("timer");

  let timer = setInterval(function () {
    timerDiv.innerHTML = `Volviendo a inicio ${countdown}`;
    countdown--;
    if (countdown === 0) {
      clearInterval(timer);
      window.location.href = "./"
      alertaNeg()
    }
  }, 1000);
}

// function alertaNeg(){


//   Toastify({
//       text: "SE VACIO EL CARRITO",
//       duration: 3000,
//       destination: "https://github.com/apvarun/toastify-js",
//       newWindow: true,
//       close: true,
//       gravity: "top", // `top` or `bottom`
//       position: "right", // `left`, `center` or `right`
//       stopOnFocus: true, // Prevents dismissing of toast on hover
//       style: {
//       background: "linear-gradient(to right, #741b1b, #0e0101)",
      
//       },
//       onClick: function(){} // Callback after click
//   })
//   .showToast();
// }
