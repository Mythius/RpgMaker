var jGrid = function(obj,x,y,w,h,t){
    var size = w*h;
    var data=[];
    for(let i=0;i<h;i++){
        for(let j=0;j<w;j++){
            var e= document.createElement('tile');
            data.push(e);
            e.style.position='absolute';
            e.style.width=t+'px';
            e.style.height=t+'px';
            obj.appendChild(e);
            e.style.left=x+t*j+'px';
            e.style.top=y+t*i+'px';
            e.style.backgroundColor=rColor();
            e.classList.add('tt');
        }
    }
    function pos(x,y){
        return  y*w-w-1+x;
    }
    function isInBounds(x,y){
        return x>0&&y>0&&x<=w&&y<=h;   
    }
    this.getColor=function(x,y){
        if(isInBounds(x,y)){
            return data[pos(x,y)].style.backgroundColor;
        } else return 'out';
    };
    this.getImage=function(x,y){
        if(isInBounds(x,y)){
            return data[pos(x,y)].style.backgroundImage;
        } else return 'out';
    };
    this.setColor=function(x,y,c){
        if(isInBounds(x,y)){
            data[pos(x,y)].style.backgroundColor=c;
        }
    };
    this.getTile=function(x,y){
        if(isInBounds(x,y)){
            return data[pos(x,y)];
        } else return 'out';
    };
    this.setImage=function(x,y,path){
        if(isInBounds(x,y)){
            data[pos(x,y)].style.backgroundImage='url('+path+')'; 
        }
    };
    this.setColorAll=function(c){
        for(let i=0;i<data.length;i++){
            data[i].style.backgroundColor=c;   
        }
    };
    this.setImageAll=function(p){
        for(let i=0;i<data.length;i++){
            data[i].style.backgroundImage='url('+p+')';   
        }
    };
    this.importColors=function(array,x,y,d){
        function pos2(x2,y2){
               return y2*array.width-array.width-1+x2;
        }
        function isInBounds2(a,b){
            return (a>0&&b>0&&a<=array.width&&b<=array.height);
        }
        for(let i=1;i<=w;i++){
            for(let j=1;j<=h;j++){
                if(isInBounds2(i+x,j+y)){
                    this.setColor(i,j,array.data[pos2(i+x,j+y)]);
                } else {
                    this.setColor(i,j,d);   
                }
            }
        }
    };
    this.importImages=function(array,x,y,d){
        function pos2(x2,y2){
               return y2*width-width-1+x2;
        }
        function isInBounds2(a,b){
            return (a>0&&b>0&&a<=array.width&&b<=array.height);
        }
        for(let i=1;i<=w;i++){
            for(let j=1;j<=h;j++){
                if(isInBounds2(i+x,j+y)){
                    this.setImage(i,j,array.data[pos2(i+x,j+y)]);
                } else {
                    this.setImage(i,j,d);   
                }
            }
        }
    };
    this.getData=function(){
        return data;   
    }
    this.width=function(){
        return w;   
    }
    this.height=function(){
        return h;   
    }
};