
const img = document.getElementById('img');
const caption = document.getElementById('caption');
const revealText = document.getElementById('reveal');
let index = -1;
revealText.style.visibility = 'hidden';
(function(){
    img.src = './starting-image.png';
    caption.textContent = (index + 1) + ' of ' + filepaths.length;
})();


function Update(){
    revealText.style.visibility = 'hidden';
    img.src = filepaths[index];
    caption.textContent = (index + 1) + ' of ' + filepaths.length;
}

function GoToNextImage(){
    if(index >= filepaths.length - 1) return;
    index++;
    Update();
}

function GoToPreviousImage(){
    if(index <= 0) return;
    index --;
    Update();
}


function RevealSource(){
    revealText.style.visibility = 'visible';
    let temp = filepaths[index].split("/");
    let filename = temp[temp.length -1]
    revealText.textContent = GetDisplayName(filename);
}

String.prototype.rReplace = function(substring, replacement) {
    index = this.lastIndexOf(substring);
    if (index != -1){
        return this.substring(0, index) + replacement + this.substring(index + substring.length);
    }
    return this.substring();
}

 // "my-image.jpg" => "my image"
function GetDisplayName(filename){
    let displayName = filename.split('.')[0].replace("-", " ");
    displayName = displayName.rReplace("hhh ", "-");
    displayName = displayName.rReplace("aaa", "'");
    return displayName;
}


function Shuffle() {
  let currentIndex = filepaths.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick and swap element
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    
    [filepaths[currentIndex], filepaths[randomIndex]] = [
      filepaths[randomIndex], filepaths[currentIndex]];
  }
}