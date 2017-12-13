$(function(){
    console.log("%c 52PROJECT ready to go!","background-color:#444; text-shadow:0 1px 0 #000; color:#fff; line-height:30px; padding:15px 300px; font-size:25px; font-family: -apple-system, BlinkMacSystemFont, sans-serif;letter-spacing: 2px;");
    db.collection("items")
        .onSnapshot(function (snapshot) {
            snapshot.docChanges.forEach(function (change) {
                let data = change.doc.data();
                if (change.type === "added") {
                    console.log("DATA ADDED: ", data);
                }
                if (change.type === "modified") {
                    console.log("Modified city: ", data);
                }
                if (change.type === "removed") {
                    console.log("Removed  ", data);
                }
            });
        });

    // Declare app level module which depends on views, and components
    var app = angular.module('myApp', ['ui.tree']);
    app.filter('prettyJSON', function () {
        function prettyPrintJson(json) {
            return JSON ? JSON.stringify(json, null, '  ') : 'your browser doesnt support JSON so cant pretty print';
        }

        return prettyPrintJson;
    });
    /**
     <div style="overflow:auto; height: 220px; color:#fff;">
     <pre>
     {{tracks | json}}
     </pre>
     </div>
     */
    app.controller('AnimateController', function ($scope, $rootScope) {

    });

    //db.collection("subscriptions").where("userid", "==", fc.CURRENT_USER).where("unread", "==", 1)


    // db.collection("items").doc().set(
    // 	newItem
    // ).then(function () {
    // 	console.log("done");
    // }).catch(function (err) {
    // 	console.error(err);
    // });


    // db.collection("items").where("id", "==", itemid).get().then(function (querySnapshot) {
    // 	querySnapshot.forEach(function (doc) {
    // 		let data = doc.data();
    // 		data.priority_title = newPriority;
    // 		data.title = newTitle;
    // 		db.collection("items").doc(doc.id).set(data);
    // 	});
    // })
    // .catch(function (error) {
    // 	console.log("Error getting documents: ", error);
    // });

    // db.collection("subscriptions").where("itemid", "==", itemid).where("userid", "==", fc.CURRENT_USER).get().then(function (querySnapshot) {
    // 	querySnapshot.forEach(function (doc) {
    // 		db.collection("subscriptions").doc(doc.id).delete();
    // 	});
    // })
    // .catch(function (error) {
    // 	console.log("Error getting documents: ", error);
    // });


});
