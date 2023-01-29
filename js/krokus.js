;var krokus = ( function(){
    'use strict'
    function krokus(){
      if (krokus.instance_) {
        return krokus.instance_;
      }
      return this
    }
    krokus.instance_ = this;
  
    krokus.hiders = ['extShowFade'];
    krokus.showers = ['entShowFade'];
    krokus.tempNamePan = 'krokusDiv'
    krokus.currentPan = null;
    krokus.currentGlw = null;
    krokus.pcatch = '';
  
    var style = `
    .krokusPan {
      /*width: 100%;*/
      height: 100%;
      position: absolute;
      background-color: rgba(180, 0, 255, 0.06);
      border-top: 2px solid rgba(110, 27, 133, 0.61);
      border-right: 2px solid rgba(108, 36, 132, 0.81);
      border-bottom: 5px solid #4B21B5;
      border-left: 5px solid #4C14C8;
      filter: drop-shadow(29px 24px 31px #541C6D);
    }
    .krokusGlow{
      text-shadow: rgb(164 0 255) 0px 0px 19px;
    }
  
    /*  entShowFade  */
    .entShowFade {
      animation: entShowFadeAn  1500ms ease 0s 1 normal forwards;
    }
  
    @keyframes entShowFade {
        0% {
        opacity: 0;
        transform: scaleX(0) scaleY(0);
          }
        100% {
        opacity: 1;
        transform: scaleX(1) scaleY(1);
          }
    }
    /*   */
  
    /*  extShowFade  */
    .krokusPan.extShowFade {
      animation: extShowFade  1500ms ease 0s 1 normal forwards;
    }
  
    @keyframes extShowFade {
      0% {
        opacity: 1;
        transform: scaleX(1);
          }
      100% {
        opacity: 0;
        transform: scaleX(0) ;
          }
    }
    /*   */
    `
  
    krokus.catchPanel = function(id){
      krokus.pcatch = document.getElementById(id)
    }
  
    krokus.getRandomnEfx = function(arr){
      return arr[0]+" 800ms ease 0s 1 normal forwards ";
    }
  
    krokus.triger = function(id,w = 93){
      let el = document.getElementById(krokus.currentPan)
      if(id == krokus.currentPan || el!=null && el.classList.contains("krokusPan") ){
        krokus.hidePanel(el);
        if(id == krokus.currentPan ) {
          krokus.currentPan = null;
          return;
        }
      }
      krokus.resetGlow(event.srcElement.id)
      krokus.currentPan = id
      el = document.getElementById(id)
      el.classList.add("krokusPan");
      el.style.display = 'block'
      el.style.animation=krokus.getRandomnEfx(krokus.showers)
      el.style.margin = "0 "+krokus.calcWidthPMarg(w)+'%'
      el.style.width = w+'%'
  
    }
  
    krokus.resetGlow = function(id){
      if(krokus.currentGlw != null){
        document.getElementsByClassName('krokusGlow')[0].classList.remove('krokusGlow')
      }
      document.getElementById(id).classList.add('krokusGlow')
      krokus.currentGlw = id
    }
  
    krokus.createPanel = function(id,w = 93){
      krokus.delExists()
      let el = document.createElement('div');
      el.classList.add("krokusPan");
      el.style.animation=krokus.getRandomnEfx(krokus.showers)
      el.id = '';
      el.style.width = w+'%'
      el.style.margin = "0 "+krokus.calcWidthPMarg(w)+'%'
      el.addEventListener('blur', (event) => { krokus.hidePanel() });
      krokus.pcatch.append(el)
    }
  
    krokus.loadStylelist = function(){             // thats code already exist in radio.styler.js !
      let el = document.createElement("style");
      el.setAttribute("rel", "stylesheet");
      el.setAttribute("type", "text/css");
      el.textContent = style
      document.getElementsByTagName("head")[0].appendChild(el);
    }
  
    krokus.calcWidthPMarg = function(w){           // w int (in proc), 0 < w <= 100
      return ((100 - w)/2).toFixed(1)
    }
  
    krokus.hidePanel = function(el){
      el.style.animation=krokus.getRandomnEfx(krokus.hiders)
      el.addEventListener('animationend',function abc()  {
        //el.style.display = 'none'
        el.removeEventListener('animationend', abc);
      })
    }
  
    window.addEventListener("load", (event) => {
      krokus.loadStylelist()
    });
  
    return krokus;
  })();
  /*
  при первом нажатии сгенерировать див ?
  стилизируем!
  при дальнейших нажатиях скрываем текущий див,
     и стилизируем или показываем другой див
  
  по нажатию кнопки смотрим наличие класса krokus ?:
    1 - прячем и показываем другой див
    0 - стилизируем и показываем.
  
  */
  