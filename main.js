
const PIN1 = "12345";

function checkPin(input="null") {
            console.log("Typing...")
                    // Check if all input fields are filled
                    if (inputDigits.every(digit => digit.value.length === 1)) {
                        
                      // All digits entered, construct the PIN
                      let enteredPIN = "";
                      for (const digit of inputDigits) {
                        enteredPIN += digit.value;
                      }
                      console.log(enteredPIN);
                      let clr;
                      if(enteredPIN === PIN1){
                        clr = `#15e156ab`;
                      }
                      else{
                        clr = `red`;
                      }
                      [...document.querySelectorAll(".digit input")].forEach(item =>{
                        item.style.color = clr;
                       });
                      // You can perform further actions with the PIN here (validation, submission etc.)
                    }
                    else{
                        if(input!=='null' && input.hasAttribute('style')){
                            inputDigits.forEach(item =>  item.removeAttribute("style"));
                        }
                    }
}


        // Get the input element
const inputDigits = [...document.querySelectorAll('.digit input')];
let PIN ="";

inputDigits.forEach((input,index) =>{

        let lastKeyPressWasBackspace = false;

        // Attach keydown event listener
        input.addEventListener('keydown', function(event) {
            
            if (event.key === 'Backspace') {
                if(lastKeyPressWasBackspace)
                    console.log("bs pressed twice!!");
                
                lastKeyPressWasBackspace = true;
            }{
                lastKeyPressWasBackspace = false;
            }
            if (event.ctrlKey && event.key === 'v'){
                console.log("Ctrl + v");

                input.focus();
                document.execCommand('paste');
            }
            else if(!/^[0-9]$|^Backspace$/.test(event.key))
                event.preventDefault();

            
            // Allow only one digit
            if (input.value.length >= 1 && event.key !== 'Backspace') {

                    // Focus on the next input field if available
                    if (index < inputDigits.length - 1) {
                        inputDigits[index + 1].focus();
                    }
                    if(index === inputDigits.length - 1){
                        input.blur();
                    }
            }
            if (event.key === 'ArrowLeft') {
                if(index){
                    inputDigits[index - 1].focus();
                    console.log("ArrowLeft");
                }
            }
            if (event.key === 'ArrowRight') {
                if(index < inputDigits.length - 1 ){
                    inputDigits[index + 1].focus();
                    console.log("ArrowRight");
                }
            }
        });

        input.addEventListener('paste', (event) => {
            event.preventDefault(); // Prevent default paste behavior
        
            const pastedText = event.clipboardData.getData('text/plain');
            const five = pastedText.slice(0,5);

            // Extract only the first 5 digits from pasted text
            if(/\d{1,5}/.test(five)){

                const digits = five.match(/\d{1,5}/)[0]; // Use match with /\d{1,5}/ for max 5 digits
            
                // Fill input fields with digits (up to 5)
                for (let i = 0; i < digits.length && i < inputDigits.length; i++) {
                inputDigits[i].value = digits[i];
                }
            }
            // Focus on the next input or blur the last one
            if (index < inputDigits.length - 1) {
              inputDigits[index + 1].focus();
            } else {
              input.blur();
            }

            checkPin();
        });

        input.addEventListener("input", (event) => {
            checkPin(input);
        });
});
