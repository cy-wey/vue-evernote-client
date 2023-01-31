rm -rf dist &&
yarn build &&
cd dist &&
git init &&
git add . &&
git commit -m "update" &&
git branch -M master &&
git remote add origin git@gitee.com:wei-cunyi/vue-cloud-notes.git &&
git push -f -u origin master &&
cd -
echo  https://wei-cunyi.gitee.io/vue-cloud-notes/#/note/
