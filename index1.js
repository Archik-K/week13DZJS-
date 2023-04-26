//элементы формы
const nameInput = document.getElementById("nameFIO"); //получаем элемент с id "nameFIO" (поле ввода имени пользователя)
const avatarmessage = document.getElementById("avatar"); //получаем элемент с id "avatar" (поле ввода ссылки на аватар пользователя)
const messageInput = document.getElementById("message-input"); //получаем элемент с id "message-input" (поле ввода комментария пользователя)
const messagesDiv = document.getElementById("messages"); //получаем элемент с id "messages" (контейнер для всех сообщений чата)
const sendButton = document.getElementById("send-button"); //получаем элемент с id "send-button" (кнопка "Отправить")
const nameCheckbox = document.getElementById("checkbox1");

// Функция преобразования имени пользователя: удаление лишних пробелов, перевод в нижний регистр и приведение первой буквы к верхнему регистру
function transformName(name) {
	name = name.trim().toLowerCase(); //убираем лишние пробелы и переводим всё в нижний регистр
	name = capitalize(name); //используем фукнцию capitalize(), чтобы привести первую букву каждого слова в имени к верхнему регистру
	if (nameInput.value == "") {
		messagesDiv.innerHTML += "username";
	}
	return name;
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

function date() {
	let now = new Date();
	return now;
}

function checkbox() {
	if (nameCheckbox.checked == "") {
		nameInput.style.display = "block"; // если чекбокс отмечен, показываем элемент с именем пользователя
	} else {
		nameInput.style.display = "none"; // если чекбокс не отмечен, скрываем элемент с именем пользователя
	}
}

function randomfoto() {
	const avatars = [
		"img1.png",
		"img2.png",
		"img3.png",
		"img4.png",
		"img5.png",
		"img6.png",
		"img7.png",
		"img8.png",
	];

	if (avatarmessage == "") {
		// Проверяем, не загрузил ли пользователь свой аватар
		const index = avatars[Math.floor(Math.random() * avatars.length)];
		document.getElementById("messages").innerHTML += `<img src="${avatar}">`;
		avatarImage.src = avatarInput.value || index;
	}
}

// Обработчик события при нажатии на кнопку отправки сообщения
sendButton.addEventListener("click", () => {
	// Преобразование имени пользователя и получение аватара и сообщения из формы
	const name = transformName(nameInput.value); //приводим введенное имя пользователя к формату "Имя Фамилия" с приведенными к верхнему регистру первыми буквами каждого слова
	const avatar = avatarmessage.value; //получаем ссылку на аватар пользователя из поля ввода
	const dates = date(messageInput.value);
	const messageElement = document.createElement("div"); //создаем новый div-элемент, в котором будет содержаться сообщение пользователя
	const message = checkSpam(messageInput.value); //приводим введенный текст сообщения к формату, в котором все вхождения "viagra" и "XXX" заменены на "***"
	messageElement.innerHTML = `<p class="bloc_js"><img src="${avatar}" alt='изображение аватара'> <font class="new_style"> ${dates}</font></p> <p> ${name}<br>${message}</p>`; //добавляем в созданный div-элемент ссылку на аватар пользователя, его имя и текст сообщения
	messagesDiv.appendChild(messageElement); //добавляем созданный div-элемент в контейнер для всех сообщений чата
	messageInput.value = ""; //очищаем поле ввода сообщения
	avatarmessage.value = ""; //очищаем поле ввода ссылки на аватар пользователя
	nameInput.value = ""; //очищаем поле ввода имя пользователя
	checkbox();
});
/* Этот код создает пять переменных, которые содержат ссылки на HTML-элементы: 
'nameInput' - для поля ввода ФИО, 
'Avatarmessage' - для поля ввода ссылки на картинку, 
'messageInput' - для текстового поля ввода комментария, 
'messagesDiv' - для контейнера вывода всех элементов, 
'sendButton' - для кнопки отправки сообщения. 
Затем добавляется обработчик события "click" для кнопки отправки сообщения, который создает 
новый HTML-элемент для сообщения, добавляет его в контейнер сообщений и очищает текстовое поле ввода. */
