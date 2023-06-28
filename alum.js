let alumnos = [];

function altaAlumno() {
  const nombre = document.getElementById('nombre-input').value;
  const apellidos = document.getElementById('apellidos-input').value;
  const edad = document.getElementById('edad-input').value;

  if (nombre && apellidos && edad) {
    const alumno = {
      nombre: nombre,
      apellidos: apellidos,
      edad: edad,
      materias: [],
      calificaciones: []
    };

    alumnos.push(alumno);
    limpiarFormulario('alumno-form');
    mostrarMensaje('Alumno dado de alta correctamente.');
    actualizarAlumnosSelect();
  } else {
    mostrarMensaje('Por favor, completa todos los campos.');
  }
}

function inscribirMateria() {
  const alumnoIndex = document.getElementById('alumnos-select').value;
  const materia = document.getElementById('materias-select').value;

  if (alumnoIndex && materia) {
    const alumno = alumnos[alumnoIndex];
    alumno.materias.push(materia);
    mostrarMensaje(`Alumno inscrito en ${materia} correctamente.`);
  } else {
    mostrarMensaje('Por favor, selecciona un alumno y una materia.');
  }
}

function asignarCalificacion() {
  const alumnoIndex = document.getElementById('alumnos-select').value;
  const calificacion = document.getElementById('calificacion-input').value;

  if (alumnoIndex && calificacion) {
    const alumno = alumnos[alumnoIndex];
    alumno.calificaciones.push(parseFloat(calificacion));
    mostrarCalificaciones();
    mostrarMensaje('Calificación asignada correctamente.');
  } else {
    mostrarMensaje('Por favor, selecciona un alumno y asigna una calificación.');
  }
}

function crearGrupo() {
  const grupo = document.getElementById('grupo-input').value;

  if (grupo) {
    const alumnosSeleccionados = obtenerAlumnosSeleccionados();
    const grupoObj = {
      nombre: grupo,
      alumnos: alumnosSeleccionados
    };
    mostrarMensaje(`Grupo ${grupo} creado correctamente.`);
    limpiarFormulario('grupos-form');
  } else {
    mostrarMensaje('Por favor, ingresa un nombre para el grupo.');
  }
}

function buscarAlumnos() {
  const query = document.getElementById('busqueda-input').value.toLowerCase();
  const resultados = alumnos.filter(alumno => {
    const nombreCompleto = `${alumno.nombre} ${alumno.apellidos}`.toLowerCase();
    return nombreCompleto.includes(query);
  });

  mostrarResultado(JSON.stringify(resultados));
}

function obtenerPromedioAlumno() {
  const alumnoIndex = document.getElementById('alumnos-promedio-select').value;

  if (alumnoIndex) {
    const alumno = alumnos[alumnoIndex];
    const calificaciones = alumno.calificaciones;
    const promedio = calcularPromedio(calificaciones);
    mostrarResultado(`Promedio de ${alumno.nombre} ${alumno.apellidos}: ${promedio.toFixed(2)}`);
  } else {
    mostrarMensaje('Por favor, selecciona un alumno.');
  }
}

function obtenerPromedioGrupo() {
  const grupoIndex = document.getElementById('grupos-select').value;

  if (grupoIndex) {
    const grupo = grupos[grupoIndex];
    const calificaciones = obtenerCalificacionesGrupo(grupo);
    const promedio = calcularPromedio(calificaciones);
    mostrarResultado(`Promedio del Grupo ${grupo.nombre}: ${promedio.toFixed(2)}`);
  } else {
    mostrarMensaje('Por favor, selecciona un grupo.');
  }
}

function ordenarAlumnosAscendente() {
  const alumnosOrdenados = alumnos.sort((a, b) => {
    const promedioA = calcularPromedio(a.calificaciones);
    const promedioB = calcularPromedio(b.calificaciones);
    return promedioA - promedioB;
  });

  mostrarResultado(JSON.stringify(alumnosOrdenados));
}

function ordenarAlumnosDescendente() {
  const alumnosOrdenados = alumnos.sort((a, b) => {
    const promedioA = calcularPromedio(a.calificaciones);
    const promedioB = calcularPromedio(b.calificaciones);
    return promedioB - promedioA;
  });

  mostrarResultado(JSON.stringify(alumnosOrdenados));
}

function mostrarCalificaciones() {
  const alumnoIndex = document.getElementById('alumnos-select').value;

  if (alumnoIndex) {
    const alumno = alumnos[alumnoIndex];
    const calificaciones = alumno.calificaciones;
    mostrarResultado(`Calificaciones de ${alumno.nombre} ${alumno.apellidos}: ${calificaciones.join(', ')}`);
  }
}

function mostrarMensaje(mensaje) {
  document.getElementById('resultado').innerHTML = mensaje;
}

function mostrarResultado(resultado) {
  document.getElementById('resultado').innerHTML = resultado;
}

function limpiarFormulario(formularioId) {
  const formulario = document.getElementById(formularioId);
  const inputs = formulario.getElementsByTagName('input');

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
}

function actualizarAlumnosSelect() {
  const alumnosSelect = document.getElementById('alumnos-select');
  alumnosSelect.innerHTML = '';

  for (let i = 0; i < alumnos.length; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = `${alumnos[i].nombre} ${alumnos[i].apellidos}`;
    alumnosSelect.appendChild(option);
  }

  actualizarAlumnosPromedioSelect();
}

function actualizarAlumnosPromedioSelect() {
  const alumnosPromedioSelect = document.getElementById('alumnos-promedio-select');
  alumnosPromedioSelect.innerHTML = '';

  for (let i = 0; i < alumnos.length; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = `${alumnos[i].nombre} ${alumnos[i].apellidos}`;
    alumnosPromedioSelect.appendChild(option);
  }
}

function obtenerAlumnosSeleccionados() {
  const checkboxes = document.querySelectorAll('#alumnos-select option:checked');
  const alumnosSeleccionados = [];

  checkboxes.forEach(checkbox => {
    const alumnoIndex = checkbox.value;
    alumnosSeleccionados.push(alumnos[alumnoIndex]);
  });

  return alumnosSeleccionados;
}

function calcularPromedio(calificaciones) {
  if (calificaciones.length === 0) {
    return 0;
  }

  const suma = calificaciones.reduce((total, calificacion) => total + calificacion, 0);
  return suma / calificaciones.length;
}

actualizarAlumnosSelect();

