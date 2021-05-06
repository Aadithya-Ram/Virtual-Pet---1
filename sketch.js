//Create variables here
var dog, dogImage1, dogImage2, database, foods, foodStock
function preload()
{
  dogImage1 = loadImage("images/dogImg.png")
  dogImage2 = loadImage("images/dogImg1.png")
	//load images here
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database()
  dog = createSprite(300,300)
  dog.addImage(dogImage1)
  dog.scale = 0.5
  foodStock = database.ref("food")
  foodStock.on("value", readStock)
}


function draw() {  
  background("red")
  if(keyWentDown(UP_ARROW)){
    writeStock(foods)
    dog.addImage(dogImage2)
  }
  drawSprites();
  //add styles here
   fill("yellow")
   stroke("blue")
   text("Food Remaining"+ foods,170,170)
   text("PRESS UP ARROW TO FEED TO DOG", 200,200)
}

function readStock(data){
  foods = data.val()
}
function writeStock(A){
  if(A<= 0){
    A=0
  }
  else{A = A-1}
  database.ref("/").update(
    {
    food:A
  }
) 
}