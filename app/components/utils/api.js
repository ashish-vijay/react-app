var axios = require('axios');

var id = "CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var params = "?client_id=" + id + "&client_secret=" + sec;

function getProfile(username) {
  var url = 'https://api.github.com/users/' + username;
  return axios.get(url)
    .then(function (user) {
      return user.data;
    })
}

function getRepos (username) {
  var url = 'https://api.github.com/users/' + username + '/repos'
  return axios.get(url);
}

function getStarCount (repos) {
  return repos.data.reduce(function (count, repo) {
    return count + repo.stargazers_count; 
  }, 0) 
}

function calculateScore (profile, repos) {
  var followers = profile.followers;
  var totalstars = getStarCount(repos);
  return (followers * 3) + totalstars;
}

function handleError (error) {
  console.warn(error);
  return null;
}

function getUserData (player) {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then(function (data) {
    var profile = data[0];
    var repos = data[1];
    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  })
}

function sortPlayers (players) {
  return players.sort(function (a, b) {
    return b.score - a.score;
  })
}

module.exports = {
  compare: function (players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },
  fetchPopularRepos: function(language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&per_page=102&sort=stars&order=desc&type=Repositories');
    return axios.get(encodedURI)
      .then(function(response){
        return response.data.items;
      })
      .catch(function(error){
        return error;
      });
  }
};
