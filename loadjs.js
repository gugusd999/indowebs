export function loadScript(scripts = [], func1, func2){
    xdb('epostadmin',['dataMaster'] ,7, function(s){
            s.read('dataMaster', 'datascript', function(p){
                // if (globalThis.getScript == localStorage.getItem('getScript') && globalThis.getScript != null) {
                //     var scriptsp = document.createElement('script');
                //     scriptsp.id = "script1";
                //     scriptsp.innerHTML = p.data;
                //     document.head.appendChild(scriptsp);
                //     func1();
                // }else{
                //     console.log('as')
                    function loadScript(url) {
                        return new Promise(function(resolve, reject) {
                            var rl = false;
                            if (url.includes('maps') == true) {
                                rl = true;
                            }
                            let script = document.createElement('script');
                            script.src = url;
                            script.async = rl;
                            script.onload = function() {
                                resolve(url);
                            };
                            script.onerror = function() {
                                reject(url);
                            };
                            document.body.appendChild(script);
                        });
                    }
                    // save all Promises as array
                    let promises = [];
                    scripts.forEach(function(url) {
                        promises.push(loadScript(url));
                    });

                    Promise.all(promises)
                    .then(func1).catch(func2);


                // }
            })
    })
}

export function loadStyle(scripts = [], func1, func2){
    function loadScript(url) {
        return new Promise(function(resolve, reject) {
            let script = document.createElement('link');
            script.href = url;
            script.rel = "stylesheet";
            script.async = false;
            script.onload = function() {
                resolve(url);
            };
            script.onerror = function() {
                reject(url);
            };
            document.body.appendChild(script);
        });
    }

    // save all Promises as array
    let promises = [];
    scripts.forEach(function(url) {
        promises.push(loadScript(url));
    });

    Promise.all(promises)
    .then(func1).catch(func1);

}
