version=$(cat manifest.json | jq ".version" | sed 's/"//g')
output="out"
temp="manifestChrome.json"
exclude="*.md *.sh *docs\/* *$output\/* $temp"

rm -rf $output
mkdir -p $output

echo "compiling version $version"

zip -r "$output/chrome.zip" * -x $exclude $> /dev/null

mv manifest.json $temp

cat $temp | 
	jq '.permissions += ["tabs"]' |
	jq ".applications =
		{\"gecko\": 
			{\"update_url\": \"https://ryanhir.github.io/Empowerify/update.json\"}
		}" >> manifest.json
zip -r "$output/firefox.zip" * -x $exclude $> /dev/null

mv $temp manifest.json
