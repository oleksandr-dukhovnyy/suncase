#!/bin/bash;

date=$(date +"%Y.%m.%d-%H:%M");
tag=$(git describe --tags);
build_name="build_$tag.$date";

echo "build $build_name";

cd ../;

npm run build;

mkdir CD;
cd CD;

git clone https://github.com/Aleksandr-JS-Developer/suncase.git gh-pages;
cd gh-pages;
git checkout gh-pages;

cd gh-pages;
ls | xargs rm -rf;
rm .gitignore;

cd ../..;

cp -r dist/. CD/gh-pages/;

cd CD/gh-pages;


git add .;
git commit -m "$build_name";
git push;

cd ../..;

rm -rf CD;
rm -rf dist;