function log_in(){

    name_user = document.getElementById("user_name").value;

    localStorage.setItem("User_Name",name_user);
    
    window.location = "kwitter_room.html";

}