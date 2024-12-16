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
#       $ ./write_filepaths.sh

# store pathnames of image files in the pathnames variable
IMAGE_COLLECTIONS="image-collections"
pathnames=""

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
# printf "\n\nlet imageDirs = '$(ls $IMAGE_COLLECTIONS | xargs)'" >> "./image-viewer/filepaths.js"
