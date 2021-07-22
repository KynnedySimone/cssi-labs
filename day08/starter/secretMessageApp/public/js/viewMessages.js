const getMessages = () => {
    const messageRef = firebase.database().ref();
    messageRef.on('value', (snapshot) => {
        const data = snapshot.val();
        //console.log(data);

        const passcodeAttempt = document.querySelector('#passcode').value;

        for(const recordKey in data) {
            console.log(recordKey);
            console.log(data[recordKey]);

            const record = data[recordKey];

            const storedPasscode = record.passcode;

            if (passcodeAttempt === storedPasscode) {
                console.log(`Message is: ${record.message}`);
            }
            
        }
    })
}