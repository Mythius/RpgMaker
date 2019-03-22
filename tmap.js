var db=openDatabase('storage','1.0','storage',1024*2*2);
db.runSQL('SELECT * FROM Files',function(e){
    for(let i=0;i<e.rows.length;i++){
        var b=document.createElement('button');
        b.innerHTML=e.rows[i].name;
        b.on('click',function(){
            doStuff(e.rows[i].value,e.rows[i].name.split('.')[0],e.rows[i].name.split('.')[1]);
            if(e.rows[i].name.split('.')[1]=='tile') this.disabled=true;
        });
        obj('div1').appendChild(b);
    }
});
addStuff();
var obid,obisc=true;
var gmap;
var coords=[];
var ttt=[];
var xmap;
var correlation=[];
function doStuff(data,name,fileExtension){
var d=data.split('`');
var width=Number(d[0]);
var height=Number(d[1]);
if(fileExtension=='map'){
    var map=obj('map');
    xmap=name+'.'+fileExtension+'*'+data;
    map.innerHTML='';
    gmap = new Grid(map,width,height,30);
    var mapdata={width:width,height:height,data:[]};
    var dt = gmap.getTiles();
    for(let i=3;i<d.length;i++){
        mapdata.data.push(d[i]);
    }
    gmap.importColors(mapdata,0,0);
    for(let i=0;i<height;i++){
        for(let j=0;j<width;j++){
            gmap.getTile(j+1,i+1).on('click',function(){
                if(this.style.dipslay!='grid'){
                    var color=this.style.backgroundColor;
                       if(obisc){
                           if(obid) obid.style.backgroundColor=color;
                       } else {
                           if(obid){
                               coords.push({x:j+1,y:i+1});
                               obj('cor').innerHTML+='X: '+(j+1)+' Y: '+(i+1)+'<br>';
                           }
                       }
                   }
               });
           }
       }
   } else if(fileExtension=='tile'){
       var a=document.createElement('div');
       ttt.push(name+'.'+fileExtension+'*'+data);
       a.innerHTML='<h3>'+name+'</h3>Color:';
       var c=document.createElement('color');
       c.on('click',function(){
           obisc=true;
           obid=this;
       });
       a.appendChild(c);
       obj('bottom').appendChild(a);
       var b=document.createElement('button');
       b.innerHTML='Replace with Tile';
       b.on('click',function(){
           if(gmap){
               var tiledata={width:width,height:height,data:[]};
               for(let i=2;i<d.length;i++){
                   tiledata.data.push(d[i]);   
               }
               var dt=gmap.getTiles();
               correlation.push({a:name,b:this.parentElement.querySelector('color').style.backgroundColor});
               if(true){
                   for(let i=0;i<dt.length;i++){
                       var cn=b.parentElement.querySelector('color').style.backgroundColor;
                       if(dt[i].style.backgroundColor==cn&&cn!=''&&dt[i].style.display!='grid'){
                            debugger;
                           var gTile = new Grid(dt[i],width,height,dt[i].offsetWidth/width);
                           gTile.importColors(tiledata,0,0);
                       }
                   }
               }
           }
       });
       a.appendChild(b);
    } else {
        alert('File Extension '+fileExtension+' has not been implemented');   
    }
}
function addStuff(){
    obj('#ent').on('click',function(){
        obid=true;
        obisc=false;
    });
    obj('#era').on('click',function(){
        obj('cor').innerHTML='';
        coords=[];
    });
    obj('#done').on('click',function(){
        obid=false;
    });
}
obj('#xmap').on('click',function(){
    if(obj('#name').value.length!=0){
        var name=obj('#name').value+'.tmap';
        var file=xmap;
        for(let i=0;i<ttt.length;i++){
            file+='~'+ttt[i];
        }
        var cor=correlation[0].a+'.'+correlation[0].b;
        for(let i=1;i<correlation.length;i++){
            cor+='`'+correlation[i].a+'.'+correlation[i].b;
        }
        var coor=coords[0].x+'.'+coords[0].y;
        for(let i=1;i<coords.length;i++){
            coor+=','+coords[i].x+'.'+coords[i].y;   
        }
        var official=file+'_'+cor+'_'+coor;
        db.runSQL('INSERT INTO Files ( name , value ) VALUES ("'+name+'","'+official+'")');
        setTimeout(function(){
            location.href='index.html';
        },100);
    }
});