rm -rf dist &&
yarn build &&
cd dist &&
git init &&
git add . &&
git commit -m "update" &&
git branch -M main &&
git remote add origin git@github.com:cy-wey/vue-note-website.git &&
git push -f -u origin main &&
git branch -M master &&
git remote add origin git@github.com:cy-wey/vue-note-website.git &&
git push -f -u origin master &&
cd -
echo  https://cy-wey.github.io/vue-note-website/
