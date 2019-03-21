temp=manifestChrome.json

mkdir -p out/
echo "compiling version" $(cat manifest.json | jq ".version" | sed 's/"//g')
zip -r out/chrome.zip * -x docs/**\* -x *.sh -x *.md $> /dev/null
mv manifest.json $temp
jq '.permissions += ["tabs"]' $temp >> manifest.json
zip -r out/firefox.zip * -x docs/**\* -x *.sh -x *.md -x $temp $> /dev/null
mv $temp manifest.json
