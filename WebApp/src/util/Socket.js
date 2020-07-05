const SocketResponseState = require('../appRedux/actions/Socket').SocketResponseState;
const io = require("socket.io-client");


const Socket = (function () {
    let instance;

    function createInstance(userId) {
        console.log("========================= userId", userId, process.env.REACT_APP_ROOT_URL);
        const socket = io(process.env.REACT_APP_ROOT_URL, { query: `clientId=${userId}`});

            //========== if any error accept error
            socket.on("error", function (err) {
                console.log("===================== Connection Created", err)
            });

            //========== Receive Connection when created
            socket.on("connect", function (err, data) {
                console.log("===================== Connection Created",err, data);
                //const userID = JSON.parse(localStorage.getItem('data'))._id
                //fetchUserData(userID);
            });

            //============ Receive When connection disconnected=======
            socket.on("disconnect", function () {
                console.log("===================== Connection disconnect")

            });

            //============== fetch All User for chat
            socket.on("requestFetchUser", function (result) {
                console.log("============== result", result);
            });

            //================ Fetch Chat between user
            socket.on("fetchChatBetweenUser", function (result) {
                console.log("============== result", result);
            });
            
            //============== Catch Chat between user
            socket.on("ChatBetweenUser", function (value) {
                SocketResponseState('fetchChatBetweenUser', { data: value })
            });

            function fetchUserData(id) {
                return new Promise((resolve, reject) => {
                    socket.emit("requestFetchUser", id, function (value) {
                        resolve(value);
                    });
                });
            }




            // Update || Create messages
            // socket.on("message-update", function(msg, update) {
            //   // This will update message
            //   if(update) {
            //     updateMessage(msg.userId, msg.threadId, msg.threadType);
            //     return
            //   }
            //   // This.will create new message
            //   fetchNewMessage(msg.message, msg.threadType)
            // })

            // socket.on("create-new-thread-client", function(conversation) {
            //   fetchNewConversation(conversation);
            // })
        

        // ============ Fetch New Conversation between user    
        function fetchNewConversation(data, dispatch) {
            return new Promise((resolve, reject) => {
                socket.emit("fetchNewConversation", data, function (value) {
                    SocketResponseState('fetchChatBetweenUser', { data: value })
                    resolve(value);
                });
            });
        }

        // =============== Fetch Old Conversation using ThreadId
        function fetchNewConversationByThreadId(data, dispatch) {
            return new Promise((resolve, reject) => {
                socket.emit("fetchNewConversationByThreadId", data, function (value) {
                    SocketResponseState('fetchChatBetweenUser', { data: value })
                    resolve(value);
                });
            });
        }

        // ============== Disconnect user connection
        function socketDisconnet(threadId) {
            closeAllListeners();
        }


       function createNewThread(conversation, sender) {
            return new Promise((resolve, reject) => {
            socket.emit("create-new-thread", conversation, sender, function(value) {
                resolve(value);
            });
            });
        }

        //   function joinThread(threadId) {
        //     return new Promise((resolve, reject) => {
        //       socket.emit("join-thread", threadId, function(value) {
        //         resolve(value);
        //       });
        //     });
        //   }

        //   function createNewThread(conversation, sender) {
        //     return new Promise((resolve, reject) => {
        //       socket.emit("create-new-thread", conversation, sender, function(value) {
        //         resolve(value);
        //       });
        //     });
        //   }
        //   function createNewMessage(message, threadType) {
        //     return new Promise((resolve, reject) => {
        //       socket.emit("create-new-message", message, threadType, function(value) {
        //         resolve(value);
        //       });
        //     });
        //   }

        //   function broadcastMessage(roomId, message, threadType) {
        //     return new Promise((resolve, reject) => {
        //       socket.emit("broadcast-message", roomId, message, threadType, function(value) {
        //         resolve(value);
        //       });
        //     });
        //   }

        //   function UpdateBroadcastMessage(userId, threadId, threadType) {
        //     return new Promise((resolve, reject) => {
        //       socket.emit("update-broadcast-message", userId, threadId, threadType, function(value) {
        //         if(value) {
        //           resolve(value);
        //         }
        //       });
        //     });
        //   }

        //   function leaveThread(threadId) {
        //     return new Promise((resolve, reject) => {
        //       socket.emit("leave-thread", threadId, function(value) {
        //         resolve(value);
        //       });
        //     });
        //   }

        //   function sendMessage(threadId, message) {
        //     return new Promise((resolve, reject) => {
        //       socket.emit("send-message", threadId, message, function(value) {
        //         resolve(value);
        //       });
        //     });
        //   }

        // =========== close All user listener ===============
        function closeAllListeners(threadId) {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("error");
            socket.off("message-update");
            socket.off("create-new-thread-client");
        }

        return {
            
            socketDisconnet,
            fetchNewConversation,
            fetchNewConversationByThreadId,
            // joinThread,
             createNewThread,
            // leaveThread,
            // sendMessage,
            // createNewMessage,
            // broadcastMessage,
            // UpdateBroadcastMessage
        };
    }

    return {
        getInstance: function (userId) {
            console.log("============ userId",userId);
            if (!instance) {
                instance = createInstance(userId);
            }
            return instance;
        }
    };
})();

module.exports = {
    Socket: Socket
};
