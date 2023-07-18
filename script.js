
$(document).ready(function () {  // jdoc ready use kiya h 

    let cellContainer = $(".input-cell-container");
    for(let i=1;i<=100;i++){
    let ans="";

    let n=i;
    
    while(n>0){
        let rem=n%26;
        if(rem==0){
            ans="Z" + ans;
            n=Math.floor(n / 26)-1;
        }else{
            ans=String.fromCharCode(rem-1+65)+ans ;
            n=Math.floor(n/26);
        }
    }
   
    let column = $(`<div class="column-name colId-${i}" id="colCod-${ans}">${ans}</div>`) ; // 
  $(".column-name-container").append(column) // html m jo column ha vha chla ja aa ga 
  let row = $(`<div class="row-name" id="rowId-${i}">${i}</div>`);
  $(".row-name-container").append(row);
}

for(let i=1;i<=100;i++){
    let row = $(`<div class="cell-row"></div>`); // 1 ka side m jo key h vo use hoti ha 
    for(let j=1;j<=100;j++){
        let colCode = $(`.colId-${j}`).attr("id").split("-")[1];
        let column = $(`<div class="input-cell" contenteditable="true" id= "row-${i}-col-${j}" data="code-${colCode}"></div>`)
         row.append(column);
    }
    $(".input-cell-container").append(row);
}



$(".align-icon").click(function(){
    $(".align-icon.selected").removeClass("selected");  // purani vala icon sa hta aa ga light gray color
    $(this).addClass("selected");  // jha par cursor lga aa ga vhi show kra ga 
})

$(".style-icon").click(function(){
    $(this).toggleClass("selected");
});

$(".input-cell").click(function(e){
    // means ctrl key dabai h 
    if(e.ctrlKey){
        let[rowId,colId]= getRowCol(this);
          if(rowId>1) {
        let topCellSelected = $(`#row-${rowId-1}-col-${colId}`).hasClass("selected");
         if(topCellSelected){
             $(this).addClass("top-cell-selected");
             $(`#row-${rowId-1}-col-${colId}`).addClass("bottom-cell-selected");
         }}
                   
              if(rowId < 100) {
                let bottomCellSelected = $(`#row-${rowId+1}-col-${colId}`).hasClass("selected");
                if(bottomCellSelected) {
                    $(this).addClass("bottom-cell-selected");
                    $(`#row-${rowId+1}-col-${colId}`).addClass("top-cell-selected");
                }
            }
            if(colId > 1) {
                let leftCellSelected = $(`#row-${rowId}-col-${colId-1}`).hasClass("selected");
                if(leftCellSelected) {
                    $(this).addClass("left-cell-selected");
                    $(`#row-${rowId}-col-${colId-1}`).addClass("right-cell-selected");
                }
            }
            if(colId < 100) {
                let rightCellSelected = $(`#row-${rowId}-col-${colId+1}`).hasClass("selected");
                if(rightCellSelected) {
                    $(this).addClass("right-cell-selected");
                    $(`#row-${rowId}-col-${colId+1}`).addClass("left-cell-selected");
                }
            }

    }
    else{
    $(".input-cell.selected").removeClass("selected");
   // $(this).addClass("selected");
     }
     $(this).addClass("selected");
     changeHeader(this);

});

$(".input-cell").dblclick(function(){  
    $(".input-cell.selected").removeClass("selected");
    $(this).addClass("selected");
    $(this).attr("contenteditable","true");
    $(this).focus();
});


$(".input-cell-container").scroll(function(){
   // console.log(this.scrollLeft); // isa data ka pta chlta ha
    $(".column-name-container").scrollLeft(this.scrollLeft);  // isa necha scroll kra ga to uppr ka a b c d bhi scroll ho ga 
    $(".row-name-container").scrollTop(this.scrollTop); // isa  1 2 3 4 ya scroll ho aa ga 
})


});

function getRowCol(ele){                                              // 0     1   2     3              
    let idArray = $(ele).attr("id").split("-"); // array bna da ga jispa row - 1 - col - 1  
    let rowId = parseInt(idArray[1]);
    let colId = parseInt(idArray[3]);
    return [rowId,colId];
}
// try to give (bold,italic)property to the cell 
function updateCell(property,value){
   $(ele).css(property,value);
}
   