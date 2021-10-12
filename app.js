// Initialize the main objects.
const masks = document.querySelectorAll('#gallery .mask');
const imgs = document.querySelectorAll('#gallery img');
const scoreCard = document.getElementById('score');
const attemptCard = document.getElementById('attempts');

// Assign some array to store srcs and masks of each cliciked img(mst store only two values per each attempt)
let imgSrcs = [];
let clickedMasks = [];
// Assign the score and attempt for initialization
let score = 0;
let attempt = 0;

// Iterating through each masks for click event and other purposes.
masks.forEach((mask) => {

    // Add click event for each clicked img's mask.
    mask.addEventListener('click', turnUpsideDown);
    function turnUpsideDown(me) {

        // The mask will be hidden when clicked
        me.target.style.visibility = 'hidden';

        // The clicked img's src is stored here.
        const firstImg = me.target.parentElement.lastElementChild.src;

        // Adding each clciked img's mask to the assigned array.
        clickedMasks.push(me.target);
        // Adding each clicked img's src to the assigned array.
        imgSrcs.push(firstImg);

        // Make sure that we have more than two values in our imgSrcs array.(For comparing two srcs)
        if ( imgSrcs.length >= 2 ) {
            
            // Comparing two srcs.
            if ( imgSrcs[0] == imgSrcs[1] ) {
                
                // Clear both the arrays.(To prevent the array from storing more than two values)
                imgSrcs = [];
                clickedMasks = [];
                // Adding 1 to both score and attempt.
                score += 1;
                attempt += 1;
            } 
            // Comparing two srcs.
            else if ( imgSrcs[0] != imgSrcs[1]) {

                // This timeout will make sure that both the img(previously clicked and presently clicked) is facing upwards(i.e.mask's visiblity = 'hidden', we can see the img, no green screen) at the correct time. Bcz if either or both of the image is facing backwards(i.e.mask's visiblity = 'visible', we can't see the img, green screen is present) then we won't be have this functionality.
                setTimeout(() => {
                    // Turn on the presently clciked img's mask
                    me.target.style.visibility = 'visible';
                    // Turn on the previously clciked img's mask
                    clickedMasks[0].style.visibility = 'visible';
                    // Clear the array(To prevent the array from storing more than two values)
                    clickedMasks = [];
                }, 250);
                
                // Clear the array(To prevent the array from storing more than two values)
                imgSrcs = [];

                // Make sure we don't get a negative point 
                if ( score >= 1 ) {
                    score -= 1;
                }
                
                // Add 1 to the attempt.
                attempt += 1;
            }

            // Update both(score and attempts)
            scoreCard.innerText = `Your score: ${score}`;
            attemptCard.innerText = `Attempt: ${attempt}`;

        } 

        // Here I have used (imgs.length / 2), bcz to make sure that if we add more images to our gallery the game will get harder and harder.
        // To give another chance add::  || attempt == (imgs.length / 2 + 1)
        if ( score == (imgs.length / 2) && attempt == (imgs.length / 2)) {
            // This timeout will make sure that all our images are facing backwards.
            setTimeout(() => {
                alert('Congratulation! You have won the Game');

                // This loop will iterate all the masks available and set each maks's visiblity to visible(Every image will get the green screen)
                for (let i = 0; i < masks.length; i++) {
                    masks[i].style.visibility = 'visible';
                }

                // Reset the score and attempts.
                score = 0;
                attempt = 0;
                scoreCard.innerText = 'Your Score: 0';
                attemptCard.innerText = 'Attempt: 0';

            }, 250);
            
        }

        // To give another chance replace::  attempt >=  (imgs.length / 2 + 1)
        else if ( attempt >=  (imgs.length / 2)) {

            // This timeout will also make sure that all our images are facing backwards.
            setTimeout(() => {
                // A confirm message box will appear at the top of the page
                if ( confirm('You have losed the game. Please try again!') ) {

                    // This loop will also iterate all the masks available and set each maks's visiblity to visible(Every image will get the green screen)
                    for (let i = 0; i < masks.length; i++) {
                        masks[i].style.visibility = 'visible';
                        
                    }

                    // Reset the score and attempts
                    score = 0;
                    attempt = 0;
                    scoreCard.innerText = 'Your Score: 0';
                    attemptCard.innerText = 'Attempt: 0';
                }

            }, 250);
            
        }

    }

    
});

