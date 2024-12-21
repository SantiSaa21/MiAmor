const yesButton = document.getElementById('yes');
const noButton = document.getElementById('no');
const mainContent = document.querySelector('main');

const proposalAccepted = localStorage.getItem('proposalAccepted');

if (proposalAccepted === 'true') {
    displayThankYouMessage();
} else {
    displayQuestion();
}

noButton?.addEventListener('click', () => {
     let noSize = parseInt(noButton.style.fontSize) || 16;
     let yesSize = parseInt(yesButton.style.fontSize) || 16;

     noSize -= 2;
     yesSize += 2;

     if (noSize <= 0)
     {
          noButton.style.display = 'none';
     }
     else
     {
          noButton.style.fontSize = `${noSize}px`;
     }

     yesButton.style.fontSize = `${yesSize}px`;
});

yesButton?.addEventListener('click', () => {
     localStorage.setItem('proposalAccepted', 'true');
     displayThankYouMessage();
});

function displayQuestion() {
     mainContent.innerHTML = `
          <h1>¿Quieres ser mi novia?</h1>
          <button id="yes">Sí</button>
          <button id="no">No</button>
     `;

     const yesButton = document.getElementById('yes');
     const noButton = document.getElementById('no');

     noButton?.addEventListener('click', () => {
          let noSize = parseInt(noButton.style.fontSize) || 16;
          let yesSize = parseInt(yesButton.style.fontSize) || 16;

          noSize -= 2;
          yesSize += 2;

          if (noSize <= 0)
          {
               noButton.style.display = 'none';
          }
          else
          {
               noButton.style.fontSize = `${noSize}px`;
          }

          yesButton.style.fontSize = `${yesSize}px`;
     });

     yesButton?.addEventListener('click', () => {
          localStorage.setItem('proposalAccepted', 'true');
          displayThankYouMessage();
     });
}

function displayThankYouMessage() {
     const audio = new Audio('src/aud/Éxtasis.mp3');
     const startTime = 12;
     const endTime = 170;

     function playLoop() {
          audio.currentTime = startTime;
          audio.play();

          audio.ontimeupdate = () => {
               if (audio.currentTime >= endTime)
               {
                    audio.currentTime = startTime;
               }
          };
     }

     playLoop();

     mainContent.innerHTML = `
          <h1>¡Gracias por aceptar ser mi novia! ❤️</h1>
          <img src="src/img/fondo.jpg" alt="Foto" id="thank-you-image" style="border-radius: 15px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top: 20px;"> <br>
          <button id="reset" style="margin-top: 20px; padding: 10px 20px; font-size: 16px; color: white; background-color: #a00000; border: none; border-radius: 5px;">Reiniciar</button>
     `;

     const thankYouImage = document.getElementById('thank-you-image');
     const resetButton = document.getElementById('reset');

     // Función para ajustar el tamaño de la imagen según el tamaño de la ventana
     function adjustImageSize() {
          if (window.innerWidth <= 480)
          {
               thankYouImage.style.width = '90%';
               thankYouImage.style.maxWidth = '320px';
          }
          else
          {
               thankYouImage.style.width = '520px';
          }
     }

     adjustImageSize();

     window.addEventListener('resize', adjustImageSize);

     resetButton?.addEventListener('click', () => {
          audio.pause();
          audio.currentTime = startTime;

          localStorage.removeItem('proposalAccepted');
          displayQuestion();
     });
}