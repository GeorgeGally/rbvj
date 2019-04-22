var cursor = false;

function showMouse(){
  console.log("showMouse");
  cursor = !cursor;
  if(cursor) {
    window.document.body.style.cursor = 'auto';
  } else {
    window.document.body.style.cursor = 'none';
  }
}
