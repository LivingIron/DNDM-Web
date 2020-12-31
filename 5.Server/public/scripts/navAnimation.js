
let navbar=document.getElementsByClassName("navigation");
let lastScrollTop=window.pageYOffset;
document.addEventListener('scroll',  () => {
    let currentScrollpos=window.pageYOffset;
    if(lastScrollTop < currentScrollpos){
         navbar[0].style.top = "-50px";
    }
    else{
       navbar[0].style.top = "0px";
    }
    lastScrollTop=currentScrollpos;
    
}, { passive: true });
