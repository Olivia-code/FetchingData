window.onload = (()=> {
    var dbName = 'library';
    var dbVersion = 1;

    var dbRequest = indexedDB.open(dbName, dbVersion);

    dbRequest.onsuccess = ((e)=> {
        console.log("DB is successfully opened!")
    });
    dbRequest.onerror = ((e) => {
        console.log("DB is not opened!")
    }) ;

    $('#fetch-book-button').click((e)=> {
        var isbn = $('#isbn-input-box').val();

        if(isbn) {
            fetchBook(isbn);
        }else {
            alert("please enter an isbn number!");
        }

        console.log(isbn)
    })

    function fetchBook(isbn) {
        // Handling DataBase 

        var db = dbRequest.result;

        // Create Transaction

        var transaction = db.transaction("books", "readonly");

        // Handling Object Store

        var store = transaction.objectStore("books");

        // Fetching Object fro Object Store

       var request =  store.get(isbn);
        request.onsuccess = ((e)=> {
            var book = e.target.result;
        
            if(book) {
                updateBookBlock(book);
            }else {
                alert ("no result found");
            }
        });

        request.onerror = ((e)=> {
            console.log("error");
        })

    }

    function updateBookBlock(book) {
        
        $('#book-name').html(book.name);
        $('#isbn').html(book.isbn);
        $('#publication').html(book.publication);
    }
});