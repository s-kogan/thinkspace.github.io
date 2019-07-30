// FIREBASE CONFIGURATION
var firebaseConfig = {
   apiKey: "AIzaSyBo-niZSiZqF60ckJ9qjDhr0I56xngcp90",
   authDomain: "leafy-tenure-247613.firebaseapp.com",
   databaseURL: "https://leafy-tenure-247613.firebaseio.com",
   projectId: "leafy-tenure-247613",
   storageBucket: "",
   messagingSenderId: "79629686808",
   appId: "1:79629686808:web:44f08dd4405d7e18"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();


// SUBMISSION
$("#form1").submit(function(e) {
	e.preventDefault();

    var image_input_main = document.getElementById("image_input").value;
	
	var image_caption_main = document.getElementById("image_caption").value;

    saveItemToDatabase(image_caption_main, image_input_main);

    image_input.value = "";
    image_caption.value = "";
});

// SAVES POST TO DATABASE
function saveItemToDatabase(image_caption_main, image_input_main){
    
    doc = db.collection("posts").add({
    userCap: image_caption_main,
    userURL: image_input_main
  })
  .then(function(docRef){
    docRef.get().then(function(doc) {
      addPost(doc);
    });
  });
}

function addPost(doc) {
	
	//BACKGROUND CARD
	var post_card = document.createElement("div");
	post_card.classList.add("post_card");

	// IMAGE
	var ImagePleaseWork = document.createElement("IMG");
	ImagePleaseWork.src = doc.data().userURL;

	// CAPTION
	var post_text_elem = document.createElement("p");
	post_text_elem.innerHTML = doc.data().userCap;

	// X 
	var x = document.createElement("p");
	x.id = "x";
	x.innerHTML = "X";

	// APPENDS EVERYTHING
    post_card.appendChild(x)
	post_card.appendChild(ImagePleaseWork);
	post_card.appendChild(post_text_elem);
	document.getElementById("container").appendChild(post_card);

	
	//DELETING FROM DATABASE
	var post_card_id = doc.id;
		post_card.id = post_card_id;

	x.addEventListener("click", function () {
		document.getElementById(post_card_id).remove();
		db.collection("posts").doc(doc.id).delete();
	});
}

function loadPosts(){
  	db.collection("posts").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        addPost(doc);
    });
  });
};

$(document).ready(function(){
  loadPosts()
});
