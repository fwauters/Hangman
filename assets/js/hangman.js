(() => {

    Array.from(document.querySelectorAll("button.btn")).forEach($btn =>
        $btn.addEventListener("click", () => {
            if ($btn.id === "btnEasy") {
                let difficulty = "easy";
                window.location.replace("./game.html");
                console.log(difficulty);
            }
            else if ($btn.id === "btnNormal") {
                let difficulty = "normal";
                window.location.replace("./game.html");
                console.log(difficulty);
            }
            else if ($btn.id === "btnHard") {
                let difficulty = "hard";
                window.location.replace("./game.html");
                console.log(difficulty);
            }
            else {
                let letter = $btn.id;
                console.log(letter);
            }
        }
    ));
        
})();