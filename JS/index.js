
  function w3_open() {
    document.getElementById("main").style.marginLeft = "25%";
    document.getElementById("mySidebar").style.width = "25%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("mySidebar").style.float="left"
    document.getElementById("openNav").style.display = 'none';
    document.getElementById("closeNav").style.display = 'block';
    document.getElementById("logoImg").style.display = 'none';
  }
  function w3_close() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
    document.getElementById("closeNav").style.display = 'none';
    document.getElementById("logoImg").style.display = 'block';
  }
