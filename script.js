var rangeSlider = document.getElementById("Investment");
var rangeBullet = document.getElementById("rs-bullet");

rangeSlider.addEventListener("input", showSliderValue, false);


function showSliderValue() {
  rangeBullet.innerHTML = rangeSlider.value;
  var bulletPosition = ((rangeSlider.value -1000)/rangeSlider.max);
  rangeBullet.style.left = (bulletPosition * 250) + "px";
}

// Checking

var teunreSlider = document.getElementById("Tenure");
var tenureBullet = document.getElementById("tenure-bullet");

teunreSlider.addEventListener("input", showSliderValue1, false);

function showSliderValue1() {
  tenureBullet.innerHTML = teunreSlider.value;
  var bulletPosition = (teunreSlider.value /teunreSlider.max);
  tenureBullet.style.left = (bulletPosition * 300) + "px";
}

//

var roiSlider = document.getElementById("Returns");
var roiBullet = document.getElementById("roi-bullet");

roiSlider.addEventListener("input", showSliderValue2, false);

function showSliderValue2() {
  roiBullet.innerHTML = roiSlider.value;
  var bulletPosition = (roiSlider.value /roiSlider.max);
  roiBullet.style.left = (bulletPosition * 300) + "px";
}
