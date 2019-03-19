echo "compiling version" $(cat manifest.json | jq ".version" | sed 's/"//g') " For Chrome"
zip -r chrome.zip * -x docs/**\* -x *.sh -x *.md $> /dev/null
echo "compiling version" $(cat manifest.json | jq ".version" | sed 's/"//g') " For Firefox"
mv manifest.json manifestChrome.json
jq '.permissions += ["tabs"]' manifestChrome.json >> manifest.json
zip -r firefox.zip * -x docs/**\* -x *.sh -x *.md $> /dev/null
mv manifestChrome.json manifest.json
