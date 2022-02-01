const generateMessage = ((text) => {
    return {
        text : text.message,
        createdAt: new Date().getTime(),
        userName: text.userName
    }
});

const generateMessageLocation = ((url) => {
    return {
        url: url.url,
        createdAt: new Date().getTime(),
        userName: url.userName
    }
})

module.exports = {
    generateMessage,
    generateMessageLocation,

}