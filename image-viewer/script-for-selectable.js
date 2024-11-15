/*
  ??
*/

// 1. set up html object references
let choices = document.getElementById('choices');
let selectionScreen = document.getElementById('selection-screen');
let carousel = document.getElementById('carousel');
carousel.style.display = "none";

const categories = {
    "statuses": {},
    "buttonRefs": {}
};

// 2. set up categories object; it holds:
//  i. statuses of the categories (the subdirectories of 'image-collections')
//  ii. arrays of image filepaths
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

// 3. add buttons
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