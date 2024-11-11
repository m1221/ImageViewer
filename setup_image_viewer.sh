#! /bin/bash

# 1. set up html DOM for basic viewing
cat << _EOF_ > ./image-viewer/image-viewer.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Viewer</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <img id="img" alt="alt text"> 
    <div id="caption"></div>
	<div id="tool-bar">
        <button onclick="GoToPreviousImage()">previous</button>
        <button onclick="GoToNextImage()">next</button>
        <button onclick="RevealSource()">reveal</button>
        <button onclick="Shuffle()" id="shuffle-button">shuffle</button>
    </div>
    <p id="reveal">filler text</p>
  </body>
  <script src="filepaths.js"></script>
  <script src="script.js"></script>
</html>
_EOF_

# 2. set up 'filepaths' variable in js for images
IMAGE_COLLECTIONS="image-collections"
pathnames=""

# 2a. if no positional arguments, include all filenames from "./image-collections" in filepaths.js
if [ "$1" == "" ]; then
  for image_dir in $(ls $IMAGE_COLLECTIONS)
  do
    for filename in $(ls "./$IMAGE_COLLECTIONS/$image_dir")
    do
      pathname="'../$IMAGE_COLLECTIONS/$image_dir/$filename'"
      if [ "$pathnames" == "" ]; then
        pathnames="\n$pathname"
      else
        pathnames="$pathnames,\n    $pathname"
      fi
    done
  done

  printf "let filepaths = [$pathnames \n];" > "./image-viewer/filepaths.js"
  exit 0
fi

# 2b. if there is a positional argument, loop through positional arguments and get the files in those directories

for dir_path in "$@"
do
  for filename in $(ls $dir_path)
  do
    pathname="'../$dir_path$filename'"
    if [ "$pathnames" == "" ]; then
      pathnames="\n$pathname"
    else
      pathnames="$pathnames,\n    $pathname"
    fi
  done
done

printf "let filepaths = [$pathnames \n];" > "./image-viewer/filepaths.js"