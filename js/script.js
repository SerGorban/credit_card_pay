"use strict"

document.addEventListener('DOMContentLoaded', function() {

    const pointerBorder = document.querySelector('.pointer-border');
    const card = document.querySelector('.card');
    const cardNumber = document.querySelector('.form__card-number');
    const cardValidThru = document.querySelectorAll('.form__card-valid-thru_focus');
    const cardValidThruMonth = document.querySelector('.form__card-valid-thru_month');
    const cardValidThruYear = document.querySelector('.form__card-valid-thru_year');
    const cardCvc = document.querySelector('.form__card-cvc');
    const formButton = document.querySelector('.form__button');

    ///////
    cardNumber.addEventListener('focus', function(){
        pointerBorder.classList.add('_focus-card-number');
    });
    cardNumber.addEventListener('blur', function(){
        pointerBorder.classList.remove('_focus-card-number');
    });

    /////////
    for (let index = 0; index < cardValidThru.length; index++) {
        const cardValidThruItem = cardValidThru[index];
        cardValidThruItem.addEventListener('focus', function(){
            if (!pointerBorder.classList.contains('_focus-card-valid-thru')) {
                pointerBorder.classList.add('_focus-card-valid-thru');
            }
        });
        cardValidThruItem.addEventListener('blur', function(){
            if (pointerBorder.classList.contains('_focus-card-valid-thru')) {
                pointerBorder.classList.remove('_focus-card-valid-thru');
            }
        });
    }

    /////////
    cardCvc.addEventListener('focus', function(){
        card.classList.add('to-back');
        pointerBorder.classList.add('_focus-card-cvc');
    });
    cardCvc.addEventListener('blur', function(){
        card.classList.remove('to-back');
        pointerBorder.classList.remove('_focus-card-cvc');
    });

    ////////////
    for (var i in ['input', 'change', 'blur', 'keyup']) {
        cardNumber.addEventListener('input', formatCardCode, false);
        cardValidThruMonth.addEventListener('input', formatThruMonth, false);
        cardValidThruMonth.addEventListener('blur', function(){
            if (this.value == "1") {
                this.value = "01";
            }
        });
        cardValidThruYear.addEventListener('input', formatThruYear, false);
        cardValidThruYear.addEventListener('blur', function(){
            let ThruYear = this.value.replace(/[^\d]/g, '').substring(0,2);
            if (/^[1-9]$/.test(ThruYear)) {
                this.value = ThruYear.padStart(2, "0");
            }
        });
        cardCvc.addEventListener('input', formatCardCvc, false);
        cardCvc.addEventListener('blur', function(){
            if (this.value != "") {
                this.value = this.value.padStart(3, "0");
            }
        });
    }

    ///////////////

    function formatCardCode() {
        this.classList.remove('_error');
        let cardCode = this.value.replace(/[^\d]/g, '').substring(0,16);
        let cardCodeForForm = cardCode != '' ? cardCode.match(/.{1,4}/g).join(' ') : '';
        this.value = cardCodeForForm;

        let cardCodeForCard = cardCode.padEnd(16, "#").match(/.{1,4}|/g).join(' ').split(" ", 4);
        for (let index = 0; index < cardCodeForCard.length; index++) {
            let cardNumberChild = document.querySelector(`.card__number span:nth-child(${index+1})`);
            cardNumberChild.innerHTML = cardCodeForCard[index];
        }
    }

    function formatThruMonth() {
        this.classList.remove('_error');
        let ThruMonth = this.value.replace(/[^\d]|^1[3-9]|^[2-9][0-9]|^00/g, '').substring(0,2);
        if (/^[2-9]$/.test(ThruMonth)) {
            ThruMonth = ThruMonth.padStart(2, "0");
        }
        ThruMonth = ThruMonth != '' ? ThruMonth.match(/.{1,2}/g) : '';
        this.value = ThruMonth;
        let cardMonth = document.querySelector('.card__valid-thru span:first-child');
        if (this.value != "") {
            let completeString = this.value.padStart(2, "0");
            cardMonth.innerHTML = completeString;
        } else {
            cardMonth.innerHTML = "##";
        }
    }

    function formatThruYear() {
        this.classList.remove('_error');
        let ThruYear = this.value.replace(/[^\d]/g, '').substring(0,2);
        ThruYear = ThruYear != '' ? ThruYear.match(/.{1,2}/g) : '';
        this.value = ThruYear;
        let cardYear = document.querySelector('.card__valid-thru span:last-child');
        if (this.value != "") {
            let completeString = this.value.padStart(2, "0");
            cardYear.innerHTML = completeString;
        } else {
            cardYear.innerHTML = "##";
        }
    }

    function formatCardCvc() {
        this.classList.remove('_error');
        let CardCvc = this.value.replace(/[^\d]/, '').substring(0,3);
        CardCvc = CardCvc != '' ? CardCvc.match(/.{1,3}/g) : '';
        this.value = CardCvc;

        let cardCvc = document.querySelector('.card__cvc');
        if (this.value != "") {
            let completeString = this.value.padStart(3, "0");
            cardCvc.innerHTML = completeString;
        } else {
            cardCvc.innerHTML = "###";
        }
    }


///////////
    const form = document.querySelector('.form');
    
    form.addEventListener('submit', formSend);

    async function formSend(event) {
        event.preventDefault();
        setTimeout('formButton.blur()', 1000);

        let error = formValidate(form);

        let formData = new FormData(form);

        if (error === 0) {
            form.classList.add('_sending');
            /* let response = await fetch('send.php', {
                method: 'POST',
                body: formData
            }); */
            /* let response = await fetch('send.json', {
                method: 'GET',
            });
            if (response.ok) {
                let result = await response.json();
                form.classList.remove('_sending');
                alert(result.message);
                //form.reset();
                location.reload()
            } else {
                alert('Send error');
                form.classList.remove('_sending');
            } */
        } else {
            //alert('Fill in the required fields');
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            input.classList.remove('_error');

            if (input.value === "") {
                input.classList.add('_error');
                error++;
            }
        }
        return error;
    }

});





