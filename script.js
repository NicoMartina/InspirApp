// Seleccionamos elementos del DOM por su ID
let inputFrase = document.getElementById('phrase-box'); // Contenedor donde se mostrará la frase y el autor
let btnGenerar = document.getElementById('generate-btn'); // Botón para generar una nueva frase
let btnResetear = document.getElementById('reset-btn'); // Botón para resetear el contenido del contenedor

/*
 * Función que obtiene una frase y su autor desde la API de ZenQuotes.
 */
function fetchDatePhrase() {
      // URL de la API para obtener frases aleatorias
      const api_url = "https://zenquotes.io/api/random";

      return fetch(api_url) // Realizamos una solicitud a la API
      .then((response) => {
            // Verificamos si la respuesta es válida (código 200 OK)
            if (!response.ok) {
                  throw new Error("Error al obtener la frase"); // Lanzamos un error si no lo es
            }
            return response.json(); // Convertimos la respuesta a formato JSON
      })
      .then((data) => {
            // Extraemos la frase y el autor del primer objeto en el array de respuesta
            let datosFrases = {
                  frase: data[0].q, // La frase en sí
                  autor: data[0].a  // El autor de la frase
            };
            return datosFrases; // Retornamos el objeto con la frase y el autor
      })
      .catch((error) => {
            // Capturamos cualquier error que ocurra durante la solicitud
            console.error("Error:", error);
            return { frase: "No se pudo obtener la frase.", autor: "" }; // Retornamos un mensaje de error
      });
}

// Evento para generar una nueva frase al hacer clic en el botón
btnGenerar.addEventListener("click", () => {
      fetchDatePhrase()
            .then(({ frase, autor }) => { // Desestructuramos el objeto que nos manda por fetchDatePhrase
                  // Insertamos la frase y el autor en el contenedor del DOM
                  inputFrase.innerHTML = `
                        <p>"${frase}"</p>
                        <p><strong>- ${autor}</strong></p>
                  `;
            });
});

// Evento para resetear el contenido del contenedor al hacer click en el botón
btnResetear.addEventListener('click', () => {
      inputFrase.innerHTML = 'Haz click en "Generar" para obtener una frase motivadora'; 
});
