let googleUser, userId;

window.onload = () => {
    firebase.auth()
        //if user already signed in store username in variab;e
        .onAuthStateChanged(user => {
            if (user) {
                console.log(`Logged in as: ${user.displayName}`);
                googleUser = user;
            //if not logged in go back to index
                userId = googleUser.uid;
                window.alert(`Welcome, ${user.displayName}!`);

            } else {
                window.location = 'index.html';
            };
        });
};

const submitNote = () => {
    const title = document.querySelector("#noteTitle").value;
    const note = document.querySelector("#noteText").value;
    const label = document.querySelector("#noteLabel").value;

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    console.log(dateTime);
    firebase.database().ref(`users/${userId}`).push(
        {
            title: title,
            label: label,
            note: note,
            timestamp: dateTime
        })
        .then(() => {
            document.querySelector("#noteText").value = "";
            document.querySelector("#noteTitle").value = "";
            document.querySelector("#noteLabel").value = "";
        })
        .catch(error => {
            console.log(`Something bad happened ...\n${error}`)
        });
};