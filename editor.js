var a;
var grid_size=Number(obj('#size').value);
var isGrid=false;
var anim=true;
var color;
var mousedown=false;
var isColor=true;
var cols=[];
var objto='#color';
var checks=[];
function setPos(x,y){
    if(isGrid){
        for(let i=0;i<a.getData().length;i++){
                a.getData()[i].style.left=a.getData()[i].offsetLeft+x+'px';
                a.getData()[i].style.top=a.getData()[i].offsetTop+y+'px';
        }
    }
}
function resetPos(){
    if(isGrid){
	var dx=a.getData()[0].offsetLeft;
	var dy=a.getData()[0].offsetTop;
	setPos(-dx,-dy);
    }
}
obj('#setSize').on('click',function(){
    resetPos();
    grid_size=Number(obj('#size').value);
    obj('game').style.backgroundSize=grid_size+'px';
    setTimeout(function(){setPos(grid_size*2,grid_size*2)},200);
});
document.on('keydown',function(e){
    var handled=false;
    if(anim&&isGrid){
        switch(e.keyCode){
            case 87: setPos(0,-grid_size); handled=true; break;
            case 83: setPos(0,grid_size); handled=true; break;
            case 65: setPos(-grid_size, 0); handled=true; break;
            case 68: setPos(grid_size,0); handled=true; break;
        }
    }
    if(handled){
        anim=false;
        setTimeout(function(){anim=true},200);
    }
});
obj('#align').on('click',function(){resetPos();});
obj('#newBoard').on('click',function(){
    if(a){
        hitboxes=[];
        checks=[];
        
        for(let i=0;i<a.getData().length;i++){
            a.getData()[i].remove();
        }
    }
    a=new jGrid(obj('game'),0,0,prompt("Grid width"),prompt('Grid height'),grid_size);
    isGrid=true;
    for(let i=0;i<a.getData().length;i++){
	a.getData()[i].on('mousemove',function(){
	    if(mousedown)
		 if(isColor) this.style.backgroundColor=color; 
	});
	a.getData()[i].on('mousedown',function(){
	    if(isColor){
            this.style.backgroundColor=color;
        } else {
            color=this.style.backgroundColor;
            if(objto){
                obj(objto).style.backgroundColor=color;
            }
            if(cont){
                isColor=true;
            } else {
                thiscolor=color;
            }
        }
	});
    }
});
obj('#fill').on('click',function(){
    if(isGrid){
	a.setColorAll(color?color:prompt("Fill with Color"));   
    }
});
obj('#color').on('click',function(){
    isColor=true;
    var temp=prompt("Set Color");
    if(temp!=''){
  	color=temp;
    	this.style.backgroundColor=color;
    }
});
document.on('mousedown',function(){mousedown=true;});
document.on('mouseup',function(){mousedown=false;});
obj('#eyedropper').on('click',function(){
    isColor=false;
    cont=true;
    objto='#color';
});
var open=false;
var cont=true;
var thiscolor='';

function addBoxEvents(){
    if(false){
        isColor=false;
        for(let i=0;i<a.getData().length;i++){
            a.getData()[i].addEventListener('click',function(){
                
            });
        }
    }
}
var hitboxes=[];

obj('#collision').querySelector('img').on('click',function(){
    if(isGrid){
        var c=document.createElement('color');
        var apply=document.createElement('button');
        apply.innerHTML='Apply';
        apply.addEventListener('click',function(){
            if(thiscolor!=''){
                if(checks.length==0){
                    addChecks();
                    for(let i=0;i<checks.length;i++){
                        if(a.getData()[i].style.backgroundColor==thiscolor){
                            checks[i].checked=true;   
                        }
                    }
                }
            } else alert('Please Select a color');
        });
        var box=document.createElement('box');
        box.innerHTML+='Solid Color:&nbsp;&nbsp;';
        box.appendChild(c);
        addColor('color');
        box.innerHTML+='<br>';
        box.appendChild(apply);
        var data=a.getData();
        if(!open){
            isColor=false;
            this.parentElement.classList.add('open');
            open=true;
            this.parentElement.appendChild(box);
            if(hitboxes.length!=0){
                var data=a.getData();
                for(let i=0;i<data.length;i++){
                    var cb=document.createElement('input');
                    cb.type='checkbox';
                    if(hitboxes[i]=='1'){
                        cb.checked=true;   
                    }
                    data[i].appendChild(cb);
                    checks.push(cb);
                }
            }
        } else {
            for(let i=0;i<checks.length;i++){
                hitboxes.push(checks[i].checked?'1':'0');   
            }
            isColor=true;
            this.parentElement.classList.remove('open');
            open=false;
            addChecks();
            this.parentElement.querySelector('box').remove();
            for(let i=0;i<checks.length;i++){
                checks[i].remove();   
            }
            objto='#color';
            checks=[];
        }
    }
    function addChecks(){
        for(let i=0;i<data.length;i++){
            var c=document.createElement('input');
            c.type='checkbox';
            data[i].appendChild(c);
            checks.push(c);
        }
    }
    function addColor(n){
        thiscolor='';
        objto=n;
        cont=false;
    }
});



obj('#imgx').on('click',function(){
    if(isGrid){
        if(obj('#name').value!=""){
            var file=a.width()+'`'+a.height();
            var data=a.getData();
            for(let i=0;i<data.length;i++){
                file+='`'+data[i].style.backgroundColor.replace(/ /gi,'');
            }
            save(obj('#name').value+'.tile_'+file);
        } else {
            alert("File Name Required (do not add an extension)");
            obj('#name').focus();
        }
    }
});

obj('#mapx').on('click',function(){
    if(isGrid){
        if(hitboxes.length!=0){
            if(obj('#name').value!=""){
                var file=a.width()+'`'+a.height()+'`';
                var data=a.getData();
                for(let i=0;i<hitboxes.length;i++){
                    file+=hitboxes[i];   
                }
                for(let i=0;i<data.length;i++){
                    file+='`'+data[i].style.backgroundColor.replace(/ /gi,'');   
                }
                save(obj('#name').value+'.map_'+file);
            } else {
                alert("File Name Required (do not add an extension)");
                obj('#name').focus(); 
            }
        } else alert('Add Collisions to export as a map');
    }
});