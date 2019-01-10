case $1 in
  production)
    subdomain=requester;;
  ropsten)
    subdomain=dev-requester;;
esac

url=gs://${subdomain}.expand.org
old_hash=$(gsutil ls $url | sed -nE "s,${url}/portal-(.+)\.js$,\1,p")

rm -rf ./public/static ./public/portal-* ./public/index.html
npm install
NODE_ENV=$1 webpack

gsutil cp -r ./public/static ./public/portal-* ./public/index.html ${url}/
gsutil rm ${url}/portal-${old_hash}*
