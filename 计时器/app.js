document.addEventListener("keydown", keydown);
function keydown(event) {
    switch (event.keyCode) {
        case 13:
            if (count === 2){
                timeincclick();
            }
            break;
        case 32:
            if (count === 0) {
                pauseclick();
            }
            else if (count === 1) {
                resumeclick();
            }
            break;
    }
}


var rhour,rmin,rsec,rhl,rml,rsl,thour,tmin,tsec,thl,tml,tsl,timer1,timer2,time1,time2;//rhl:resthourlabel,thl:totalhourlabel
var count = 2;
var exp = /^\d+$/;
var timeinc = document.getElementById("countup");
var timedec = document.getElementById("countdown");
var pauset = document.getElementById("pause");
var restartt = document.getElementById("restart");
var cleart = document.getElementById("clear");
var resumet = document.getElementById("resume");
var hintt = document.getElementById("hint");
var timet = document.getElementById("time");
var hour = document.getElementById("hour");
var min = document.getElementById("minute");
var sec = document.getElementById("second");


timeinc.onclick = timeincclick;
timedec.onclick = timedecclick;
pauset.onclick=pauseclick;
restartt.onclick = restartclick;
cleart.onclick = clearclick;
resumet.onclick = resumeclick;


function timercontrol() {
    if (rsec >= 10) {
        rsl = "" + rsec;
    }
    else {
        rsl = "0" + rsec;
    }
    if (rmin >= 10) {
        rml = "" + rmin;
    }
    else {
        rml = "0" + rmin;
    }
    if (rhour >= 10) {
        rhl = "" + rhour;
    }
    else {
        rhl = "0" + rhour;
    }
    timet.innerHTML = rhl + ":" + rml + ":" + rsl;
}

function totalcontrol(){
    if (thour >= 10) {
        thl = "" + thour;
    }
    else {
        thl = "0" + thour;
    }
    if (tmin >= 10) {
        tml = "" + tmin;
    }
    else {
        tml = "0" + tmin;
    }
    if (tsec >= 10) {
        tsl = "" + tsec;
    }
    else {
        tsl = "0" + tsec;
    }
}

function inputmodify(){
    thour = hour.value;
    tmin = min.value;
    tsec = sec.value;
    if (!exp.test(thour)) {
        thour = "0";
    }
    if (!exp.test(tmin)) {
        tmin = "0";
    }
    if (!exp.test(tsec)) {
        tsec = "0";
    }
    thour = parseInt(thour);
    tmin = parseInt(tmin);
    tsec = parseInt(tsec);
    if (thour < 0) {
        thour = 0;
    }
    if (tmin < 0) {
        tmin = 0;
    }
    if (tmin > 59) {
        tmin = 59;
    }
    if (tsec < 0) {
        tsec = 0;
    }
    if (tsec > 59) {
        tsec = 59;
    }
}  

function outlooktrans(){
    timeinc.style.display = "none";
    timedec.style.display = "none";
    pauset.style.display = "block";
    resumet.style.display = "none";
    cleart.style.display = "block";
    restartt.style.display = "block";
    hintt.style.width = "167px";
    hintt.style.display = "block";
    hour.style.display = "none";
    min.style.display = "none";
    sec.style.display = "none";
    hourlabel.style.display = "none";
    minlabel.style.display = "none";
    seclabel.style.display = "none";
}

function incover(){
        count = 3;
        hintt.innerHTML = "正计时 " + thl + ":" + tml + ":" + tsl + " 已结束";
        pauset.style.display = "none";
        resumet.style.display = "none";
        hintt.style.width = "192px";
        hintt.style.display = "block";
}

function timeincclick() {
    timeinc.blur();
    count = 0;
    timer2 = 1;
    rhour = 0;
    rmin = 0;
    rsec = 0;
    inputmodify();
    totalcontrol();
    hintt.innerHTML = "正在正计时 " + thl + ":" + tml + ":" + tsl;
    cleart.value = "清空正计时";
    outlooktrans();
    if (tsec === 0 && tmin === 0 && thour === 0) { incover(); }
    else {
        time1 = Date.now();
        if (tsec === 0 && tmin === 0 && thour === 0) {
            incover();
        }
        else {
            timer1 = setTimeout("timeup();", 1000);
        }
    }
}

function timedecclick() {
    timedec.blur();
    count = 0;
    timer2 = 0;
    inputmodify();
    rhour = thour;
    rmin = tmin;
    rsec = tsec;
    totalcontrol();
    hintt.innerHTML = "正在倒计时 " + thl + ":" + tml + ":" + tsl;
    cleart.value = "清空倒计时";
    outlooktrans();
    time1 = Date.now();
    timedown();
}

function timeup() {
    if (++rsec === 60) {
        rsec = 0;
        if (++rmin === 60) {
            rhour++;
        }
    }
   timercontrol();
   if (rsec !== tsec || rmin !== tmin || rhour !== thour) { 
       if (tsec === 0 && tmin === 0 && thour === 0) {
           incover();
       }
       else {
           timer1 = setTimeout("timeup();", 1000);
       }
}
   else {
       incover();
   }
}

function timedown() {
    if (rhour === 0 && rmin === 0 && rsec === 0) {
        count = 3;
        hintt.innerHTML = "倒计时 " + thl + ":" + tml + ":" + tsl + " 已结束";
        pauset.style.display = "none";
        resumet.style.display = "none";
        hintt.style.width = "192px";
        hintt.style.display = "block";
    }
    else {
        if (rsec === 0){
            rsec = 59;
            if (rmin === 0) {
                rmin = 59;
                rhour--;
            }
            else {
                rmin--;
            }
        }
        else {
            rsec--;
        }
        timercontrol();
        timer1 = setTimeout("timedown();", 1000);
    }
}

function pauseclick() {
    pauset.blur();
    count = 1;
    time2 = Date.now();
    clearTimeout(timer1);
    clearTimeout(time2);
    pauset.style.display = "none";
    resumet.style.display = "block";
    if (timer2 === 0) {
        hintt.innerHTML = "暂停倒计时 " + thl + ":" + tml + ":" + tsl;
        hintt.style.width="167px";
    }
    else {
        hintt.innerHTML = "暂停正计时 " + thl + ":" + tml + ":" + tsl;
        hintt.style.width = "167px";
    }
}

function clearclick() {
       location.reload();
}

function restartclick() {
    count = 0;
    time1 = Date.now();
    clearTimeout(timer1);
    clearTimeout(time2);
    pauset.style.display = "block";
    resumet.style.display = "none";
    timet.innerHTML = "00:00:00";
    restartt.blur();
    if (timer2 === 0) {
        hintt.innerHTML = "正在倒计时 " + thl + ":" + tml + ":" + tsl;
        hintt.style.width = "167px";
        rhour = thour;
        rmin = tmin;
        rsec = tsec;
        timedown();
    }
    else {
        hintt.innerHTML = "正在正计时 " + thl + ":" + tml + ":" + tsl;
        hintt.style.width = "167px";
        rhour = 0;
        rmin = 0;
        rsec = 0;
        if (tsec === 0 && tmin === 0 && thour === 0) {
            incover();
        }
        else {
            timer1 = setTimeout("timeup();", 1000);
        }
    }
}

function resumeclick() {
    resumet.blur();
    count = 0;
    pauset.style.display = "block";
    resumet.style.display = "none";
    if (timer2 === 0) {
        hintt.innerHTML = "正在倒计时 " + thl + ":" + tml + ":" + tsl;
        hintt.style.width = "167px";
        timer1=setTimeout("timedown();", 1000 - (time2 - time1) % 1000);
    }
    else {
        hintt.innerHTML = "正在正计时 " + thl + ":" + tml + ":" + tsl;
        hintt.style.width = "167px";
        timer1 = setTimeout("timeup();", 1000 - (time2 - time1) % 1000);
    }
}