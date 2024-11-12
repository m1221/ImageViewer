#! /bin/bash
# Date: 2024/11/12
# Author: Mario Portocarrero
# Description:
#   This script:
#     1. extracts pathnames from the subdirectories of `./image-collections`
#     2. writes those pathnames to `./image-viewer/filepaths.js`
#
# Usage: 
#   i. extract pathnames of image files from all subdirectories
#       $ ./setup_image_viewer_bulk.sh
#   ii. extract pathnames of image files from target directories
#       $ ./setup_image_viewer_bulk.sh ./image-collections/TARGET_DIRECTORY ...

# 1. store pathnames of image files in the pathnames variable
IMAGE_COLLECTIONS="image-collections"
pathnames=""

# 1a. if no positional arguments, include all filenames from "./image-collections" in filepaths.js
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

# 1b. if there is a positional argument, loop through positional arguments and get the files in those directories
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