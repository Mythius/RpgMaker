var db=openDatabase('storage','1.0','File Storage',10*1024*1024);
db.runSQL('CREATE TABLE Files ( name varchar(15), value varchar(999))');
if(location.href.indexOf('?')!=-1){
    var s = location.href.split('?')[1];
    var name = s.split('_')[0];
    var value = s.split('_')[1];
    var string='INSERT INTO Files ( name , value ) VALUES (\"'+ name +'\",\"'+value+'\")';
    db.runSQL(string);
    setTimeout(function(){location.href=location.href.split('?')[0];},100);
    document.write('<h1>Saving.........</h1');
} else {
       
}
function readTile(sqlo){
    var o={width:0,height:0,data:[]};
    var p=sqlo.value.split('`');
    for(let i=2;i<p.length;i++){
        o.data[i-2]=p[i];
    }
    o.width=Number(p[0]);
    o.height=Number(p[1]);
    return o;
}