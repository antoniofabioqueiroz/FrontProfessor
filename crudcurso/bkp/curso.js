// CourseService.js

function listCourses() {
  axios
    .get("https://professor-allocation-node-git.onrender.com/course/list")
    .then(function (response) {
      const courseList = document.getElementById("courseList");
      courseList.innerHTML = "";

      response.data.forEach(function (course) {
        const listItem = document.createElement("li"); //const listItem = document.createElement("li");: cria  um novo elemento de lista (<li>) para cada curso encontrado na resposta. Esses elementos de lista serão usados para exibir informações sobre cada curso.
        listItem.textContent = `${course.name}`; //definine o texto interno do elemento de lista (listItem) como uma concatenação da ID e do nome do curso. Isso exibirá a informação do curso na lista.
        courseList.appendChild(listItem); // adiciona o item em uma nova lista
      });
    })
    .catch(function (error) {
      console.error("Erro ao listar cursos:", error);
    });
}

function saveCourse(event) {
  event.preventDefault(); // Impede o envio do formulário

  const courseNameInput = document.getElementById("courseName");
  const courseName = courseNameInput.value;

  axios
    .post("https://professor-allocation-node-git.onrender.com/course/new", {
      name: courseName,
    })
    .then(function (response) {
      console.log("Curso salvo com sucesso:", response.data);
      courseNameInput.value = ""; // Limpa o campo do nome do curso
    })
    .catch(function (error) {
      console.error("Erro ao salvar curso:", error);
    });
}

// Função para atualizar um curso

// Adicione um ouvinte de eventos para o botão "Atualizar Curso"
document.addEventListener("DOMContentLoaded", function () {
  const updateCourseButton = document.getElementById("updateCourseButton");
  updateCourseButton.addEventListener("click", updateCourse);
});

function updateCourse() {
  //chamo as entradas la do html
  const updateCourseIdInput = document.getElementById("updateCourseId");
  const updateCourseNameInput = document.getElementById("updateCourseName");

  //guardo elas para usar na request
  const courseId = updateCourseIdInput.value;
  const newCourseName = updateCourseNameInput.value;

  // faz a solicitaçao com os novos dados
  axios
    .put(
      `https://professor-allocation-node-git.onrender.com/course/update/${courseId}`,
      { name: newCourseName }
    )
    .then(function (response) {
      console.log("Curso atualizado com sucesso:", response.data);

      // Limpar os campos de entrada
      updateCourseIdInput.value = "";
      updateCourseNameInput.value = "";

      // Atualize a lista de cursos após a atualização
      listCourses();
    })
    .catch(function (error) {
      console.error("Erro ao atualizar curso:", error);
    });
}

// funcao de deletar
document.addEventListener("DOMContentLoaded", function () {
  // Adicione um ouvinte de eventos para o botão "Deletar Curso"
  const deleteCourseButton = document.getElementById("deleteCourseButton");
  deleteCourseButton.addEventListener("click", deleteCourse);
});

function deleteCourse() {
  // Obtenha o valor do ID do curso a ser deletado
  const courseIdInput = document.getElementById("deleteCourseId");
  const courseId = courseIdInput.value;

  // Realize uma solicitação DELETE para a API para deletar o curso com o ID especificado
  axios
    .delete(
      `https://professor-allocation-node-git.onrender.com/course/${courseId}`
    )
    .then(function (response) {
      console.log("Curso deletado com sucesso:", response.data);

      // Limpe o campo de entrada
      courseIdInput.value = "";

      // Atualize a lista de cursos após a exclusão
      listCourses();
    })
    .catch(function (error) {
      console.error("Erro ao deletar curso:", error);
    });
}
