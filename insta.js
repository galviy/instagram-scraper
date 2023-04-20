const fetch = require('node-fetch');
const fs = require('fs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function FetchUser(username) {
	console.clear()
    const sendPacket = async () => {
        try {
            const response = await fetch("https://www.instagram.com/" + username + "/?__a=1&__d=1");
            if (response.status == 404) {
				console.log("That user Does Not Exist!");
				return showMenu();
			}
			const myJson = await response.json();
			if (myJson.graphql.user.biography.length < 1) myJson.graphql.user.biography = username + "'s bio is currently empty!";
			if (!myJson.graphql.user.is_private) {
				 console.log(`Account is Opened to Public!\nTotal of Posts -> ${myJson.graphql.user.edge_owner_to_timeline_media.count}\nAccount Name -> ${myJson.graphql.user.username}\nFull Name -> ${myJson.graphql.user.full_name}\nProfile Picture URL -> ${myJson.graphql.user.profile_pic_url_hd}\nFollwers -> ${myJson.graphql.user.edge_followed_by.count}\nFollowing -> ${myJson.graphql.user.edge_follow.count}\nURLs -> ${myJson.graphql.user.external_url}`)
			     console.log(`=BIO=\n-----------------------------------------------\n${myJson.graphql.user.biography}\n-----------------------------------------------\nDone!`)
			} else {
				console.log(`Account is Private!\nTotal of Posts -> ${myJson.graphql.user.edge_owner_to_timeline_media.count}\nAccount Name -> ${myJson.graphql.user.username}\nFull Name -> ${myJson.graphql.user.full_name}\nProfile Picture URL -> ${myJson.graphql.user.profile_pic_url_hd}\nFollwers -> ${myJson.graphql.user.edge_followed_by.count}\nFollowing -> ${myJson.graphql.user.edge_follow.count}\nURLs -> ${myJson.graphql.user.external_url}`)
			    console.log(`<<<<<<<<<<=BIO=>>>>>>>>>>\n-----------------------------------------------\n${myJson.graphql.user.biography}\n-----------------------------------------------\nDone!`)
			}
        } catch (e) {

			switch(e.code) {
				case "ENOTFOUND": {
					console.log("Couldn't connect to Instagram API")
				}
			}

        }
		showMenu()
    }
    sendPacket()
}

function showMenu() {
	
	readline.question("Insert the Instagram User :", function(input1) {
		FetchUser(input1)
	})
}
showMenu()

