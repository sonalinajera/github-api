"use strict";
import $ from 'jquery';
import './index.css';


const handleGetRepoClick = () => {
    $('body').on('click', 'button', () => {
        event.preventDefault();
        let githubHandle = $('form').find('#githubHandle').val();
        getUserRepos(githubHandle);
    });
};

const getUserRepos = (gitHubHandle) => {
    const baseURL = `https://api.github.com/users/${gitHubHandle}/repos`;
    return fetch(baseURL)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
        .then(data => {
            return generateUserRepos(data);
        })
        .catch(error => {
            console.log('catch is working', error.message);
        });
};


const generateUserRepos = (repos) => {
    
    let repoStrings = repos.map(repo => {
        return `<li>
                <a href="${repo.html_url}">${repo.name}</a>
                </li>`;
    });
    let repoString = repoStrings.join('');
    console.log(repoString);
    return generateUseRepoList(repoString);
};

const generateUseRepoList = (repoListItems) => {
    let formattedRepos = `<ul>
            ${repoListItems}
            </ul>`;
    return $('#displayResults').html(formattedRepos);
}


$(handleGetRepoClick);