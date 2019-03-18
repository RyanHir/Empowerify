echo "compiling version" $(cat manifest.json | jq ".version" | sed 's/"//g')
zip -r empowerify.zip * -x docs/**\* -x *.sh -x *.md $> /dev/null
