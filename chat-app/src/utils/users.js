const users = [];

const addUser = ({id, userName, roomName}) => {

        userName = userName.trim().toLowerCase();
        roomName = roomName.trim().toLowerCase();

        if(!userName || !roomName)
            return{
                error: 'Le Pseudo et le nom de la Salle sont requis'
            }
        
        const existingUser = users.find((user) => {
                return user.roomName === roomName && user.userName === userName;
        });

        if(existingUser)
            return { error: "Pseudo non disponible" }

        const user = {
            id,
            userName,
            roomName,
        }
        users.push(user);

        return {user}
}

const removeUser = (id) => {
    const index = users.findIndex( (user) => {
        return user.id === id;
    } );
    if(index !== -1)
        return users.splice(index, 1)[0];
    
}

const getUser = (id) => {

    const user = users.find((user) => {
        return user.id === id;
    });

    // console.log(user);
    return(user);
}

const getUserInRoom = (roomName) => {
    const usersInRoom = users.filter((user) => {
            return user.roomName === roomName;
    });

    return usersInRoom;

}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUserInRoom
}