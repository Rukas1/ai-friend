const generateRandomString = (num) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1= "";
    const charactersLength = characters.length;
    for ( let i = 0; i < num; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result1;
}

const UserID = generateRandomString(25);

const botProfileModal = document.getElementById("botProfileModal");
const botprofileImage = document.getElementById("botProfileImage");
const modalImg = document.getElementById("img01");
const closeModal = document.querySelector(".close-modal");

botprofileImage.addEventListener("click", (e) => {
    botProfileModal.style.display = "block";
})

closeModal.addEventListener("click", () => {
    botProfileModal.style.display = "none";
})

botProfileModal.addEventListener("click", () => {
    botProfileModal.style.display = "none";
})

const messagesBox = document.querySelector("main");
const messageInput = document.getElementById("messageInput");
const addMsgBtn = document.getElementById("submitMsgBtn");
const messageForm = document.querySelector("form");
let isBussy = false;
let firstMsgSend = false;

function createItem(isUser, msg) {
    let item = `<div class="talk ${isUser ? "user" : "bot"}">
                    <p>${isUser ? "You": "Siesta"}</p>
                    <p>${msg}</p>
                </div>`

    if (!firstMsgSend) {
        document.querySelector(".no-msg").style.display = "none";
        firstMsgSend = true;
    }

    messagesBox.insertAdjacentHTML("beforeend", item);
}

async function getApi(msg) {
    const params = {user_id: UserID,
                message: msg,
                from_name:"user",
                to_name:"Siesta",
                situation:"Siesta talk to user",
                translate_from:"fr",
                translate_to:"fr"}

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '5a81735c33msh0209801770a5b68p13ff98jsn606854c5eda6',
            'X-RapidAPI-Host': 'waifu.p.rapidapi.com'
        },
        body: JSON.stringify(params)
    };

    let response = await fetch('https://waifu.p.rapidapi.com/v1/waifu', options);
    let data = await response.json();
    botMsg = data.response.replace("&#39;", "'");
    createItem(false, botMsg);
    isBussy = false;
    blockActionReload();
}

function clearInput() {
    addMsgBtn.setAttribute("disabled", "");
    messageInput.value = "";
}

function blockActionReload() {
    if (isBussy) {
        addMsgBtn.setAttribute("disabled", "");
    } else {
        addMsgBtn.removeAttribute("disabled");
    }
}

messageInput.addEventListener("input", (e) => {
    if (e.target.value.length === 0) {
        clearInput();
    } else {
        blockActionReload();
    }
})

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let currentMsg = e.target[0].value;
    if (currentMsg.length === 0) return;
    else {
        isBussy = true;
        getApi(currentMsg);
        clearInput();
        createItem(true, currentMsg);
    }
})
