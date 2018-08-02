console.log("simpleslides.js loaded")

// config
let slideClassName = ".slide";
let buttonClassName = ".slide-button";
let displayType = "block";
let showSlideNumber = true;
let tocElementsClassName = ".table-of-contents";
<<<<<<< HEAD
<<<<<<< HEAD
=======
let tocElementsClassName = ".table-of-contents"
>>>>>>> a2a9292... Table of contents
=======
>>>>>>> 900cb02... Missed a conflict
=======
>>>>>>> 900cb029af7f4c3c6a03cf5d42c5ac7c911c880f

let slideShow = document.querySelector("#simple-slides");
console.log(slideShow);
let slideArr = slideShow.querySelectorAll(slideClassName);
console.log(slideArr);
for(i = 0; i < slideArr.length; i++) {
    // display the first sequential slide, hide the rest
    if(i == 0) {
        slideArr[i].style.display = displayType;
    } else {
        slideArr[i].style.display = "none";
    }
}

for(i = 0; i < slideArr.length; i++) {
    // create button container
    let buttonContainer = document.createElement("DIV");
    buttonContainer.setAttribute("class", "slide-buttons-container");
    // check for special cases (jumps to specific slides, etc)
    // if standard case, create next/prev buttons for each page
    if(i > 0 && !slideArr[i].hasAttribute("data-jump-back")) {
        // standard case for previous button
        let tempButton = document.createElement("BUTTON");
        let tempText = document.createTextNode("Previous");
        tempButton.appendChild(tempText);
        // check for data-prev-class attribute
        let classes = "prev-slide-button";
        if(slideArr[i].hasAttribute("data-prev-class")) {
            classes += " " + slideArr[i].getAttribute("data-prev-class");
        }
        tempButton.setAttribute("class", classes);
        // add event listeners to button
        tempButton.addEventListener("click", function(e) {
            // hide current slide
            e.target.parentElement.parentElement.style.display = "none";
            // display previous slide
            e.target.parentElement.parentElement.previousElementSibling.style.display = displayType;
        });
        
        // append button to slide
        if(!slideArr[i].hasAttribute("data-timed-slide")) {
            buttonContainer.appendChild(tempButton);
        }
    }
    if(slideArr[i].hasAttribute("data-jump-back")) {
        // previous button replaced with specified jump-back slide ID.
        let tempButton = document.createElement("BUTTON");
        if(slideArr[i].hasAttribute("data-button-text")) {
            tempText = document.createTextNode(slideArr[i].getAttribute("data-button-text"));
        } else {
            tempText = document.createTextNode("Previous");
        }
        tempButton.appendChild(tempText);
        tempButton.setAttribute("data-jump-back", slideArr[i].getAttribute("data-jump-back"))
        tempButton.addEventListener("click", function(e) {
            // search slideshow for specified slide
            let quer = e.target.parentElement.parentElement.getAttribute("data-jump-back");
            quer = "#" + quer;
            let jumpSlide = e.target.parentElement.parentElement.parentElement.querySelector(quer);
            // hide current slide
            e.target.parentElement.parentElement.style.display = "none";
            // show jump-back slide
            jumpSlide.style.display = displayType;
        });

        let classes = "prev-slide-button";
        if(slideArr[i].hasAttribute("data-button-class")) {
            classes += " " + slideArr[i].getAttribute("data-button-class");
        }
        tempButton.setAttribute("class", classes);
        buttonContainer.appendChild(tempButton);
    }  
    
    if(i < slideArr.length - 1 && !slideArr[i].hasAttribute("data-jump-to")) {
        // standard case for next button
        tempButton = document.createElement("BUTTON");
        tempText = document.createTextNode("Next");
        tempButton.appendChild(tempText);
        tempButton.addEventListener("click", function(e) {
            // hide current slide
            e.target.parentElement.parentElement.style.display = "none";
            // display next slide
            e.target.parentElement.parentElement.nextElementSibling.style.display = displayType;
            
            var nextSlide =  e.target.parentElement.parentElement.nextElementSibling;
            if(e.target.parentElement.parentElement.nextElementSibling.hasAttribute("data-timed-slide")) {
                setTimeout(function(ns = nextSlide) {
                    console.log("NEXT SLIDE");
                    console.log(ns);
                    ns.style.display = "none";
                    ns.nextElementSibling.style.display = displayType;
                }, Math.round(parseFloat(e.target.parentElement.parentElement.nextElementSibling.getAttribute("data-timed-slide")) * 1000));
            }
        });
        // check for data-next-class attribute
        if(!slideArr[i].hasAttribute("data-timed-slide")) {
            let classes = "next-slide-button";
            if(slideArr[i].hasAttribute("data-next-class")) {
                classes += " " + slideArr[i].getAttribute("data-next-class");
            }
            tempButton.setAttribute("class", classes);
            buttonContainer.appendChild(tempButton);
        }
    }

    if(slideArr[i].hasAttribute("data-jump-to") && slideArr[i].hasAttribute("data-button-text")) {
        // next button replaced with specified jump-to slide 
        let tempButton = document.createElement("BUTTON");
        let tempText = document.createTextNode(slideArr[i].getAttribute("data-button-text"));
        tempButton.appendChild(tempText);
        tempButton.addEventListener("click", function(e) {
            // search slideshow for specified slide
            let quer = e.target.parentElement.parentElement.getAttribute("data-jump-to");
            quer = "#" + quer;
            let jumpSlide = e.target.parentElement.parentElement.parentElement.querySelector(quer);
            e.target.parentElement.parentElement.style.display = "none";
            jumpSlide.style.display = displayType;
        });
        let classes = "next-slide-button";
        if(slideArr[i].hasAttribute("data-button-class")) {
            classes += " " + slideArr[i].getAttribute("data-prev-class");
        }
        tempButton.setAttribute("class", classes);
        buttonContainer.appendChild(tempButton);
    }

    // add slide number to button container if configured to do so
    if(showSlideNumber == true) {
        let slideNumber = document.createElement("DIV");
        slideNumber.appendChild(document.createTextNode((i + 1) + "/" + slideArr.length));
        buttonContainer.appendChild(slideNumber);
    }
    slideArr[i].appendChild(buttonContainer);
}

let buttonArr = document.querySelectorAll(buttonClassName);
for(i = 0; i < buttonArr.length; i++) {
    // check for jump slide attribute. 
    // jump to the specified slide (id attribute) when event is triggered
    if(buttonArr[i].hasAttribute("data-jump-to")) {
        buttonArr[i].addEventListener("click", function(e) {
            let jumpSlide = e.target.getAttribute("data-jump-to");
            // hide current slide
            e.target.parentElement.style.display = "none";
            // prepend "#" to the slide id for querySelector
            jumpSlide = "#" + jumpSlide;
            // show jump slide
            slideShow.querySelector(jumpSlide).style.display = displayType;
        });
    }
    // check for form submission button
    if(buttonArr[i].hasAttribute("data-submit-form")) {
        buttonArr[i].addEventListener("click", function(e) {
            let formName = e.target.getAttribute("data-submit-form");
            let formFields = [];
            let allFields = slideShow.querySelectorAll("input");
            // create an array of all the form field elements with matching "data-submit-form" values
            for(j = 0; j < allFields.length; j++) {
                if(allFields[j].getAttribute("data-submit-form") == formName) {
                    formFields.push(allFields[j]);
                }
            }
            // create an array of objects with the label and value of each form field's value
            let formObjArr = [];
            for(j = 0; j < formFields.length; j++) {
                let tempObj = {};
                // using subscript syntax to define the object's single attribute name
                tempObj[formFields[j].name] = formFields[j].value;
                formObjArr.push(tempObj);
            }
            // if slideshow is configured to create a JSON object from form data...
            document.querySelector("#form-results").innerHTML = JSON.stringify(formObjArr);
            // else if slideshow is configured to POST form data...
        });
    }
}

let tocElements = slideShow.querySelectorAll(tocElementsClassName);
if(tocElements.length > 0) {
    for(i = 0; i < tocElements.length; i++) {
        for(j = 0; j < slideArr.length; j++) {
            let tempButton = document.createElement("BUTTON");
            tempButton.setAttribute("class", "toc-button");
            let slideName = slideArr[j].getAttribute("data-slide-title") || slideArr[j].getAttribute("name") || slideArr[j].id;
            tempButton.appendChild(document.createTextNode(slideName));
            if(tocElements[i].hasAttribute("data-button-class")) {
                tempButton.setAttribute("class", tocElements[i].getAttribute("data-button-class"));
            }
            // TODO: add click event listener
            tocElements[i].appendChild(tempButton);
        }
    }
}