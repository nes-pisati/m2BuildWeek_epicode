const body = document.querySelector("body");
body.id = "bodyQuiz";
const requests = [];
const answers = [];
const correctAnswers = []
const selectAnswers=[];
let currentIndex = 0;
let currentQuestion = 1;
let counter = 0;
let remainingTime = 61;
let countdownTimeout;

function pageStructure() {

    //creazione header
    const header = document.createElement("header");
    const main = document.createElement("main");
    body.append(header, main);

    //inserimento logo Epicode
    const figure = document.createElement("figure");
    header.append(figure);
    const image = document.createElement("img");
    image.src = "./assets/epicode_logo.png";
    image.classList.add("logoEpicode")
    figure.append(image);

    //creazione h1
    const title = document.createElement("h1");
    title.innerHTML = "Welcome to" + "<br>" + "<span>your exam</span>";

    //creazione h2
    const subtitle = document.createElement("h2");
    subtitle.textContent = "Instructions";

    //creazione paragrafo
    const description = document.createElement("p");
    description.classList.add("description");
    description.textContent = "We don't expect most engineers to know the answers to all of these questions, so don't worry if you're unsure of a few of them.";

    //creazione lista
    const rules = document.createElement("ul");
    const ruleOne = document.createElement("li");
    ruleOne.textContent = "Each question is timed and can only be answered once.";
    const ruleTwo = document.createElement("li");
    ruleTwo.textContent = "Changing browser tab or opening other windows will invalidate the question.";
    const ruleThree = document.createElement("li");
    ruleThree.textContent = "This exam will take approx. 0-5 minutes.";
    rules.append(ruleOne, ruleTwo, ruleThree);

    //creazione footer wrapper
    const footerWrapper = document.createElement("div");
    footerWrapper.classList.add("footerWrapper")

    //creazione dichiarazione
    const declarationWrapper = document.createElement("div");
    declarationWrapper.classList.add("declarationWrapper");
    const input = document.createElement("input");
    input.type = "checkbox";
    const declaration = document.createElement("p");
    declaration.classList.add("declaration");
    declaration.textContent = "I promise to answer myself without help from anyone";
    declarationWrapper.append(input, declaration);

    //creazione button
    const button = document.createElement("button");
    button.setAttribute("id", "startButton");
    button.textContent = "PROCEED";

    footerWrapper.append(declarationWrapper, button);

    main.append(title, subtitle, description, rules, footerWrapper);
}

pageStructure();

function proceedButton() {
    const startButton = document.querySelector("#startButton");
    startButton.addEventListener('click', (e) => {
        e.defaultPrevented
        //pulisci pagina
        body.innerHTML = ''
        structurePage()
    })
} proceedButton();



/* quiz */

/* struttura pagina */
function quizElement() {
    const bodyDiv = document.createElement('div');
    bodyDiv.id = "bodyDiv";
    const header = document.createElement('header');
    header.id = "headerQuiz";
    const main = document.createElement('main');
    main.id = "mainQuiz";
    const footer = document.createElement('footer')
    footer.id = "footerQuiz";
    bodyDiv.append(header, main, footer)
    body.append(bodyDiv)
}

//principal function
function structurePage() {
    extractCorrectAnswer()
    quizElement()
    upSection()
    mainSection()
    structionQuiz()
    updateCountdown()
}

//create up section
function upSection() {
    const header = document.querySelector("header");

    const figure = document.createElement('figure')
    header.appendChild(figure)

    const img = document.createElement('img')
    img.src = './assets/epicode_logo.png'
    figure.appendChild(img)

    const timer = document.createElement('div')
    timer.classList.add('timer')
    header.appendChild(timer)

    const seconds = document.createElement('p')
    seconds.classList.add('second')
    seconds.textContent = 'SECONDS'

    let countdown = document.createElement('p')
    countdown.classList.add('countdown')
    countdown.textContent = remainingTime

    const remaining = document.createElement('p')
    remaining.classList.add('remaining')
    remaining.textContent = 'REMAINING'

    timer.append(seconds, countdown, remaining)

}

//create main section
function mainSection() {
    const main = document.querySelector("main")

    const questionTitle = document.createElement('h3')
    questionTitle.classList.add('questionTitle')

    const containerButton = document.createElement('div')
    containerButton.classList.add('containerButton')

    main.append(questionTitle, containerButton)
}
//footer
function footerSection(currentIndex) {
    const footer = document.querySelector("footer");

    const numberQuestion = document.createElement('p')
    numberQuestion.classList.add('footer')
    footer.innerText = ''
    numberQuestion.textContent = 'QUESTIONS ' + currentIndex + ' / 10'
    footer.append(numberQuestion)
}

/* logica quiz */


function structionQuiz() {
    if (currentIndex < questions.length) {
        let itemNow = questions[currentIndex]

        const questionTitle = document.querySelector('.questionTitle');
        questionTitle.textContent = itemNow.question

        const totalRespons = [itemNow.correct_answer, ...itemNow.incorrect_answers]

        totalRespons.sort(() => Math.random() - 0.5);

        const containerButton = document.querySelector('.containerButton');
        containerButton.innerHTML = ''
        totalRespons.forEach((element) => {

            const button = document.createElement('button')
            button.classList.add('buttonResponse')

            button.textContent = element
            containerButton.append(button)
        })
        footerSection(currentQuestion)
        pressButton()

    } else {
        body.innerHTML = ''
        selectAnswersUser()
    }
}

function pressButton() {
    const allButton = document.querySelectorAll('button')
    const correct = questions[currentIndex].correct_answer

    allButton.forEach((e) => {
        e.addEventListener('click', () => {
            currentQuestion++;
            currentIndex++;

            remainingTime = 61

            selectAnswers.push(e.textContent)

            if (correct.includes(e.textContent)) {
                counter++
                console.log(counter);
            }
            structionQuiz();
        })
    })
}

function updateCountdown() {
    const countdown = document.querySelector('.countdown')
    if (remainingTime > 0) {
        remainingTime--
        countdown.innerHTML = '' + remainingTime;
        countdownTimeout = setTimeout(updateCountdown, 1000);
    } else {
        currentIndex++
        currentQuestion++
        nextQuestion()        
    }
}

function nextQuestion(){
    remainingTime=60
    const countdown = document.querySelector('.countdown')
    countdown.innerHTML = '' + remainingTime;

    if (currentIndex < questions.length) {
        let itemNow = questions[currentIndex]

        const questionTitle = document.querySelector('.questionTitle');
        questionTitle.textContent = itemNow.question

        const totalRespons = [itemNow.correct_answer, ...itemNow.incorrect_answers]

        totalRespons.sort(() => Math.random() - 0.5);

        const containerButton = document.querySelector('.containerButton');
        containerButton.innerHTML = ''
        totalRespons.forEach((element) => {

            const button = document.createElement('button')
            button.classList.add('buttonResponse')

            button.textContent = element
            containerButton.append(button)
        })
        footerSection(currentQuestion)
        pressButton()
        updateCountdown()
    }    else {
        body.innerHTML = ''
        const finalContainer = document.createElement('div')
        finalContainer.classList.add('finalContainer')
        document.body.append(finalContainer)

        const congratulation = document.createElement('p')
        congratulation.textContent = 'Bravo you managed to total: ' + counter + ' questions out of 10'
        congratulation.classList.add('congratulation')
        finalContainer.append(congratulation)
    }
}
function extractCorrectAnswer(){
    questions.forEach(element => {
        correctAnswers.push(element.correct_answer)
    });
}

function selectAnswersUser(){
        const finalContainer = document.createElement('div')
        finalContainer.classList.add('finalContainer')

        const congratulation = document.createElement('p')
        congratulation.innerHTML = 'The quiz is done. You managed to totalize: ' + '<span>' + counter + '</span>' + ' questions out of '+  '<span>' + '10' +'</span>'
        congratulation.classList.add('congratulation')
        
        const description = document.createElement('p')
        description.textContent='Here under you can check the responses:'
        description.classList.add('description')

        const containreUp = document.createElement('div')
        containreUp.classList.add('containreUp')

        const containerAnswer = document.createElement('div')
        containerAnswer.classList.add('containerAnswer')
        
        document.body.append(finalContainer)
        containreUp.append(congratulation,description)
        finalContainer.append(containreUp,containerAnswer)
        
        
        

        selectAnswers.forEach(element => {
            if (correctAnswers.includes(element)) {
                /* primo container */
                const containerAnswerFiltered = document.createElement('div')
                containerAnswerFiltered.classList.add('containerAnswerFiltered')

                /* answer */
                const correctAnswerFiltered = document.createElement('p')
                correctAnswerFiltered.textContent=element
                correctAnswerFiltered.classList.add('correctAnswerFiltered')

                /* img correct */
                const containerCorrect = document.createElement('figure')
                containerCorrect.classList.add('containerCorrect')
                const correct = document.createElement('img')
                correct.src='./assets/correct.png'
                containerCorrect.append(correct)
                correct.classList.add('correct')

                containerAnswerFiltered.append(correctAnswerFiltered, containerCorrect)
                containerAnswer.append(containerAnswerFiltered)
            }else{
                /* primo container */
                const containerAnswerFailFiltered = document.createElement('div')
                containerAnswerFailFiltered.classList.add('containerAnswerFailFiltered')

                /* answer */
                const failAnswerFiltered = document.createElement('p')
                failAnswerFiltered.textContent=element
                failAnswerFiltered.classList.add('failAnswerFiltered')

                /* img fail */
                const containerfail = document.createElement('figure')
                containerfail.classList.add('containerfail')
                const fail = document.createElement('img')
                fail.src='./assets/fail.png'
                fail.classList.add('fail')
                containerfail.append(fail)

                containerAnswerFailFiltered.append(failAnswerFiltered, containerfail)
                containerAnswer.append(containerAnswerFailFiltered)
            }
        });
        
}
