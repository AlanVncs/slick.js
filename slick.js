const slickState = {
    $container: null,
    $ul: null,
    slidesTotal: 0,
    slidesToShow: 3,
    slidesToScroll: 2,
    statesTotal: Math.ceil(12/2),
    slideWidth: '',
    state: 0,
    transition: '1s',
    infinite: false
};


function slick($container, options = {}){

    slickState.$container = $container;
    slickState.$ul = $container.querySelector("ul");

    Object.assign(slickState, options);

    // Estilização da <ul>
    Object.assign(slickState.$ul.style, {
        display: "flex",
        listStyle: "none",
        overflow: "hidden"
    });

    // Largura (%) de cada <li>
    slickState.slideWidth = 100/slickState.slidesToShow;

    const liArray = [...slickState.$ul.children];
    liArray.forEach($li => {
        $li.style.transition = slickState.transition;
        $li.style.flexShrink = "0";
        $li.style.flexBasis = `${(slickState.slideWidth).toFixed(5)}%`;
    });

    insertControlButtons($container);
}

function createElement(tag, classList = [], children = []){
    const $element = document.createElement(tag);
    $element.classList.add(...classList);
    $element.append(...children);
    return $element;
}

function insertControlButtons($container){
    const $ul = $container.firstChild;

    const $leftButton = createElement("div", ["slick-button", "slick-left"], ["<"]);
    $leftButton.addEventListener("click", slide.bind($leftButton));

    const $rightButton = createElement("div", ["slick-button", "slick-right"], [">"]);
    $rightButton.addEventListener("click", slide.bind($rightButton));

    $container.insertBefore($leftButton, $ul);
    $container.appendChild($rightButton);
}

// TODO Resolver problema de final vazio
function slide(){
    // Determina qual botão foi acionado
    const moveLeft = this.classList.contains('slick-left');

    const statesTotal = slickState.statesTotal;
    slickState.state += moveLeft ? 1 : statesTotal-1;
    slickState.state = slickState.state % statesTotal; // Ajuta o overflow

    const liArray = [...slickState.$ul.children];
    liArray.forEach($li => {
        $li.style.transform = `translateX(-${100*slickState.slidesToScroll*slickState.state}%)`;
    });
}


// TODO Reomver
const $element = document.querySelector('.nabuco');
slick($element);