const users = [
    { user: "alex", pass: "1234" },
    { user: "cipi", pass: "qwerty" },
];

const checkUser = (obj, user, pass) => obj.user === user && obj.pass === pass;
const check = (arr, username, password) =>
    arr
        .map((user) => checkUser(user, username, password))
        .reduce((status, value) => status || value, false);

export const login = async ({ username, password }) =>
    new Promise((resolve, reject) =>
        setTimeout(() => {
            if (check(users, username, password)) {
                resolve(true);
            } else {
                reject(false);
            }
        }, Math.floor(Math.random() * 1500) + 500)
    );
