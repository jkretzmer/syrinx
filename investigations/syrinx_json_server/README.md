# Syrinx JSON Server

The Syrinx JSON Server is a simple test server for developing the Syrinx front end. It uses the netcat and sbp2json tool from gnss-converters to provide a websocket stream of JSON encapsulated SBP over port 3000.

Requirements:

stack - https://docs.haskellstack.org/en/stable/install_and_upgrade/

sbp2json - https://github.com/swift-nav/gnss-converters
	Clone repo, install with:
		stack install --resolver lts-6.25 sbp

Setup:

npm install
modify sbp_json.sh to use the IP and TCP server port of the device you are using for testing.

Usage:

node server.js