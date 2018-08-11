git reset HEAD~1
git add .
git commit -m "fix deploy"
git push --force
cap production deploy
