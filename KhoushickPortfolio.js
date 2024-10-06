var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    if (!this.isBlinking) {
        this.isBlinking = true;
        this.blinkCursor();
    }
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

TxtType.prototype.blinkCursor = function() {
    var that = this;
    var blinkCount = 0;
    var blinkInterval = setInterval(function() {
        if (blinkCount < 4) { // Blink twice (each blink is two changes in visibility)
            that.el.querySelector('.wrap').style.borderRightColor = (blinkCount % 2 === 0) ? 'transparent' : '#eab308';
            blinkCount++;
        } else {
            clearInterval(blinkInterval);
            // Stop the blinking and remove the cursor
            that.el.querySelector('.wrap').style.borderRight = 'none';
            that.isBlinking = false;
        }
    }, 500); // Adjust the timing for blink speed (500ms for each blink)
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #eab308}";
    document.body.appendChild(css);
};
