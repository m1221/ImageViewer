# About **Image Viewer**

Image Viewer is a local, flashcard-like, browser-based app. 

To set it up:
1. put a directory with image files in the `image-collections` directory
1. navigate to the root directory
1. run the bash script `./setup_image_view.sh`

The script checks all directories within the `image-collections` directory, extracts the pathnames of the files in those directories, and adds those pathnames to a javascript file that is used by `image-viewer.html`.

Please note that you should give your image files useful names; pressing the 'reveal' button in the browser app will display a name extracted from the filename.

After you've set it up, you can open `image-viewer.html` to view the image files.

<img src="image-viewer-preview.jpg" alt="preview" width="600" height="auto"/>