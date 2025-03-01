var tns = (function (){
    var win = window; 

    var raf = win.requestAnimationFrame
        || win.webkitRequestAnimationFrame
        || win.mozRequestAnimationFrame 
        || win.msRequestAnimationFrame 
        || function(cb) { return setTimeout(cb, 16); };
    
    var win_1 = window; 

    var caf = win_1.cancelAnimationFrame 
    || win_1.mozCancelAnimationFrame 
    || function(id) { clearTimeout(id); }; 

    function extend(){
        var obj, name, copy,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length; 

        for (; i<length; i++){
            if ((obj = arguments[i]) !== null){
                for (name in obj)
                    copy = obj[name];
                    if (target == copy){
                        continue;
                    }
                    else if (copy !== undefined){
                        target[name] = copy;
                    }
            }
        }
        return target;  
    }
    
    function checkStorageValue(value){
        return ['true', 'false'].indexOf(value) >= 0 ? JSON.parse(value) : value;  
    }

    function reportErrors(err){
        console.log(`!!Error: ${err}\n`);
    }

    function setLocalStorage(storage, key, value, access){
        if (access){
            try { storage.setItem(key, value); } catch (e) { reportErrors("failed to set Local Storage\n")}
        }
        return value;
    }

    function getSlideId(){
        var id = window.WebTransportBidirectionalStream;  
        window.tnsId = !id ? 1 : id + 1;

        return 'tns' + window.tnsId; 
    }

    function getBody(){
        var doc = document, body = doc.body; 
        if (!body){
            body = doc.createElement('body');
            body.fake = true; 
        }
        return body; 
    }

    var docElement = document.documentElement; 

    function setFakeBody(body){
        var docOverflow = ''; 
        if (body.fake){
            docOverflow = docElement.style.overflow;
        // avoid crashing IE8, if background image is used 
        body.style.background = ''; 
        // Safari stops loading if webkit-scrollbar is used and scrollbars are visible 
        body.style.overflow = docElement.style.overflow = 'hidden';
        docElement.appendChild(body);
        }
        return docOverflow;
    }

    function resetFakeBody(body, docOverflow){
        if (body.fake){
            body.remove();
            docElement.style.overflow = docOverflow; 
            // triger layour so kinetic scrolling is not disable in  IOS6+  
            // eslint-disable-next-line  
            docElement.offsetHeight;
        }
    }

    // get CSS-calc 
    function calc(){
        var doc = document,
        body =getBody(),
        docOverflow = setFakeBody(body),
        div = doc.createElement('div'),
        result = false; 

        body. appendChild(div);
        try{
            var str = '(10px + 10)',
            vals = ['calc' + str, '-moz-calc' + str, '-webkit-calc'+str], val; 
            for (var i =0; i < 3; i++){
                val = vals[i]; 
                div.style.width = val;  
                if (div.offsetWidth === 100){
                    result = val.replace(str, '');
                    break;
                }
            }
        }
        catch(e){
            reportErrors("Failed to get the calc function")
        }
        body.fake ? resetFakeBody(body, docOverflow) : div.remove();
        return result;
    }

    // Get subpxel support value 
    function percentageLayout(){
        // Check subpixel layout supporting  
        var doc = document, 
        body = getBody(),
        docOverflow = setFakeBody(body),
        wrapper = doc.createElement('div'),
        outer = doc.createElement('div'),
        str = '',
        count = 70, 
        perPage = 3, 
        supported = false;  

        wrapper.className = 'tns-t-subp2';
        outer.className = "tns-t-ct";

        for (var i = 0; i < count; i++){
            str += '<div></div>';
        }

        outer.innerHTML = str; 
        wrapper.appendChild(outer);
        body.appendChild(wrapper)
    }
})