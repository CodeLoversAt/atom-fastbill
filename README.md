# atom-fastbill
FastBill desktop app using atom-shell

## Build instructions

```shell
git clone https://github.com/CodeLoversAt/atom-fastbill.git
cd atom-fastbill
npm install -g gulp grunt-cli
npm install
gulp
```

App will be generated in `build/[platform]/atom-shell` (f.e. `build/darwin/atom-shell` on OS X or `build/win32/atom-shell` on windows).

## Where do I get my API key?

To use this app you need to provide your FastBill username (= e-mail address) and your API key. You can retreive your API key by logging in to [https://my.fastbill.com](https://my.fastbill.com) and from the dropdown with your profile picture in the upper right corner choose "Settings". Scroll down a little on the "overview" tab.
