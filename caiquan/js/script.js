var countComputer = 0
var spanCountComputer = document.getElementById("countComputer")
var spanCountHuman = document.getElementById("countHuman")
var countHuman = 0
var computer = document.getElementById("computer") 
var human = document.querySelector("#human")
document.querySelectorAll(".corse>input").forEach(function(input){
    input.onclick = function(){
      result(this.value)       
      document.querySelector("[for="+this.id+"]").style.boxShadow = "inset 0 0 0 30px black"
    }
})
function showResult(winner){      
    switch(winner){
        case "human":
            human.style.opacity = 1
            countHuman++
            spanCountHuman.innerHTML = countHuman
            spanCountHuman.style.backgroundColor = "green"
            spanCountHuman.style.boxShadow = "0 0 10px 10px green"
            spanCountHuman.style.transform = "scale(1.1)"
        break
        case "computer":
            computer.style.opacity = 1                
            countComputer++
            spanCountComputer.innerHTML = countComputer
            spanCountComputer.style.backgroundColor = "green"
            spanCountComputer.style.boxShadow = "0 0 10px 10px green"
            spanCountComputer.style.transform = "scale(1.1)"
        break            
        default:
            human.style.opacity = 1
            computer.style.opacity = 1
            spanCountComputer.style.backgroundColor = "gray"
            spanCountHuman.style.backgroundColor = "gray"
            spanCountComputer.style.transform = "scale(.9)"
            spanCountHuman.style.transform = "scale(.9)"
        break       
    }
    document.querySelectorAll("input[type=button]").forEach(function(input){
        input.disabled = true
    })
    computer.style.transition = ".3s"
    human.style.transition = ".3s"
    setTimeout(function(){            
        computer.style.transform = "rotate(8deg)"
        human.style.transform = "rotate(-4deg)"
        setTimeout(function(){
            computer.style.opacity = 1
            computer.style.animationName = "prePlay"                
            animationDuration(computer)    
            computer.firstChild.setAttribute("play","rock")
            spanCountComputer.style.backgroundColor = ""
            spanCountComputer.style.boxShadow = ""
            spanCountHuman.style.backgroundColor = ""
            spanCountHuman.style.boxShadow = ""
            human.style.opacity = 1
            human.style.animationName = "prePlay"
            animationDuration(human)
            human.firstChild.setAttribute("play","rock")
            spanCountHuman.style.transform = ""
            spanCountComputer.style.transform = ""
            document.querySelectorAll(".corse>label").forEach(function(label){
                label.style.boxShadow = ""
            })
        },250)
        document.querySelectorAll("input[type=button]").forEach(function(input){
        input.disabled = false
        })
        computerDecision()
    },1000)
}
function computerDecision(){
    var option=["paper","scissors","rock"]
    choiceComputer = option[Math.floor(Math.random()*3)]
    console.clear()
    console.log("computer decision:",choiceComputer)
}
function result(choice){              
    computer.style.animationName = "none"        
    computer.style.transition = "0s"
    computer.style.transform = "rotate(0)"        
    human.style.animationName = "none"        
    human.style.transition = "0s"
    human.style.transform = "rotate(0)"
    setTimeout(function(){
       computer.style.transition = ".2s ease-out"
       computer.style.transform = "rotate(30deg)"
       computer.firstChild.setAttribute("play",choiceComputer)            
       human.style.transition = ".2s ease-out"
       human.style.transform = "rotate(-30deg)"
       human.firstChild.setAttribute("play",choice)  
       showResult(winner)
    },20)
    var winner="computer"
    if (choiceComputer == choice) winner = "tie"
    if (choiceComputer == "paper" && choice == "scissors") winner="human"
    if (choiceComputer == "scissors" && choice == "rock") winner="human"
    if (choiceComputer == "rock" && choice == "paper") winner="human"
}
function animationDuration(object){
    var duration= (4 + Math.random() ).toFixed(1)
    object.style.animationDuration = duration / 10 + "s"
}
document.querySelectorAll("#human,#computer").forEach(function(object){
    animationDuration(object)
})
computerDecision()