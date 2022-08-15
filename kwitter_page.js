function logout(){
    localStorage.removeItem("User_Name");

    localStorage.removeItem("room_select");

    window.location  = "index.html";
}


//ADD YOUR FIREBASE LINKS HERE

var firebaseConfig = {
    apiKey: "AIzaSyAlwBHpLmLeVWZynWZUot4A7k2N_V4FvqU",
    authDomain: "kwitter-6a8a3.firebaseapp.com",
    databaseURL: "https://kwitter-6a8a3-default-rtdb.firebaseio.com",
    projectId: "kwitter-6a8a3",
    storageBucket: "kwitter-6a8a3.appspot.com",
    messagingSenderId: "260795775775",
    appId: "1:260795775775:web:319e0e1ff41245a69d4e2a"
  };
  
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 user_name = localStorage.getItem("User_Name");

 room_name = localStorage.getItem("room_select");
 
 document.getElementById("wel_come").innerHTML="Welcome " + user_name + " to #"+ room_name;

 function send(){
    New_message = document.getElementById("New_msg").value;
    // to save the data in firebase using push() with random child name 
    firebase.database().ref(room_name).push({
          name:user_name,
          message:New_message,
          like:0
    });

    document.getElementById("New_msg").value = "";
 }
function get_Data(){

    firebase.database().ref("/"+room_name).on("value", function(snapshot){
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot){
            child_key = childSnapshot.key;
            child_data = childSnapshot.val();

            if(child_key != "purpose")
            {
                message_id = child_key;
                message_data = child_data;

                name_user = message_data['name'];
                msg = message_data['message'];
                yourLikes = message_data['like'];

                name_tag = "<h4>" + name_user + "</h4>";
                message_tag = "<h4> " + msg + "</h4>";

                like_button = "<button class='btn btn-primary' id = "+ message_id + " onclick = 'update_likes(this.id);'  value = "+ yourLikes +" > Likes : "+ yourLikes +" </button> <hr>";

                row_data = name_tag + message_tag + like_button;

                document.getElementById("output").innerHTML  = document.getElementById("output").innerHTML  + row_data;
            }

        });
    });

}
get_Data();


function update_likes(button_id){

    old_likes = document.getElementById(button_id).value;

    update_like = Number(old_likes) + 1;

    firebase.database().ref(room_name).child(button_id).update({
        like:update_like
    });

}