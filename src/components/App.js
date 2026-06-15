import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

const questionApi = "http://localhost:4000/questions";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch(questionApi)
      .then((response) => response.json())
      .then((data) => setQuestions(data))
  }, [])

  function handleAddQuestion(newQuestion) {
    setQuestions([ ...questions, newQuestion])
  }
  
  function handleDeleteQuestion(deletedQuestion) {
    setQuestions(questions.filter((question) => question.id !== deletedQuestion.id));
  }

  function handleUpdateQuestion(updatedQuestion) {
    setQuestions(questions.map((question) => question.id === updatedQuestion.id ? updatedQuestion : question));
  }

  return (
		<main>
			<AdminNavBar onChangePage={setPage} />
			{page === "Form" ? (
				<QuestionForm onAddQuestion={handleAddQuestion} onChangePage={setPage} />
			) : (
				<QuestionList
					questions={questions}
					onDeleteQuestion={handleDeleteQuestion}
					onUpdateQuestion={handleUpdateQuestion}
				/>
			)}
		</main>
	);
}

export default App;
