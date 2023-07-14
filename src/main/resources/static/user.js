const data= document.getElementById("userTable");
const url = 'http://localhost:8080/user/showUser';
const topPanel = document.getElementById("userHeader");

function userAuthInfo() {
    fetch(url)
        .then(res => res.json())
        .then((user) => {

            let temp = '';

            temp += `<tr>
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.roles.map(role => " " + role.roleName.substring(5))}</td>
            </tr>`;
            data.innerHTML = temp;
            topPanel.innerHTML =
                `<h4>${user.email} with roles: ${user.roles.map(role => " " + role.roleName.substring(5))}</h4>`
        });
}

userAuthInfo()