// ==UserScript==
// @name         ArkNightWiki
// @namespace    http://dazo66.com/
// @version      1.0
// @description  ArkNightWiki
// @author       dazo66
// @match        *//ak.mooncell.wiki/*
// @include      *//ak.mooncell.wiki/*
// @match        *//prts.wiki/*
// @include      *//prts.wiki/*
// @grant        none
// ==/UserScript==


(function() {

    function setClipboard(data) {
        var copy = function (e) {
            e.preventDefault();
            if (e.clipboardData) {
                e.clipboardData.setData('text/plain', data);
            } else if (window.clipboardData) {
                window.clipboardData.setData('Text', data);
            }
        }
        window.addEventListener('copy', copy);
        document.execCommand('copy');
        window.removeEventListener('copy', copy);
        console.log('复制成功');
    }

    function itemToString(list) {
        var s = '';
        for (let item of list) {
            s += item.firstElementChild.textContent + item.lastElementChild.firstElementChild.alt;
        }
        return s;
    }

    setTimeout(function(){
        var list = document.getElementsByTagName('div');
        for (let item of list) {
            if (item.childElementCount == 2 && item.lastElementChild.tagName == "SPAN" && item.firstElementChild.tagName == "A") {

                try {
                    item.insertBefore(item.lastElementChild, item.firstElementChild);
                    item.lastElementChild.firstElementChild.alt = '*' + item.lastElementChild.firstElementChild.alt.replace('道具 ', '').replace('带框 ', '').replace('.png', ' ');
                    item.setAttribute('class', 'item');
                }
                catch(err) {
                    console.log(item);
                }
                
            }
        }

        list = document.getElementsByTagName('td');
        for (let item of list) {
            item.onclick = function () {
                if(item.getElementsByClassName('item').length != 0) {
                    setClipboard(itemToString(item.getElementsByClassName('item')));
                }
            }
        }

    }, 1000);
    
})();