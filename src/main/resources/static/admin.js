const data = document.getElementById("userTable");
const url = 'http://localhost:8080/admin/showAdmin';
const topPanel = document.getElementById("adminHeader");

function userAuthInfo() {
    fetch(url)
        .then((res) => res.json())
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


const URL = "/admin/users";

$(document).ready(function () {
    getUsers();
})

function getUsers() {
    fetch(URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (users) {
            let placeholder = document.getElementById('userTableData');
            let out = "";
            for (let user of users) {
                out += '<tr>';
                out += '<td>' + user.id + '</td>';
                out += '<td>' + user.username + '</td>';
                out += '<td>' + user.email + '</td>';

                let i, role = "";
                for (i in user.roles) {
                    role = user.roles[i].roleName.substring(5);
                    if (user.roles.length === 1) {
                        out += "<td>" + role + "</td>";
                    } else if (i == 0) {
                        out += "<td>" + role + ", ";
                    } else if (i == user.roles.length - 1) {
                        out += role + "</td>";
                    } else {
                        out += role + ", ";
                    }
                }
                out += '<td>' +
                    '<button type="button" class="btn btn-info" data-bs-target="#editModal" data-bs-toggle="modal" ' +
                    'onclick="getEditModal(' + user.id + ')">' + 'Edit' +
                    '</button>' +
                    '</td>';
                out += '<td>' +
                    '<button type="button" class="btn btn-danger" data-bs-target="#deleteModal" data-bs-toggle="modal" ' +
                    'onclick="getDeleteModal(' + user.id + ')">' + 'Delete' +
                    '</button>' +
                    '</td>';
                out += '</tr>';
            }

            placeholder.innerHTML = out;
        });
}

function getEditModal(id) {
    fetch(URL + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json()
            .then(userEdit => {
                document.getElementById('editModalUserId').value = userEdit.id;
                document.getElementById('editModalUsername').value = userEdit.username;
                document.getElementById('editModalEmail').value = userEdit.email;
                document.getElementById('editModalPassword').value = userEdit.password;
                document.getElementById('editModalRole').value = userEdit.roles;

                const select = document.querySelector('#editModalRole').getElementsByTagName('option');

                for (let i = 0; i < select.length; i++) {
                    if (select[i].value === userEdit.roles[i].roleName) {
                        select[i].selected = true;
                        if (i === select.length - 1) {
                            break;
                        }
                    } else if (select[i + 1].value === userEdit.roles[i].roleName) {
                        select[i + 1].selected = true;
                    }
                }
            })
    });
}

function editUser() {
    event.preventDefault();
    let id = document.getElementById('editModalUserId').value;
    let username = document.getElementById('editModalUsername').value;
    let email = document.getElementById('editModalEmail').value;
    let password = document.getElementById('editModalPassword').value;
    let roles = $("#editModalRole").val()

    for (let i = 0; i < roles.length; i++) {
        if (roles[i] === 'ROLE_ADMIN') {
            roles[i] = {
                'id': 1,
                'roleName': 'ROLE_ADMIN',
                "authority": "ROLE_ADMIN"
            }
        }
        if (roles[i] === 'ROLE_USER') {
            roles[i] = {
                'id': 2,
                'roleName': 'ROLE_USER',
                "authority": "ROLE_USER"
            }
        }
    }

    fetch(URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            'id': id,
            'username': username,
            'email': email,
            'password': password,
            'roles': roles
        })
    })
        .then(() => {
            $('#editModal').modal('hide');
            getUsers();
        })
}

function getDeleteModal(id) {
    fetch(URL + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(userDelete => {
            document.getElementById('deleteModalUserId').value = userDelete.id;
            document.getElementById('deleteModalUsername').value = userDelete.username;
            document.getElementById('deleteModalEmail').value = userDelete.email;
            document.getElementById('deleteModalRole').value = userDelete.roles;
        })
    });
}

function deleteUser() {
    event.preventDefault();
    let id = document.getElementById('deleteModalUserId').value;

    fetch(URL + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },

    })
        .then(() => {
            $('#deleteModal').modal('hide');
            getUsers();
        })
}

function addUser() {
    event.preventDefault();
    let username = document.getElementById('addUsername').value;
    let email = document.getElementById('addEmail').value;
    let password = document.getElementById('addPassword').value;
    let roles = $("#addRole").val()


    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            'username': username,
            'email': email,
            'password': password,
            'roles': roles
        })
    })
        .then(() => {
            document.getElementById('users-tab').click()
            getUsers()
            document.newUserForm.reset()
        })

}