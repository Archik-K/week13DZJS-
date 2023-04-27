//элементы формы
const nameInput = document.getElementById("nameFIO"); //получаем элемент с id "nameFIO" (поле ввода имени пользователя)
const avatarmessage = document.getElementById("avatar"); //получаем элемент с id "avatar" (поле ввода ссылки на аватар пользователя)
const messageInput = document.getElementById("message-input"); //получаем элемент с id "message-input" (поле ввода комментария пользователя)
const messagesDiv = document.getElementById("messages"); //получаем элемент с id "messages" (контейнер для всех сообщений чата)
const sendButton = document.getElementById("send-button"); //получаем элемент с id "send-button" (кнопка "Отправить")
const nameCheckbox = document.getElementById("checkbox1");

// Функция преобразования имени пользователя:проверка нажатия чекбокса, удаление лишних пробелов в ведённом тексте, проверка на присутсвие значения в поле ввода, перевод  в нижний регистр и приведение первой буквы к верхнему регистру
function transformName(name) {
	if (nameInput.value == "") {
		//проверяем поле ввода имени пользователя, если пользователь ничего не ввёл, то выведется username
		return `username`;
	} else if (nameCheckbox.checked) {
		//если чекбокс нажат, то выведется имя пользователся
		name = name.trim().toLowerCase(); //убираем лишние пробелы и переводим всё в нижний регистр
		name = capitalize(name); //используем фукнцию capitalize(), чтобы привести первую букву каждого слова в имени к верхнему регистру
		return name;
	} else {
		//если чекбокс не нажат, то выведется username
		return `username`;
	}
}

// Вспомогательная функция, которая приводит первую букву слова к верхнему регистру
function capitalize(str) {
	let res = ""; // создаём переменную с пустой строкой
	let words = str.split(/[ ]+/); //разбиваем строку на отдельные слова
	let word;
	for (word of words) //перебираем все слова в переменной words
		res = res + word.charAt(0).toUpperCase() + word.slice(1) + " "; //приводим первую букву каждого слова к верхнему регистру и объединяем все слова в одну строку
	return res; //возвращаем новую строку с приведенными к верхнему регистру первыми буквами всех
}

// Функция проверки на спам: замена всех вхождений "viagra" и "XXX" на ***
function checkSpam(str) {
	let spamtext = str.toLowerCase(); //переводим все символы строки в нижний регистр
	return spamtext.replace(/viagra|xxx/gi, "***"); //заменяем все вхождения "viagra" и "XXX" на "*" и возвращаем новую строку
}

//Функция вывода текущей даты
function date() {
	let now = new Date(); //создаем переменную, которая хранит в себе текущую дату
	return now; //выводим текуццую дату
}

//Функция для вывода рандоммных фото, если пользователь не ввёл ссылку на нужную ему фотографию
function randomfoto() {
	let avatars = [
		"/assets/img1.png",
		"/assets/img2.png",
		"/assets/img3.png",
		"/assets/img4.png",
		"/assets/img5.png",
		"/assets/img6.png",
		"/assets/img7.png",
		"/assets/img8.png",
	]; //создаём массив, где хранятся 8 рандомных фото

	// Проверяем, не загрузил ли пользователь свой аватар
	if (avatarmessage.value == "") {
		return avatars[Math.floor(Math.random() * avatars.length)]; //если пользователь не загрузил аватар, то выбирается любое рандомное фото из массива
	} else {
		return avatarmessage.value; //если пользователь ввел ссылку на аватар, то выведется его картинка
	}
}

// Обработчик события при нажатии на кнопку отправки сообщения
sendButton.addEventListener("click", () => {
	const name = transformName(nameInput.value); ///вызываем функцию, которая проверяет заполняемость поля ввода имени, проверяет нажатие чекбокса, приводим введенное имя пользователя к формату "Имя Фамилия" с приведенными к верхнему регистру первыми буквами каждого слова
	const avatar = randomfoto(avatarmessage.value); //вызываем функцию для вывода рандомных изображений, если пользователь не вводит ссылку на нужную ему картинку
	const dates = date(messageInput.value); //вызываем функцию, которая выводит дату и время написания комментария
	const message = checkSpam(messageInput.value); //приводим введенный текст сообщения к формату, в котором все вхождения "viagra" и "XXX" заменены на "***"
	const messageElement = document.createElement("div"); //создаем новый div-элемент, в котором будет содержаться сообщение пользователя
	messageElement.innerHTML = `<p class="bloc_js"><img src="${avatar}" alt='изображение аватара'><font class="name_style"> ${name}</font><font class="dates_style"> ${dates}</font> </p>${message}<hr>`; //добавляем в созданный div-элемент ссылку на аватар пользователя, время написания комментария , его имя и текст сообщения
	messagesDiv.appendChild(messageElement); //добавляем созданный div-элемент в контейнер для всех сообщений чата
	messageInput.value = ""; //очищаем поле ввода сообщения
	avatarmessage.value = ""; //очищаем поле ввода ссылки на аватар пользователя
	nameInput.value = ""; //очищаем поле ввода имя пользователя
});
/* Этот код создает пять переменных, которые содержат ссылки на HTML-элементы: 
'nameInput' - для поля ввода ФИО, 
'Avatarmessage' - для поля ввода ссылки на картинку, 
'messageInput' - для текстового поля ввода комментария, 
'messagesDiv' - для контейнера вывода всех элементов, 
'sendButton' - для кнопки отправки сообщения. 
Затем добавляется обработчик события "click" для кнопки отправки сообщения, который создает 
новый HTML-элемент для сообщения, добавляет его в контейнер сообщений и очищает текстовое поле ввода. */
