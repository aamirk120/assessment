exports.timestamp = () => {
    return new Date();
};
exports.parseMiliSecondsToDate = (timestamp) => {
    return new Date(timestamp);
};

exports.getMilisecondsFromDate = (date) => {
    return new Date( date ).getTime();
};

exports.getCurrentTimestamp = () => {
    return new Date( ).getTime();
};

exports.makeForgotPassToken = (length) => {
    let result = "";
    const characters       = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
          charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt( Math.floor( Math.random() * charactersLength ) );
    }
    return result;
};
