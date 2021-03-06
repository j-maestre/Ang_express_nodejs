class homeSliderCtrl {
    constructor() {
        this.myInterval = 5000;
        this.noWrapSlides = false;

        this.slides = [ {image:'/images/bingo3.png',text:"Get funding for your code projects.",id:0},
                    {image:'/images/bingo1.png',text:"Supports other projects to keep the community growing.",id:1},
                    {image:'/images/bingo2.png',text:"Other users can do the code you don't know how to do.",id:2}];

    }
}

let homeSlider = {
    controller: homeSliderCtrl,
    templateUrl: 'home/homeSlider.html' 
}; 

export default homeSlider; 