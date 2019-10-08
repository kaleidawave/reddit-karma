// From Lloyd Banks / Elias Zamaria from: https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function userToUrl(user) {
    return `https://www.reddit.com/user/${user}`;
}

function urlToUser(url) {
    return url.substring(url.lastIndexOf('/user/') + 5, url.length).replace('/', '');
}

async function getKarma(event) {
    event.preventDefault();
    document.getElementById('score').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading';
    let input = document.getElementById('username').value;
    let username = input.includes('reddit.com/user/') ? urlToUser(input) : input;
    const response = await fetch(`https://www.reddit.com/user/${username}.json?sort=top&limit=100`);
    if (response.ok) {
        const json = await response.json();
        let scores = json.data.children.map(post => post.data.score);
        if (scores.length === 0) {
            document.getElementById('score').innerHTML = `User: <a href="${userToUrl(username)}">${username}</a> does not have any posts or comments`;
        }
        else {
            let score = scores.reduce((a, b) => a + b);
            document.getElementById('score').innerHTML = `User: <a href="${userToUrl(username)}">${username}</a> has ${numberWithCommas((score))} total upvotes`;
        }
    }
    else {
        document.getElementById('score').innerHTML = `User: <a href="${userToUrl(username)}">${username}</a> does not exist`;
    }
}
