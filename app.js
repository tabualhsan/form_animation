const containers = document.querySelectorAll(".input-container");
const form = document.querySelector('form');


const tl = gsap.timeline({default : {duration: 1}});


const start ="M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";

const end = "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512"

containers.forEach(container => {
    const input = container.querySelector('.input');
    const line = container.querySelector('.elastic-line');
    const placeholder = container.querySelector('.placeholder');
        input.addEventListener('focus', () => {
            if(!input.value){
                tl.fromTo(line, {attr:{d: start}}, {attr: {d:end}, ease: 'Power2.easeOut', duration:0.75}
                );
                tl.to(line, {attr: {d:start}, ease: "elastic.out(3,0.5)"}, '<50%');
                // placeholder shift 
                tl.to(placeholder, {top:-15, left :0, scale: 0.7, duration:0.5, ease:"Power2.easeOut"}, "<15%")


            }
        });

});

// revert back if not focused 


form.addEventListener('click', () => {
    containers.forEach((container) => {
        const input = container.querySelector('.input');
        const line = container.querySelector('.elastic-line');
        const placeholder = container.querySelector('.placeholder');

        if(document.activeElement !== input){
            if(!input.value){
                gsap.to(placeholder,{top: 0, left: 0, scale: 1, duration: 0.5, ease:"Power2.easeOut",
            })
            }
        }
    // NAME VALIDATION
    input.addEventListener('input', (e) => {
        if(e.target.type === 'text'){
            let inputText = e.target.value;
            if(inputText.length > 2){
                colorize("#6391E8", line, placeholder);
            }else{
                colorize("#FE8C99", line, placeholder);

            }
        }
     // EMAIL VALIDATION
     if(e.target.type === 'email'){
        let valid = validateEmail(e.target.value);
        if(valid){
            colorize("#6391E8", line, placeholder);
        }else{
            colorize("#FE8C99", line, placeholder);

        }
    }
    // validate phone
  
    if(e.target.type === 'tel'){
        let valid = validatePhone(e.target.value);
        if(valid){
            colorize("#6391E8", line, placeholder);
        }else{
            colorize("#FE8C99", line, placeholder);

        }
    }
   
});
    });
});
// checking email validation this is a function that validates email. 


function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  function validatePhone(phone) {
    let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phone);
  }

// colorize function

function colorize(color, line, placeholder){
    gsap.to(line, {stroke: color, duration: 0.75});
    gsap.to(placeholder, {color: color, duration:0.75});
}


// CHECKBOX ANIMATION


const checkbox = document.querySelector('.checkbox');
const t12 = gsap.timeline({
    default:{duration:0.5, ease: "Power2.easeOut" },
});
const tickMarkPath = document.querySelector('.tick-mark path');
const pathLength = tickMarkPath.getTotalLength();

gsap.set(tickMarkPath,{
    strokeDashoffset: pathLength,
    strokeDasharray: pathLength,
});

checkbox.addEventListener('click', () => {
    if(checkbox.checked){
        t12.to(".checkbox-fill", {top: "0%"});
        t12.fromTo(tickMarkPath, {strokeDashoffset: pathLength}, {strokeDashoffset:0}, '<50%'
        );
        tl2.to('.checkbox-label', {color: '#6391E8'}, "<");
        }else{
            t12.to('.checkbox-fill', {top: '100%'})
            tl.fromTo(tickMarkPath, {strokeDashoffset:0}, {strokeDashoffset:pathLength}, '<50%')
            tl2.to('.checkbox-label', {color: '#c5c5c5'}, "<")
    }
});

// animation of character
gsap.set('#eye', {transformOrigin:"center"})
gsap.fromTo('#eye', {scaleY:1}, {scaleY:0.3, repeat:-1, yoyo:true, repeatDelay: 0.5, ease: "power2.easOut", })

gsap.fromTo('#eyebrow', {y:0}, {y:-1, repeat:-1, yoyo:true, repeatDelay:0.5, ease: 
'power2.easeOut'});

// submit button

const button = document.querySelector('button');
const t13 = gsap.timeline({default:0.75, ease: "power2.easeOut"})


button.addEventListener('click', (e) => {
    e.preventDefault();
    t13.to('.contact-right, .contact-left', {y:30, opacity:0, PointerEvent:'none'});
    t13.to("form", {scale:0.8}, "<");
    gsap.set('#hand',{transformOrigin:"left"} );
    t13.fromTo('.submitted', {opacity:0, y:30}, {opacity:1, y:0})
    gsap.fromTo('#hand', {rotation:0, y:0}, {rotation:-10, y:2, ease:'elastic(3,0.3)', duration:2, delay:1})
})

