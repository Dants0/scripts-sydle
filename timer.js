const timer = document.getElementById("timer")
const timerIsOver = document.getElementById("shutDown")

function countDown(){
    setInterval(()=>{
        let hour = new Date().getHours()
        let minutes = new Date().getMinutes()
        let seconds = new Date().getSeconds()
        if(hour == 16){
            return timerIsOver.innerText = `Hora de ir para casa ${hour}`
        }else{
            return timer.innerText = `${hour}:${minutes}:${seconds}`
        }
    }, 1000)
}

countDown()