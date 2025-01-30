const sessionIDmap = new Map();

function setUser(id, user) {
    sessionIDmap.set(id, user);
}

function getUser(id) {
    return sessionIDmap.get(id);  // Fixed incorrect `.map()` usage
}

module.exports = {
    setUser,
    getUser,
};
