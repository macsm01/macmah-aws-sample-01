// Call this function when the page loads
fetchRecentQuestions();

function submitQuestion() {
    var question = document.getElementById('questionInput').value;
    var apiEndpoint = "https://e8s8gca76f.execute-api.us-east-1.amazonaws.com/Dev/question";

    var data = {
        body: JSON.stringify({ input: { question: question } })
    };

    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        var responseBody = JSON.parse(data.body); 
        var answer = responseBody.Answer;

        // Remove all special characters except periods
        var cleanedAnswer = answer.replace(/[^\w\s.]/gi, '');

        document.getElementById('apiResponse').innerText = cleanedAnswer;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function fetchRecentQuestions() {
    var apiEndpoint = 'https://04si0ktf57.execute-api.us-east-1.amazonaws.com/Stage/responses'; // Replace with your API endpoint

    fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
        // Data is an object, need to parse the 'body' to get the array
        var questionsArray = JSON.parse(data.body);
        populateQuestionsTable(questionsArray);
    })
    .catch(error => console.error('Error fetching questions:', error));
}

function populateQuestionsTable(data) {
    var table = document.getElementById('questionsTable').getElementsByTagName('tbody')[0];
    table.innerHTML = ''; // Clear existing rows

    data.forEach(item => {
        var row = table.insertRow();
        row.insertCell(0).innerHTML = item.Timestamp;
        row.insertCell(1).innerHTML = item.Question;
        row.insertCell(2).innerHTML = item.Answer;
    });
}

