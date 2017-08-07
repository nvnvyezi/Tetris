var game1 = (function (){
    var tbl = document.getElementById('area');
    function ctr(){
        var tr = document.createElement('tr');
        ctd(tr);
        if(tbl.firstChild == null){
             tbl.insertBefore(tr);
        }else {
            tbl.appendChild(tr);
        }
    }
    function ctd(str){
        for(var i=0;i<10;i++){
            var td =document.createElement('td');
            str.appendChild(td);
        }
    }
    function init(){
        for (var i = 0; i < 18; i++) {
            ctr();
        }
    }
    var status = 0,timer = null,score = 0;
    var area = new Array(18);
    for (var i = 0; i < 18; i++) {
        area[i] = new Array(10);
    }
    for (var i = 0; i < 18; i++) {
        for (var j = 0; j < 10; j++) {
            area[i][j] = 0;
        }
    }
    //检查格子是否合法
    function isCellValid(x,y){
        if(x>17||x<0||y>9||y<0){
            return false;
        }
        if(area[x][y] == 1){
            return false;
        }
        return true;
    }
    //当前活动方块
    var activeBlock = null;
    //产生快的形状
    function generateBlock(){
        activeBlock = new Array(4);
        var t = Math.floor(Math.random()*7);
        switch(t){
            case 0:{
                activeBlock[0] = {x:0, y:4};
                activeBlock[1] = {x:1, y:4};
                activeBlock[2] = {x:0, y:5};
                activeBlock[3] = {x:1, y:5};
                break;
            }
            case 1:{
                activeBlock[0] = {x:0, y:3};
                activeBlock[1] = {x:0, y:4};
                activeBlock[2] = {x:0, y:5};
                activeBlock[3] = {x:0, y:6};
                break;
            }
            case 2:{
                activeBlock[0] = {x:0, y:5};
                activeBlock[1] = {x:1, y:4};
                activeBlock[2] = {x:1, y:5};
                activeBlock[3] = {x:2, y:4};
                break;
            }
            case 3:{
                activeBlock[0] = {x:0, y:4};
                activeBlock[1] = {x:1, y:4};
                activeBlock[2] = {x:1, y:5};
                activeBlock[3] = {x:2, y:5};
                break;
            }
            case 4:{
                activeBlock[0] = {x:0, y:4};
                activeBlock[1] = {x:1, y:4};
                activeBlock[2] = {x:1, y:5};
                activeBlock[3] = {x:1, y:6};
                break;
            }
            case 5:{
                activeBlock[0] = {x:0, y:4};
                activeBlock[1] = {x:1, y:4};
                activeBlock[2] = {x:2, y:4};
                activeBlock[3] = {x:2, y:5};
                break;
            }
            case 6:{
                activeBlock[0] = {x:0, y:5};
                activeBlock[1] = {x:1, y:4};
                activeBlock[2] = {x:1, y:5};
                activeBlock[3] = {x:1, y:6};
                break;
            }
        }
        for (var i = 0; i < 4; i++) {
            if(!isCellValid(activeBlock[i].x,activeBlock[i].y)){
                return false;
            }
        }
        return true;
    }
    //检查左边界
    function checkleftborder(){
        for (var i = 0; i < activeBlock.length; i++) {
            if(activeBlock[i].y == 0){
                return false;
            }
            if(!isCellValid(activeBlock[i].x,activeBlock[i].y-1)){
                return false;
            }
        }
        return true;
    }
    //检查有边界
    function checkrightborder(){
        for (var i = 0; i < activeBlock.length; i++) {
            if(activeBlock[i].y == 9){
                return false;
            }
            if(!isCellValid(activeBlock[i].x,activeBlock[i].y+1)){
                return false;
            }
        }
        return true;
    }
    //检查地步
    function checkbottomborder(){
        for (var i = 0; i < activeBlock.length; i++) {
            if(activeBlock[i].x == 17){
                return false;
            }
            if(!isCellValid(activeBlock[i].x+1,activeBlock[i].y)){
                return false;
            }
        }
        return true;
    }
    //擦出
    function erase(){
        for(var i=0;i<4;i++){
            tbl.rows[activeBlock[i].x].cells[activeBlock[i].y].style.backgroundColor = '#fff';
        }
    }
    //绘图
    function paint(){
        for (var i = 0; i < 4; i++) {
            tbl.rows[activeBlock[i].x].cells[activeBlock[i].y].style.backgroundColor = "red";
        }
    }
    //更新area数组
    function updatearea(){
        for (var i = 0; i < 4; i++) {
            area[activeBlock[i].x][activeBlock[i].y] =1;
        }
    }
    //消航
    function deleteline(){
        var lines = 0;
        for(var i=0;i<18;i++){
            var j=0;
            for( ;j<10;j++){
                if(area[i][j] == 0){
                    break;
                }
            }
            if(j==10){
                lines++;
                if(i!=0){
                    for(var k=i-1;k>=0;k--){
                        area[k+1] = area[k];
                    }
                }
                area[0]=generateBlankLine();
            }
        }
        return lines;
    }
    //产生新行
    function generateBlankLine(){
        var line = new Array(10);
        for(var i=0; i<10; i++){
            line[i] = 0;
        }
        return line;
    }
    //擦除整个面板
    function erasearea(){
        for(var i=0;i<18;i++){
            for(var j=0;j<10;j++){
                tbl.rows[i].cells[j].style.backgroundColor = '#fff';
            }
        }
    }
    //更新分数
    function updatescore(){
        document.getElementById('score').innerHTML = ' ' + score;
    }
    //重绘整个面板
    function paintarea(){
        for(var i=0;i<18;i++){
            for(var j=0; j<10; j++){
                if(area[i][j]==1){
                    tbl.rows[i].cells[j].style.backgroundColor = "#CC3333"; 
                }
            }
        }
    }
    //向下移动
    function movedown(){
        if(checkbottomborder()){
            erase();
            for(var i=0;i<4;i++){
                activeBlock[i].x = activeBlock[i].x+1;
            }
            paint();
        }else {
            clearInterval((timer));
            updatearea();
            var lines = deleteline();
            if(lines!=0){
                score +=lines*10;
                updatescore();
                erasearea();
                paintarea();
            }
            if(!generateBlock()){
                alert('game over');
                status = 2;
                return;
            }
            paint();
            timer = setInterval(movedown,1000);
        }
    }
    //left
    function moveleft(){
        if(checkleftborder()){
            erase();
            for(var i=0;i<4;i++){
                activeBlock[i].y = activeBlock[i].y-1;
            }
            paint();
        }
    }
    //right
    function moveright(){
        if(checkrightborder()){
            erase();
            for (var i = 0; i < 4; i++) {
                activeBlock[i].y +=1;
            }
            paint();
        }
    }
    //旋转
    function rotate(){
        var tmpblock = new Array(4);
        for (var i = 0; i < 4; i++) {
            tmpblock[i] = {x:0,y:0};
        }
        for(var i=0;i<4;i++){
            tmpblock[i].x = activeBlock[i].x;
            tmpblock[i].y = activeBlock[i].y;
        }
        var cx = Math.round((tmpblock[0].x + tmpblock[1].x + tmpblock[2].x + tmpblock[3].x)/4);
        var cy = Math.round((tmpblock[0].y + tmpblock[1].y + tmpblock[2].y + tmpblock[3].y)/4);
        for(var i=0;i<4;i++){
            tmpblock[i].x = cx +cy -activeBlock[i].y;
            tmpblock[i].y = cy - cx+activeBlock[i].x;
        }
        for(var i=0;i<4;i++){
            if(!isCellValid(tmpblock[i].x,tmpblock[i].y)){
                return;
            }
        }
        erase();
        for(var i=0; i<4; i++){
            activeBlock[i].x = tmpblock[i].x;
            activeBlock[i].y = tmpblock[i].y;
        }
        paint();
    }
    //键盘控制
    function keyControl(){
        if(status!=1){
            return;
        }
        var code = event.keyCode;
        switch(code){
            case 37:{
                moveleft();
                break;
            }
            case 38:{
                rotate();
                break;
            }
            case 39:{
                moveright();
                break;
            }
            case 40:{
                movedown();
                break;
            }
        }
    }
    window.onload = function(){
        init();
    };
    //开始
    var i1 =document.getElementById('i1');
    i1.onclick = function(){
        begin(this);
    };
    function begin(e){
        e.disabled = true;
        status = 1;
        if(!generateBlock()){
            alert("Game over!");
            status = 2;
            return;
        }
        paint();
        timer = setInterval(movedown,1000);
    }
    document.onkeydown=keyControl;
})();