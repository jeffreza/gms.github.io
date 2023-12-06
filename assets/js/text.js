$(document).on('click',nextSlidea);

function nextSlide(){
  console.log($('.active + .slidea').length);
  if ($('.active + .slidea').length > 0){
    $('.active + .slidea').addClass('active');
    $($('.active')[0]).removeClass('active');
  } else{
    $('.active').removeClass('active');
    $('.slidea:nth-child(1)').addClass('active');
  }
}



$(document).ready(function() {
    // Start autoplay when the document is ready
    startAutoplay();
  });
  
  function startAutoplay() {
    // Set the interval for autoplay (in milliseconds)
    var interval = 3000; // Change this value to adjust the autoplay speed
  
    // Create a timer to trigger the next slide
    var timer = setInterval(nextSlide, interval);
  
    // Pause autoplay when hovering over the slider
    $('.slidea').hover(function() {
      clearInterval(timer);
    }, function() {
      timer = setInterval(nextSlide, interval);
    });
  }
  
  function nextSlide() {
    console.log($('.active + .slidea').length);
    if ($('.active + .slidea').length > 0) {
      $('.active + .slidea').addClass('active');
      $($('.active')[0]).removeClass('active');
    } else {
      $('.active').removeClass('active');
      $('.slidea:nth-child(1)').addClass('active');
    }
  }
  

  const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    "Our Values",
    "Trust",
    "Innovation",
    "Care",
    "Accuracy",
    "Integrity",
    "Ownership",
    "by GMS"
];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

animate();
