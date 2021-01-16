const $element = document.querySelector('.nabuco');
slick($element);

function slick($element, options){

    const slidesToShow = 3;
    // const slidesToShow = options.slidesToShow;

    const itemRatio = `${(100/slidesToShow).toFixed(5)}%`;


    const $ul = $element.querySelector("ul");
    $ul.style.display = "flex";
    $ul.style.listStyle = "none";
    $ul.style.overflow = "hidden";

    let liArray = [...$ul.querySelectorAll('li')];
    const cloneArray = getCloneToArray(liArray);
    $ul.append(...cloneArray);
    liArray = $ul.querySelectorAll('li');

    liArray.forEach($li => {
        $li.style.position = "relative";
        $li.style.flexShrink = "0";
        $li.style.flexBasis = itemRatio;
    });


}


function getCloneToArray(elementArray){
    return elementArray.map($element => $element.cloneNode(true));
}