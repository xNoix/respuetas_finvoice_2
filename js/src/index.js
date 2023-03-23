function loadDoc() {
  return new Promise((resolve, reject) => {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Si la solicitud se completa correctamente, hacer algo con la respuesta
        let response = JSON.parse(this.responseText);
        let firstTen = response.slice(0, 10);
        resolve(firstTen);
      } else if (this.readyState == 4) {
        // Si la solicitud falla, hacer algo con el error
        reject(new Error("Error en la solicitud"));
      }
    };

    xhttp.open("GET", "https://aves.ninjas.cl/api/birds", true);
    xhttp.send();
  });
}

function getTeenBirds() {
  loadDoc()
    .then((firstTen) => {
        console.log(firstTen);

      //creamos la tabla
      let table = document.createElement("table");

      // Crear una fila de encabezado
      let headerRow = document.createElement("tr");

      let raceInSpanish = document.createElement("th");
      raceInSpanish.textContent = "Nombre ave español";

      var raceInEnglish = document.createElement("th");
      raceInEnglish.textContent = "Nombre ave ingles";

      let imagen = document.createElement("th");
      imagen.textContent = "Imagen";

      headerRow.appendChild(raceInSpanish);
      headerRow.appendChild(raceInEnglish);
      headerRow.appendChild(imagen);
      table.appendChild(headerRow);

      firstTen.forEach((element) => {
        let birdRow = document.createElement("tr");
        let birdNameSpanish = document.createElement("td");
        let birdNameEnglish = document.createElement("td");
        let birdImg = document.createElement("img");

        birdNameSpanish.textContent = element.name.spanish;
        birdNameEnglish.textContent = element.name.english;
        birdImg.setAttribute("src",  `${element.images.thumb}`)

        birdRow.appendChild(birdNameSpanish);
        birdRow.appendChild(birdNameEnglish);
        birdRow.appendChild(birdImg);
        table.appendChild(birdRow);
      });

      // Agregar la tabla al div con id "tabla"
      var tablaDiv = document.getElementById("tabla");
      tablaDiv.appendChild(table);
    })
    .catch((error) => {
      console.log(error);
    });
}
