var buttons=document.querySelectorAll('button');
//nav------------------
buttons[0].on('click',function(){
    location.href='editor.html';
});
buttons[1].on('click',function(){
    location.href='tmap.html';
});
buttons[3].on('click',function(){
    location.href='compiler.html';   
});
buttons[4].on('click',resetSQL);

//files---------------------
db.runSQL('SELECT * FROM Files',function(e){
    var rows=e.rows;
    if(rows.length==0){
        createLI('<em>You don\'t have any files yet<em>');
    } else {
        for(let i=0;i<rows.length;i++){
            createLI(rows[i].name,rows[i].value,i+1);
        }
    }   
});
function createLI(name,data,n){
    var li=document.createElement('li');
    li.innerHTML=name;
    if(data){
        var p=data.split('`');
        var width=Number(p[0]);
        var height=Number(p[1]);
        if(name.split('.')[1]=='tile'){
            var s=document.createElement('div');
            var g=new Grid(s,width,height,20);
            li.appendChild(s);
            var d=[];
            for(let i=2;i<p.length;i++){
                d.push(p[i]);   
            }
            g.importColors({width:width,height:height,data:d},0,0);
        } else if(name.split('.')[1]=='map'){
            var s=document.createElement('div');
            var g=new Grid(s,width,height,20);
            li.appendChild(s);
            var d=[];
            for(let i=3;i<p.length;i++){
                d.push(p[i]);   
            }
            g.importColors({width:width,height:height,data:d},0,0);
        } else {
            li.innerHTML+='<br><em>Cannot display this Filetype</em>';   
        }
        var button=document.createElement('button');
        button.innerHTML='DELETE (cannot be undone)';
        button.on('click',function(){
            db.runSQL('DELETE FROM Files WHERE rowid = '+n+';');
            setTimeout(function(){location.reload();},50);
        });
        li.innerHTML+='<br>';
        li.appendChild(button);
        var b2 = document.createElement('button');
        b2.innerHTML='Download';
        b2.on('click',function(){
            download(name,data);
        });
        li.appendChild(b2);
    }
    obj('ol').appendChild(li);
}
function resetSQL(){
    var msq=[];
    db.runSQL('SELECT * FROM Files',function(e){
        for(let i=0;i<e.rows.length;i++){
            msq.push({a:e.rows[i].name,b:e.rows[i].value});   
        }
    });
    setTimeout(function(){db.runSQL('DELETE FROM Files');},100);
    setTimeout(function(){
        for(let i=0;i<msq.length;i++){
            db.runSQL('INSERT INTO Files ( name , value ) VALUES ( "'+msq[i].a+'" , "'+msq[i].b+'" )');   
        }
    },200);
    document.write('Resetting SQL');
    setTimeout(function(){
        location.reload();
    },300);
}
upload(obj('#upload'),function(e,n){
    db.runSQL('INSERT INTO Files ( name , value ) VALUES ( "'+n+'","'+e+'")');
    setTimeout(function(){location.reload();},100);
});