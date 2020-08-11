(() => {

    //---- Set difficulty ----

    let numberOfLetters;
    if (difficulty === "easy") {
        numberOfLetters = 6;
    }
    else if (difficulty === "normal") {
        numberOfLetters = 7;
    }
    else if (difficulty === "hard") {
        numberOfLetters = 8;
    }
    for (let i = 0; i < numberOfLetters; i++) {
        let p = document.createElement("p");
        p.id = "l" + (i+1);
        p.innerText = "_";
        document.getElementById("wordBlock").appendChild(p);
    }

    //---- Set random word ----

    let w = Math.floor(Math.random() * Math.floor(words.length));
    console.log(w);
    let randomWord = words[w].toUpperCase();
    console.log(randomWord);

    //---- Set drawing functions ----

    let canvas = document.getElementById("gameCanvas");
    let ctx = canvas.getContext("2d");

    function drawBackground(ctx) {
        // grass
        ctx.beginPath();
        ctx.rect(0, 185, 200, 15);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
        // sky
        ctx.beginPath();
        ctx.rect(0, 0, 200, 185);
        ctx.fillStyle = "lightblue";
        ctx.fill();
        ctx.closePath();
    }

    function drawStool(ctx) {
        ctx.beginPath();
        ctx.rect(75, 170, 60, 10);
        ctx.rect(75, 180, 10, 15);
        ctx.rect(125, 180, 10, 15);
        ctx.fillStyle = "#864a00";
        ctx.fill();
        ctx.closePath();
    }
    
    function drawCharacter(ctx) {
        // head
        ctx.beginPath();
        ctx.rect(95, 50, 20, 5);
        ctx.rect(90, 55, 30, 5);
        ctx.rect(90, 60, 30, 5);
        ctx.rect(95, 65, 20, 5);
        ctx.rect(100, 70, 10, 5);
        // hands
        ctx.rect(80, 120, 10, 10);
        ctx.rect(120, 120, 10, 10);
        ctx.fillStyle = "pink";
        ctx.fill();
        ctx.closePath();
        // hair
        ctx.beginPath();
        ctx.rect(95, 50, 20, 5);
        ctx.rect(90, 55, 10, 5);
        ctx.rect(110, 55, 10, 5);
        // shoes
        ctx.rect(85, 165, 15, 5);
        ctx.rect(80, 170, 20, 5);
        ctx.rect(111, 165, 15, 5);
        ctx.rect(111, 170, 20, 5);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
        // shirt
        ctx.beginPath();
        ctx.rect(95, 75, 20, 5);
        ctx.rect(90, 80, 30, 5);
        ctx.rect(85, 85, 40, 30);
        ctx.rect(85, 115, 10, 5);
        ctx.rect(115, 115, 10, 5);  
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
        // pants
        ctx.beginPath();
        ctx.rect(95, 115, 20, 15);
        ctx.rect(90, 120, 12, 45);
        ctx.rect(108, 120, 12, 45);
        ctx.fillStyle = "darkblue";
        ctx.fill();
        ctx.closePath();
    }

    function drawGallows(ctx) {
        ctx.beginPath();
        ctx.rect(10, 10, 150, 10);
        ctx.rect(10, 10, 10, 180);
        ctx.rect(50, 20, 5, 5);
        ctx.rect(45, 25, 5, 5);
        ctx.rect(40, 30, 5, 5);
        ctx.rect(35, 35, 5, 5);
        ctx.rect(30, 40, 5, 5);
        ctx.rect(25, 45, 5, 5);
        ctx.rect(20, 50, 5, 5);
        ctx.fillStyle = "#864a00";
        ctx.fill();
        ctx.closePath();
    }

    function drawRope(ctx) {
        ctx.beginPath();
        ctx.rect(100, 10, 10, 10);
        ctx.rect(103, 20, 4, 30);
        ctx.rect(101, 30, 8, 15);
        ctx.fillStyle = "#e9a55a";
        ctx.fill();
        ctx.closePath();
    }

    function removeStool(ctx) {
        ctx.clearRect(0, 0, 180, 200);
        drawBackground(ctx);
        drawCharacter(ctx);
        drawGallows(ctx);
        drawRope(ctx);
    }
    
    //---- Set game variables ----

    let trialNb = 0;
    let errorNb = 0;
    let letterFound = 0;

    //---- Set ingame infos ----

    document.getElementById("infos").innerHTML = 
        "You have to guess a " + numberOfLetters + " letter word in English with 5 chances, the 6th error will hang you.";
    document.getElementById("trial").innerText = "Trial(s) : " + trialNb;
    document.getElementById("error").innerText = "Error(s) : " + errorNb;

    //---- Check buttons ----

    Array.from(document.querySelectorAll("button.btn")).forEach($btn =>
        $btn.addEventListener("click", () => {
            $btn.disabled = true;
            let letter = $btn.id;
            trialNb++;
            console.log("trial nb " + trialNb);
            let e = 0;
            for (let j = 0; j < randomWord.length; j++) {
                if (letter === randomWord.charAt(j)) {
                    console.log("letter found");
                    document.getElementById("l" + (j+1)).innerText = letter;
                    letterFound++;
                    if (letterFound === numberOfLetters) {
                        alert("Congratulation, you win!\r\nYou made " + errorNb + " error(s).");
                        window.location.href = "./index.html";
                    }
                }
                else {e++}
            }
            if (e === randomWord.length) {
                errorNb++;
                console.log("error nb " + errorNb);
                switch (errorNb) {
                    case 1 : drawBackground(ctx);
                        break;
                    case 2 : drawStool(ctx);
                        break;
                    case 3 : drawCharacter(ctx);
                        break;
                    case 4 : drawGallows(ctx);
                        break;
                    case 5 : drawRope(ctx);
                        break;
                    case 6 : removeStool(ctx);
                        document.querySelectorAll("button.btn").forEach($btn => {
                            $btn.disabled = true;
                        });
                        setTimeout(() => {
                            alert("Sorry, you loose.\r\nThe word was " + randomWord + ".");
                            window.location.href = "./index.html";
                        }, 2000);    
                        break;
                }
            }
            document.getElementById("trial").innerText = "Trial(s) : " + trialNb;
            document.getElementById("error").innerText = "Error(s) : " + errorNb;
        }
    ));

})();