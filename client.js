let socket = io();
let addModal = document.querySelector("#addModal");

let closeModalButton = document.querySelector("#close");
closeModalButton.addEventListener("click", () => {
    if(addModalAnimation.interval != null) {
        window.clearInterval(addModalAnimation.interval);
        addModalAnimation.interval = null;
    }

    addModalAnimation.animateReverse();
})

let searchResultsContainer = document.querySelector("#results");
let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", () => {
    searchResultsContainer.style.display = "flex";
    addModalSearchResultsAnimation.animate();   
})

let addSongContainer = document.querySelector("#addSongContainer");
addSongContainer.addEventListener("click", () => {
    searchResultsContainer.style.display = "none";    
    addModal.style.display = "flex";  
    addModalAnimation.animate();
})

addModalAnimation = {
    elem: addModal,
    opacity: {
        init: 0,
        value: 0,
        change: 0.02,
        total: 1
    },
    marginTop: {
        init: -50,
        value: 0,
        change: 1,
        total: 0
    },
    // ms between updates
    speed: 60 / 1000,
    interval: null,
    animate: () => {
        let ref = addModalAnimation;
        
        ref.opacity.value = ref.opacity.init;
        ref.elem.style.opacity = ref.opacity.value.toString();
        
        ref.marginTop.value = ref.marginTop.init;
        ref.elem.style.marginTop = ref.marginTop + "em";
        
        ref.interval = window.setInterval(() => {
            ref.opacity.value += ref.opacity.change;
            ref.marginTop.value += ref.marginTop.change;
            
            if(ref.opacity.value >= ref.opacity.total) {
                ref.opacity.value = ref.opacity.total;
                ref.marginTop.value = ref.marginTop.total;
                window.clearInterval(ref.interval);
                ref.interval = null;
            }
            
            ref.elem.style.opacity = ref.opacity.value.toString();
            ref.elem.style.marginTop = ref.marginTop.value + "em";
        }, ref.speed);
    },
    animateReverse: () => {
        let ref = addModalAnimation;
        
        ref.opacity.value = ref.opacity.total;
        ref.elem.style.opacity = ref.opacity.value.toString();
        
        ref.marginTop.value = ref.marginTop.total;
        ref.elem.style.marginTop = ref.marginTop + "em";
        
        ref.interval = window.setInterval(() => {
            ref.opacity.value -= ref.opacity.change;
            ref.marginTop.value -= ref.marginTop.change;
            
            if(ref.opacity.value <= ref.opacity.init) {
                ref.opacity.value = ref.opacity.init;
                ref.marginTop.value = ref.marginTop.init;
                window.clearInterval(ref.interval);
                ref.interval = null;
                ref.elem.style.display = "none";
            }
            
            ref.elem.style.opacity = ref.opacity.value.toString();
            ref.elem.style.marginTop = ref.marginTop.value + "em";
        }, ref.speed);
    }
}

addModalSearchResultsAnimation = {
    elem: searchResultsContainer,
    maxHeight: {
        init: 0,
        value: 0,
        change: 10,
        total: 500
    },
    // ms between updates
    speed: 60 / 1000,
    interval: null,
    animate: () => {
        let ref = addModalSearchResultsAnimation;
        
        ref.maxHeight.value = ref.maxHeight.init;
        ref.elem.style.maxHeight = ref.maxHeight.value + "px";
        
        ref.interval = window.setInterval(() => {
            ref.maxHeight.value += ref.maxHeight.change;
            
            if(ref.maxHeight.value >= ref.maxHeight.total) {
                ref.maxHeight.value = ref.maxHeight.total;
                window.clearInterval(ref.interval);
                ref.interval = null;
            }
            
            ref.elem.style.maxHeight = ref.maxHeight.value + "px";
        }, ref.speed);
    }
}