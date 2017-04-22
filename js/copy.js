

function copyToClipboard() {
  var $temp = $("<input>")
  $("body").append($temp);
  var filename = document.getElementById('fileupload').value;
  filename = filename.replace(/.*[\/\\]/, '');
  filename = filename.replace(/\.csv/, '')
  console.log(filename);
  $temp.val(filename).select();
  // console.log(filename);
  document.execCommand("copy");
  $temp.remove();
}
