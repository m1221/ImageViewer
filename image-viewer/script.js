
// 1. set up html object references
let choices = document.getElementById('choices');
let selectionScreen = document.getElementById('selection-screen');
let carousel = document.getElementById('carousel');
const img = document.getElementById('img');
const caption = document.getElementById('caption');
const revealText = document.getElementById('reveal');

// 2. setup initial values, styles, and content
carousel.style.display = "none";
revealText.style.visibility = 'hidden';
let index = -1;
(function(){
    img.src = './starting-image.png';
    caption.textContent = (index + 1) + ' of ' + filepaths.length;
})();

// 3. set up categories object
//      - it manages data regarding filepaths and category selection status
const categories = {
    "statuses": {},
    "buttonRefs": {}
};

categories.addImage = function(filepath){
    let splitPath = filepath.split('/');
    let dirName = splitPath[splitPath.length - 2];
    
    if(!(dirName in categories)){
        categories.statuses[dirName] = 'Off';
        categories[dirName] = [filepath];
        return;
    }
    categories[dirName].push(filepath);
}

for (filepath of filepaths){
    categories.addImage(filepath);
}

// 4. add selection buttons for categories
for (dirName in categories.statuses){
    let button = document.createElement('div');
    button.className = 'button';
    button.innerText = `${dirName}`;
    button.setAttribute('status', 'Off');
    button.onclick = function(){
        let sticky = dirName;
        let status = this.getAttribute('status');
        if (status == 'Off'){
            this.setAttribute('status', 'On')
        } else if (status == 'On'){
            this.setAttribute('status', 'Off');
        }
        status = this.getAttribute('status');
        categories.statuses[sticky] = status;
    }
    choices.appendChild(button);
    categories.buttonRefs[dirName] = button;
}

/* Various Functions */

function Initialize(){
    let temp = [];
    for (dirName in categories.buttonRefs){
        let buttonStatus = categories.buttonRefs[dirName].getAttribute('status');
        if (buttonStatus == "On"){
            temp = temp.concat(categories[dirName]);
        }
    }
    filepaths = temp;

    selectionScreen.style.display = 'none';
    carousel.style.display = 'inline';
    document.getElementById('caption').textContent = (index + 1) + ' of ' + filepaths.length;
}


function Update(){
    revealText.style.visibility = 'hidden';
    img.src = filepaths[index];
    caption.textContent = (index + 1) + ' of ' + filepaths.length;
    console.log(index);
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
    let index = this.lastIndexOf(substring);
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