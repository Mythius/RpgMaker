function obj(id){return document.querySelector(id);}
function random(min,max){return Math.floor(min+Math.random()*(max-min+1));}
function rColor(){return 'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';}
function show(id){obj(id).style.visibility=null;}
function hide(id){obj(id).style.visibility='hidden';}
function download(filename,text){
    var e=document.createElement('a');
    e.href='data:text/plain;charset=utf-8,'+encodeURIComponent(text);
    e.download=filename;
    e.style.display='none';
    document.body.appendChild(e);
    e.click();
    document.body.removeChild(e);
}
function upload(inputObject,fn) {
    inputObject.addEventListener('change',function(ev){
        for(let i=0;i<ev.target.files.length;i++){
            var f=ev.target.files[i];
            if(f){
                var r=new FileReader();
                r.readAsText(f);
                r.onload=function(e) {
                    var c=e.target.result;
                    var co=c.split('\n');
                    fn(co,inputObject.files[i].name);
                };
            }
        }
    });
}
function xml(f,fn){
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if(this.readyState==4&&this.status==200) {
            fn(this.responseText);
        }   
    };
    xmlhttp.open("GET",f,true);
    xmlhttp.send();
}
function distanceBetween(x,y,x1,y1){
    return Math.round(Math.sqrt(Math.pow(x-x1,2)+Math.pow(y-y1,2)));   
}
Object.prototype.on=function(a,b,c){this.addEventListener(a,b,c)};
Object.prototype.runSQL=function(com,cal){
    this.transaction(function(tx){
        if(typeof cal == 'function'){
            tx.executeSql(com,undefined,function(t,r){
                setTimeout(function(){
                cal(r);
                },1);
            });
        } else {
            tx.executeSql(com);   
        }   
    });
};
Array.prototype.contains=function(c){
    return this.indexOf(c)!=-1;    
};
function save(s){
    location.href='index.html?'+s;
}