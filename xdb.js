const xdb = function(dbname, listdbname = [] , v = 0, func){

	if (localStorage.getItem('dbv') != undefined) {
		if (localStorage.getItem('dbv') != v) {
			indexedDB.deleteDatabase("toDoList");
		}
	}

    var dbs = null;

  	var request = window.indexedDB.open(dbname, 4);

		request.onsuccess = function(event) {
        dbs = request.result;
        func({
           add: function(table, obj){
           		// cek data
           		var id = obj.id;
           		this.read(table, id, function(aw){
           			if (aw == null) {
		               	var rq = dbs.transaction([table], "readwrite")
		               	.objectStore(table)
		               	.add(obj);
           			}else{
           				var request = dbs.transaction([table], "readwrite")
			            .objectStore(table)
			            .delete(id)
			            var rq = dbs.transaction([table], "readwrite")
		               	.objectStore(table)
		               	.add(obj);
           			}
           		})

               	return this;
           },
           read:function(table,id, func) {
            var transaction = dbs.transaction([table]);
            var objectStore = transaction.objectStore(table);
            var request = objectStore.get(id);
            request.onerror = function(event) {
               console.log("Unable to retrieve daa from database!");
            };
            request.onsuccess = function(event) {
               // Do something with the request.result!
               if(request.result) {
                 func(request.result)
               } else {
                  func(null);
               }
            };
            return this;
         }
        })
    };
	request.onupgradeneeded = function(event) {
	  dbs = event.target.result;
	  dbs.onerror = function(event) {
	    note.innerHTML += "<li>Error loading database.</li>";
	  };
	  // Create an objectStore for this database
	  for (var i = 0; i < listdbname.length; i++) {
	  	dbs.createObjectStore(listdbname[i], {keyPath: "id"});
	  }
	};
	localStorage.setItem('dbv', v);
}
