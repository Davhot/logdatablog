git reset HEAD~1
git add .
git commit -m "dump"
git push --force
cap production deploy
