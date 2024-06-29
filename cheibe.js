
let displayedArticleUserId;

let participants = [
	{
		name: "Ädu",
		article: {},
		guessed: 0,
		stolen: 0,
		lost: 0
	},
	{
		name: "glow",
		article: {},
		guessed: 0,
		stolen: 0,
		lost: 0
	},
	{
		name: "draemmli",
		article: {},
		guessed: 0,
		stolen: 0,
		lost: 0
	}
];

function changeArticle(id){
	const inputForm = document.getElementById("articleEntry");
	const inputtingUserLabel = document.getElementById("inputtingUser");
	const articleForm = document.getElementById("articleForm");
	const articleInput = document.getElementById("articleInput");
	inputtingUserLabel.innerHTML = participants[id].name;


	articleForm.onsubmit = function(e){
		e.preventDefault();
		console.log("blob");
		participants[id].article.name = articleInput.value;
		articleInput.value = "";
		document.getElementById("change"+id).style.backgroundColor = "#d731d9";
		inputForm.style.display = "none";
	}
	
	inputForm.style.display = "block";
	articleInput.focus();
	
}

const rollButton = document.getElementById("rollButton");

rollButton.onclick = function(){
	displayedArticleUserId = ~~(Math.random()*3);
	document.getElementById("article").innerHTML = participants[displayedArticleUserId].article.name;
	
	document.getElementById("articleDisplay").style.display = "flex";
	document.getElementById("startDisplay").style.display = "none";
	document.getElementById("revealText").style.opacity = "0";
}

function guess(id){
	document.getElementById("articleDisplay").style.display = "none";
	document.getElementById("startDisplay").style.display = "flex";
	document.getElementById("reveal").style.display = "block";
	
	document.getElementById("revealText").innerHTML = participants[displayedArticleUserId].name;
	
	participants[displayedArticleUserId].article.name = "";
	
	participants[id].guessed++;
	
	if(id == displayedArticleUserId){
		document.getElementById("revealText").style.color = "#ffffff";
		document.getElementById("revealText").innerHTML = "🎉 "+document.getElementById("revealText").innerHTML+" 🎉";
	} else {
		participants[id].stolen++;
		participants[displayedArticleUserId].lost++;
		document.getElementById("revealText").style.color = "#d93131";
	}
	
	setTimeout(function(){
		document.getElementById("revealText").style.opacity = "1";
		document.getElementById("change"+displayedArticleUserId).style.backgroundColor = "#d93131";
		updateScore();
	}, 1000);
}

function updateScore(){
	for(let i in participants){
		document.getElementById("guessed"+i).innerHTML = participants[i].guessed;
		document.getElementById("stolen"+i).innerHTML = participants[i].stolen;
		document.getElementById("lost"+i).innerHTML = participants[i].lost;
	}
}